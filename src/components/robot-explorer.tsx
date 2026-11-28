import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Crosshair, Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import biobuzzImage from "@/assets/robot-side-right.webp.asset.json";
import decodeImage from "@/assets/decode-robot.png.asset.json";

type Feature = { id: string; name: string; short: string; description: string; x: number; y: number };
type RobotConfig = { season: string; game: string; image: string; features: readonly Feature[] };

export const robotConfigs: Record<"biobuzz" | "decode", RobotConfig> = {
  biobuzz: {
    season: "2026–27", game: "BIOBUZZ", image: biobuzzImage.url,
    features: [
      { id: "drivetrain", name: "Mecanum Drivetrain", short: "Mecanum", description: "Mecanum wheels power the robot's driving.", x: 64, y: 72 },
      { id: "turret", name: "Turret", short: "Turret", description: "The turret carries the robot's scoring mechanism.", x: 47, y: 40 },
      { id: "ramp", name: "Deployable Ramp", short: "Ramp", description: "Deployable ramp to intake from flowers.", x: 28, y: 68 },
      { id: "butterfly", name: "Butterfly Drivetrain", short: "Butterfly", description: "Butterfly drivetrain, also on the bottom.", x: 50, y: 84 },
      { id: "intake", name: "Intake + Transfer", short: "Intake", description: "Intake and transfer move game pieces into the robot.", x: 38, y: 60 },
    ],
  },
  decode: {
    season: "2025–26", game: "DECODE", image: decodeImage.url,
    features: [
      { id: "intake", name: "Intake", short: "Intake", description: "The intake collects game pieces into the robot.", x: 36, y: 71 },
      { id: "drivetrain", name: "Mecanum Drivetrain", short: "Mecanum", description: "Mecanum wheels power the robot's driving.", x: 66, y: 83 },
      { id: "blocker", name: "Custom Ball Blocker", short: "Ball Blocker", description: "Custom ball blocker on the top.", x: 55, y: 22 },
      { id: "matrix", name: "LED Matrix", short: "LED Matrix", description: "The LED matrix communicates information.", x: 67, y: 62 },
      { id: "shooter", name: "Shooter", short: "Shooter", description: "The shooter launches game pieces.", x: 52, y: 40 },
    ],
  },
};

export function RobotExplorer({ robot = "biobuzz" }: { robot?: "biobuzz" | "decode" }) {
  const config = robotConfigs[robot];
  const filterId = `robot-holo-${useId().replace(/:/g, "")}`;
  const [selectedId, setSelectedId] = useState(robot === "biobuzz" ? "turret" : "intake");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<{ pointerId: number; x: number; y: number; panX: number; panY: number } | null>(null);
  const selected = config.features.find((feature) => feature.id === selectedId) ?? config.features[0];
  if (!selected) return null;
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const changeZoom = (amount: number) => setZoom((value) => Math.round(Math.max(0.8, Math.min(1.5, value + amount)) * 10) / 10);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || g.pointerId !== event.pointerId) return;
    const limit = Math.min(90, event.currentTarget.clientWidth * 0.15);
    setPan({ x: Math.max(-limit, Math.min(limit, g.panX + event.clientX - g.x)), y: Math.max(-90, Math.min(90, g.panY + event.clientY - g.y)) });
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "+" || event.key === "=") { event.preventDefault(); changeZoom(0.1); }
    if (event.key === "-") { event.preventDefault(); changeZoom(-0.1); }
    if (event.key === "0") resetView();
  };
  const systemNumber = String(config.features.indexOf(selected) + 1).padStart(2, "0");
  return (
    <div className="overflow-hidden rounded-3xl border border-primary/30 bg-popover shadow-2xl shadow-primary/10">
      <svg width="0" height="0" className="absolute" aria-hidden="true"><filter id={filterId}>
        <feColorMatrix type="saturate" values="0" />
        <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
        <feComponentTransfer><feFuncR type="linear" slope="3.2" /><feFuncG type="linear" slope="3" /><feFuncB type="linear" slope="3.6" /></feComponentTransfer>
      </filter></svg>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/20 px-5 py-4 sm:px-7">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Competition assembly <span className="text-glow">/ {config.season}</span></p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-glow">{config.game} · Slingshot #20240</p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 border-b border-primary/20 lg:border-b-0 lg:border-r">
          <div className="robot-stage relative h-[420px] touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glow sm:h-[650px]" role="application" aria-label={`Interactive ${config.game} robot view`} tabIndex={0} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { gesture.current = null; setDragging(false); }} onKeyDown={onKeyDown}>
            <div className="robot-blueprint absolute inset-0 opacity-30" />
            <div className="robot-particles absolute inset-0" />
            <div className={`absolute inset-0 ${dragging ? "" : "robot-assembly"}`} data-robot-assembly style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <img src={config.image} alt={`Slingshot #20240 ${config.game} robot`} draggable={false} className="robot-holo pointer-events-none absolute inset-0 h-full w-full object-contain p-6 sm:p-16" style={{ filter: `url(#${filterId}) drop-shadow(0 0 10px var(--glow))` }} />
              {config.features.map((feature, index) => {
                const active = feature.id === selected.id;
                return <Button key={feature.id} variant={active ? "default" : "outline"} aria-label={`Learn about ${feature.name}`} aria-pressed={active} title={feature.name} onPointerDown={(event) => event.stopPropagation()} onClick={() => setSelectedId(feature.id)} className={`absolute z-20 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 font-mono text-[9px] font-semibold uppercase sm:px-3 sm:text-[10px] ${active ? "border-glow" : "border-primary/40 bg-background/90 text-foreground"}`} style={{ left: `${feature.x}%`, top: `${feature.y}%` }}><span className="text-glow">{String(index + 1).padStart(2, "0")}</span><span className="hidden sm:inline">{feature.name}</span></Button>;
              })}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-primary/20 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => changeZoom(-0.1)} aria-label="Zoom out" title="Zoom out" disabled={zoom <= 0.8}><Minus /></Button>
              <span className="w-12 text-center font-mono text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="icon" onClick={() => changeZoom(0.1)} aria-label="Zoom in" title="Zoom in" disabled={zoom >= 1.5}><Plus /></Button>
            </div>
            <Button variant="ghost" size="sm" onClick={resetView}><RotateCcw />Reset view</Button>
          </div>
        </div>
        <aside className="flex min-w-0 flex-col bg-background/35 p-4 sm:p-5" aria-label="Robot features">
          <div className="mb-4 flex items-center gap-2 px-2 pt-1"><Crosshair className="h-4 w-4 text-glow" /><h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore systems</h3></div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {config.features.map((feature, index) => <Button key={feature.id} variant={feature.id === selected.id ? "default" : "ghost"} onClick={() => setSelectedId(feature.id)} aria-pressed={feature.id === selected.id} className="h-12 justify-start px-3"><span className="font-mono text-[10px] text-glow">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium">{feature.short}</span></Button>)}
          </div>
          <div className="mt-5 flex-1 border-t border-primary/20 px-2 pt-5" aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-glow">System {systemNumber}</p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug">{selected.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{selected.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
