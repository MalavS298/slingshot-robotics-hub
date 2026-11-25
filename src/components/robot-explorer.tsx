import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Crosshair, Hand, Minus, Plus, RotateCcw } from "lucide-react";

import frontLeft from "@/assets/robot-front-left.webp.asset.json";
import frontRight from "@/assets/robot-front-right.webp.asset.json";
import sideRight from "@/assets/robot-side-right.webp.asset.json";
import sideLeft from "@/assets/robot-side-left.webp.asset.json";
import rear from "@/assets/robot-rear.webp.asset.json";
import underside from "@/assets/robot-underside.webp.asset.json";

const features = [
  {
    id: "drivetrain",
    name: "Mecanum Drivetrain",
    short: "Mecanum",
    description: "Mecanum wheels power the robot's driving.",
  },
  {
    id: "turret",
    name: "Turret",
    short: "Turret",
    description: "The turret carries the robot's scoring mechanism.",
  },
  {
    id: "ramp",
    name: "Deployable Ramp",
    short: "Ramp",
    description: "Deployable ramp to intake from flowers.",
  },
  {
    id: "butterfly",
    name: "Butterfly Drivetrain",
    short: "Butterfly",
    description: "Butterfly drivetrain, also on the bottom.",
  },
  {
    id: "intake",
    name: "Intake + Transfer",
    short: "Intake",
    description: "Intake and transfer move game pieces into the robot.",
  },
] as const;

type FeatureId = (typeof features)[number]["id"];
type Point = { x: number; y: number };
type RobotView = {
  name: string;
  image: string;
  visibleFeatures?: readonly FeatureId[];
  points: Partial<Record<FeatureId, Point>>;
};

const views: RobotView[] = [
  {
    name: "Intake overview",
    image: frontLeft.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 45, y: 48 }, ramp: { x: 32, y: 60 }, intake: { x: 42, y: 56 } },
  },
  {
    name: "Front three-quarter",
    image: frontRight.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 50, y: 44 }, ramp: { x: 58, y: 78 }, intake: { x: 55, y: 65 } },
  },
  {
    name: "Turret side",
    image: sideRight.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 47, y: 40 }, ramp: { x: 30, y: 65 }, intake: { x: 38, y: 62 } },
  },
  {
    name: "Intake side",
    image: sideLeft.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 47, y: 39 }, ramp: { x: 29, y: 66 }, intake: { x: 36, y: 61 } },
  },
  {
    name: "Rear assembly",
    image: rear.url,
    visibleFeatures: ["ramp", "drivetrain"],
    points: { ramp: { x: 50, y: 42 }, drivetrain: { x: 50, y: 64 } },
  },
  {
    name: "Underside systems",
    image: underside.url,
    visibleFeatures: ["drivetrain", "butterfly", "intake", "ramp"],
    points: { drivetrain: { x: 40, y: 46 }, butterfly: { x: 50, y: 55 }, intake: { x: 47, y: 38 }, ramp: { x: 47, y: 30 } },
  },
];

export function RobotExplorer() {
  const [viewIndex, setViewIndex] = useState(1);
  const [selectedId, setSelectedId] = useState<FeatureId>("turret");
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const gesture = useRef<{ pointerId: number; x: number; y: number; view: number } | null>(null);
  const selected = features.find((feature) => feature.id === selectedId) ?? features[0];
  const view = views[viewIndex]!;

  const changeView = (direction: number) => {
    setViewIndex((current) => (current + direction + views.length) % views.length);
    setDrag({ x: 0, y: 0 });
  };

  const resetView = () => {
    setViewIndex(1);
    setZoom(1);
    setDrag({ x: 0, y: 0 });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view: viewIndex };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const steps = Math.round(-dx / 150);
    setViewIndex((start.view + steps + views.length * 2) % views.length);
    setDrag({ x: dx % 150, y: Math.max(-35, Math.min(35, dy)) });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current?.pointerId === event.pointerId) {
      gesture.current = null;
      setDrag({ x: 0, y: 0 });
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); changeView(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); changeView(1); }
    if (event.key === "+" || event.key === "=") { event.preventDefault(); setZoom((value) => Math.min(1.5, value + 0.1)); }
    if (event.key === "-") { event.preventDefault(); setZoom((value) => Math.max(0.8, value - 0.1)); }
    if (event.key === "0") { event.preventDefault(); resetView(); }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-primary/30 bg-popover shadow-2xl shadow-primary/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/20 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-glow shadow-[0_0_16px_var(--glow)]" />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Competition assembly <span className="text-glow">/ 2025–26</span></p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">DECODE · Slingshot #20240</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="relative min-w-0 border-b border-primary/20 lg:border-b-0 lg:border-r">
          <div
            className="robot-stage relative h-[560px] touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glow sm:h-[650px]"
            role="application"
            aria-label={`Interactive robot view: ${view.name}. Drag or use left and right arrow keys to orbit.`}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onKeyDown}
          >
            <div className="robot-blueprint absolute inset-0 opacity-30" />
            <div className="robot-orbit-ring absolute left-1/2 top-[68%] h-32 w-[65%] -translate-x-1/2 rounded-[50%] border border-glow/20" />
            <div className="absolute left-5 top-5 z-20 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-glow backdrop-blur sm:left-7 sm:top-7">
              {String(viewIndex + 1).padStart(2, "0")} / {String(views.length).padStart(2, "0")} · {view.name}
            </div>

            <img
              src={view.image}
              alt={`Slingshot #20240 robot, ${view.name.toLowerCase()}`}
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain p-12 transition-[filter] duration-300 sm:p-16"
              style={{
                transform: `translate(${drag.x * 0.12}px, ${drag.y * 0.25}px) scale(${zoom}) perspective(1200px) rotateY(${drag.x * 0.055}deg) rotateX(${-drag.y * 0.08}deg)`,
                filter: "drop-shadow(0 28px 28px var(--background)) drop-shadow(0 0 22px color-mix(in oklab, var(--primary) 22%, transparent))",
              }}
            />

            {features.filter((feature) => !view.visibleFeatures || view.visibleFeatures.includes(feature.id)).map((feature) => {
              const point = view.points[feature.id];
              if (!point) return null;
              const active = feature.id === selectedId;
              return (
                <button
                  key={feature.id}
                  type="button"
                  aria-label={`Learn about ${feature.name}`}
                  aria-pressed={active}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setSelectedId(feature.id)}
                  className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-glow ${active ? "scale-110" : ""}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <span className={`relative flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-colors sm:h-8 sm:w-8 ${active ? "border-glow bg-glow text-accent-foreground shadow-[0_0_24px_var(--glow)]" : "border-glow/60 bg-background/85 text-glow backdrop-blur group-hover:bg-primary"}`}>
                    {String(features.indexOf(feature) + 1).padStart(2, "0")}
                    {!active && <span className="absolute inset-0 -z-10 animate-ping rounded-full border border-glow/30 [animation-duration:2.5s]" />}
                  </span>
                  <span className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] backdrop-blur transition-opacity sm:text-[10px] ${active ? "border-glow/50 bg-primary text-primary-foreground opacity-100" : "border-primary/20 bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                    {feature.short}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-background/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur sm:bottom-7 sm:text-[10px]">
              <Hand className="h-3.5 w-3.5 text-glow" /> Drag to orbit <span className="text-glow">·</span> Select a marker
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => changeView(-1)} aria-label="Previous robot angle" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => changeView(1)} aria-label="Next robot angle" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><ChevronRight className="h-4 w-4" /></button>
              <span className="mx-2 h-5 w-px bg-border" />
              <button type="button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))} aria-label="Zoom out" disabled={zoom <= 0.8} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30"><Minus className="h-4 w-4" /></button>
              <span className="w-12 text-center font-mono text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(1.5, value + 0.1))} aria-label="Zoom in" disabled={zoom >= 1.5} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-30"><Plus className="h-4 w-4" /></button>
            </div>
            <button type="button" onClick={resetView} className="flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><RotateCcw className="h-3.5 w-3.5" /> Reset view</button>
          </div>
        </div>

        <aside className="flex flex-col bg-background/35 p-4 sm:p-5" aria-label="Robot features">
          <div className="mb-4 flex items-center gap-2 px-2 pt-1">
            <Crosshair className="h-4 w-4 text-glow" />
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore systems</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelectedId(feature.id)}
                aria-pressed={feature.id === selectedId}
                className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${feature.id === selectedId ? "border-glow/60 bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-transparent text-muted-foreground hover:border-primary/30 hover:bg-card hover:text-foreground"}`}
              >
                <span className={`font-mono text-[10px] ${feature.id === selectedId ? "text-accent" : "text-glow"}`}>{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium">{feature.short}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 hidden flex-1 rounded-2xl border border-primary/20 bg-card/70 p-5 lg:block" aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glow">System {String(features.indexOf(selected) + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug">{selected.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{selected.description}</p>
          </div>
        </aside>
      </div>

      <div className="border-t border-primary/20 bg-card/60 p-5 lg:hidden" aria-live="polite">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glow">System {String(features.indexOf(selected) + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 font-display text-lg font-bold">{selected.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{selected.description}</p>
      </div>
    </div>
  );
}
