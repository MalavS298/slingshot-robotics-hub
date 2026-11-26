import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
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
    points: { turret: { x: 45, y: 42 }, ramp: { x: 30, y: 62 }, intake: { x: 44, y: 54 }, drivetrain: { x: 62, y: 72 }, butterfly: { x: 52, y: 82 } },
  },
  {
    name: "Front three-quarter",
    image: frontRight.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 50, y: 42 }, ramp: { x: 60, y: 78 }, intake: { x: 55, y: 64 }, drivetrain: { x: 30, y: 70 }, butterfly: { x: 42, y: 86 } },
  },
  {
    name: "Turret side",
    image: sideRight.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 47, y: 40 }, ramp: { x: 28, y: 68 }, intake: { x: 38, y: 60 }, drivetrain: { x: 64, y: 72 }, butterfly: { x: 50, y: 84 } },
  },
  {
    name: "Intake side",
    image: sideLeft.url,
    visibleFeatures: ["turret", "ramp", "intake"],
    points: { turret: { x: 47, y: 39 }, ramp: { x: 27, y: 68 }, intake: { x: 37, y: 59 }, drivetrain: { x: 64, y: 72 }, butterfly: { x: 50, y: 84 } },
  },
  {
    name: "Rear assembly",
    image: rear.url,
    visibleFeatures: ["ramp", "drivetrain"],
    points: { turret: { x: 50, y: 26 }, ramp: { x: 50, y: 42 }, intake: { x: 34, y: 52 }, drivetrain: { x: 50, y: 66 }, butterfly: { x: 66, y: 80 } },
  },
  {
    name: "Underside systems",
    image: underside.url,
    visibleFeatures: ["drivetrain", "butterfly", "intake", "ramp"],
    points: { turret: { x: 60, y: 22 }, ramp: { x: 47, y: 30 }, intake: { x: 47, y: 38 }, drivetrain: { x: 34, y: 48 }, butterfly: { x: 56, y: 58 } },
  },
];

const N = views.length;
const wrap = (v: number) => ((v % N) + N) % N;
const circDist = (a: number, b: number) => { const d = Math.abs(wrap(a) - wrap(b)); return Math.min(d, N - d); };

export function RobotExplorer() {
  const [target, setTarget] = useState(1);
  const [pos, setPos] = useState(1);
  const [selectedId, setSelectedId] = useState<FeatureId>("turret");
  const [zoom, setZoom] = useState(1);
  const [tilt, setTilt] = useState(0);
  const targetRef = useRef(1);
  const posRef = useRef(1);
  const gesture = useRef<{ pointerId: number; x: number; y: number; start: number; lastX: number; lastT: number; v: number } | null>(null);
  const selected = features.find((feature) => feature.id === selectedId) ?? features[0];
  const viewIndex = wrap(Math.round(target));
  const view = views[viewIndex]!;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      const diff = targetRef.current - posRef.current;
      if (Math.abs(diff) < 0.002 && diff !== 0) { posRef.current = targetRef.current; setPos(posRef.current); }
      else if (diff !== 0) {
        posRef.current += diff * (1 - Math.exp(-dt / 110));
        setPos(posRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const goTo = (value: number) => { targetRef.current = value; setTarget(value); };
  const changeView = (direction: number) => goTo(Math.round(targetRef.current) + direction);
  const resetView = () => {
    const base = Math.round(targetRef.current);
    goTo(base + ((1 - wrap(base) + N + N / 2) % N) - N / 2);
    setZoom(1); setTilt(0);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, start: targetRef.current, lastX: event.clientX, lastT: performance.now(), v: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.pointerId !== event.pointerId) return;
    const now = performance.now();
    const dt = Math.max(1, now - g.lastT);
    g.v = g.v * 0.6 + (-(event.clientX - g.lastX) / 260 / dt) * 0.4;
    g.lastX = event.clientX; g.lastT = now;
    goTo(g.start - (event.clientX - g.x) / 260);
    setTilt(Math.max(-12, Math.min(12, (event.clientY - g.y) / 8)));
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (g?.pointerId === event.pointerId) {
      gesture.current = null;
      goTo(Math.round(targetRef.current + g.v * 220));
      setTilt(0);
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

  const markerView = wrap(Math.round(pos));
  const markerOpacity = Math.max(0, 1 - circDist(pos, markerView) * 3);

  return (
    <div className="overflow-hidden rounded-3xl border border-primary/30 bg-popover shadow-2xl shadow-primary/10">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="robot-holo">
          <feColorMatrix type="saturate" values="0" />
          <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
          <feComponentTransfer><feFuncR type="linear" slope="3.2" /><feFuncG type="linear" slope="3" /><feFuncB type="linear" slope="3.6" /></feComponentTransfer>
        </filter>
      </svg>
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
            <div className="robot-particles absolute inset-0" />
            <div className="absolute left-5 top-5 z-20 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-glow backdrop-blur sm:left-7 sm:top-7">
              {String(viewIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {view.name}
            </div>

            <div className="absolute inset-0" style={{ perspective: "1400px" }}>
              {views.map((v, i) => {
                let rel = wrap(pos) - i;
                if (rel > N / 2) rel -= N;
                if (rel < -N / 2) rel += N;
                const opacity = Math.max(0, 1 - Math.abs(rel));
                const active = i === viewIndex;
                return (
                  <img
                    key={v.name}
                    src={v.image}
                    alt={active ? `Slingshot #20240 robot, ${v.name.toLowerCase()}` : ""}
                    aria-hidden={active ? undefined : true}
                    draggable={false}
                    className="robot-holo pointer-events-none absolute inset-0 h-full w-full object-contain p-12 sm:p-16"
                    style={{
                      opacity,
                      visibility: opacity < 0.01 ? "hidden" : "visible",
                      transform: `scale(${zoom}) rotateY(${-rel * 28}deg) rotateX(${-tilt}deg) translateX(${-rel * 40}px)`,
                    }}
                  />
                );
              })}
            </div>

            <div className="absolute inset-0 z-30" style={{ opacity: markerOpacity, transition: "opacity 120ms" }}>
              {features.map((feature) => {
                const point = views[markerView]!.points[feature.id];
                if (!point) return null;
                const active = feature.id === selectedId;
                const num = String(features.indexOf(feature) + 1).padStart(2, "0");
                return (
                  <button
                    key={feature.id}
                    type="button"
                    aria-label={`Learn about ${feature.name}`}
                    aria-pressed={active}
                    tabIndex={markerOpacity > 0.5 ? 0 : -1}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setSelectedId(feature.id)}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-glow sm:text-[10px] ${active ? "border-glow bg-primary text-primary-foreground shadow-[0_0_24px_var(--glow)]" : "border-primary/40 bg-background/80 text-foreground/85 hover:border-glow"}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%`, pointerEvents: markerOpacity > 0.5 ? "auto" : "none" }}
                  >
                    <span className={active ? "text-accent" : "text-glow"}>{num}</span> {feature.name}
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-background/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur sm:bottom-7 sm:text-[10px]">
              <Hand className="h-3.5 w-3.5 text-glow" /> Drag to orbit <span className="text-glow">·</span> Select a label
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
