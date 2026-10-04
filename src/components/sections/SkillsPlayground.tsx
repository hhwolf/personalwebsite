"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { skillCategories, skills, type Skill, type SkillCategory } from "@/data/skills";

type Filter = "All" | SkillCategory;

const PHYSICS_QUERY =
  "(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)";
const STAGE_HEIGHT = 520;

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(PHYSICS_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const physicsAllowed = () => window.matchMedia(PHYSICS_QUERY).matches;
const physicsAllowedOnServer = () => false;

const pillTone: Record<SkillCategory, string> = {
  Languages: "border-ember text-ember shadow-[0_0_24px_-6px_rgb(242_163_58/0.7)]",
  Frontend: "border-bone/70 text-bone",
  Backend: "border-ash-200/50 text-ash-200",
  Tools: "border-ash-600 text-ash-400",
};

function Pill({ skill, className = "" }: { skill: Skill; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border bg-ink-raised/90 px-5 py-2.5 font-mono text-sm tracking-wide whitespace-nowrap select-none ${pillTone[skill.category]} ${className}`}
    >
      {skill.name}
    </span>
  );
}

/**
 * Skills as draggable physics pills (desktop, fine pointer, motion allowed)
 * with a static animated grid everywhere else. Server-renders the grid so the
 * no-JS experience is complete.
 */
export function SkillsPlayground() {
  const [filter, setFilter] = useState<Filter>("All");
  const canPhysics = useSyncExternalStore(subscribe, physicsAllowed, physicsAllowedOnServer);
  const visible = filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter skills by category"
        data-reveal
      >
        <span className="label mr-2 text-ash-400">Filter {"//"}</span>
        {(["All", ...skillCategories] as Filter[]).map((f) => {
          const count = f === "All" ? skills.length : skills.filter((s) => s.category === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors ${
                active
                  ? "border-ember bg-ember/10 text-ember"
                  : "border-line text-ash-200 hover:border-ash-400 hover:text-bone"
              }`}
            >
              {f} <span className="text-ash-400">[{String(count).padStart(2, "0")}]</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10" style={{ minHeight: STAGE_HEIGHT }} data-reveal>
        {canPhysics ? (
          <PhysicsStage visible={visible} />
        ) : (
          <motion.ul layout className="flex flex-wrap justify-center gap-3">
            <AnimatePresence initial={false}>
              {visible.map((s) => (
                <motion.li
                  key={s.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Pill skill={s} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      <p className="label mt-4 flex justify-between text-ash-400">
        <span>sys://skills</span>
        <span className="hidden md:inline">
          {canPhysics ? "Drag · Throw · Double-click to shake" : "Tap a filter"}
        </span>
      </p>
    </div>
  );
}

type Engine = import("matter-js").Engine;
type Body = import("matter-js").Body;
type MatterModule = typeof import("matter-js");

function PhysicsStage({ visible }: { visible: Skill[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef(new Map<string, HTMLElement>());
  const sim = useRef<{
    M: MatterModule;
    engine: Engine;
    bodies: Map<string, Body>;
    walls: Body[];
  } | null>(null);
  const [ready, setReady] = useState(false);

  // Build the world once.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cancelled = false;
    let raf = 0;
    let running = true;
    let last = performance.now();

    const cleanups: Array<() => void> = [];

    import("matter-js").then((M) => {
      if (cancelled) return;
      const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body, Events } = M;
      const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
      const bodies = new Map<string, Body>();

      const makeWalls = () => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        const t = 200;
        return [
          Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, { isStatic: true }),
          Bodies.rectangle(-t / 2, h / 2 - h, t, h * 4, { isStatic: true }),
          Bodies.rectangle(w + t / 2, h / 2 - h, t, h * 4, { isStatic: true }),
        ];
      };
      let walls = makeWalls();
      Composite.add(engine.world, walls);

      const addBody = (name: string, index: number) => {
        const el = pillRefs.current.get(name);
        if (!el || bodies.has(name)) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const x = w / 2 + Math.random() * Math.max(1, stage.clientWidth - w);
        const y = -h - index * 28 - Math.random() * 60;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.35,
          friction: 0.25,
          frictionAir: 0.012,
          angle: (Math.random() - 0.5) * 0.6,
          label: name,
        });
        bodies.set(name, body);
        Composite.add(engine.world, body);
      };
      skills.forEach((s, i) => addBody(s.name, i));

      // Drag with the mouse, but never swallow the wheel so the page still scrolls.
      const mouse = Mouse.create(stage);
      const m = mouse as unknown as { mousewheel: EventListener; element: HTMLElement };
      m.element.removeEventListener("wheel", m.mousewheel);
      m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
      const mc = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, damping: 0.1, render: { visible: false } },
      });
      Composite.add(engine.world, mc);
      Events.on(mc, "startdrag", () => stage.classList.add("cursor-grabbing"));
      Events.on(mc, "enddrag", () => stage.classList.remove("cursor-grabbing"));

      const shake = () => {
        bodies.forEach((b) => {
          if (!Composite.get(engine.world, b.id, "body")) return;
          Body.applyForce(b, b.position, {
            x: (Math.random() - 0.5) * 0.08 * b.mass,
            y: -(0.06 + Math.random() * 0.06) * b.mass,
          });
        });
      };
      stage.addEventListener("dblclick", shake);
      cleanups.push(() => stage.removeEventListener("dblclick", shake));

      const sync = () => {
        bodies.forEach((b, name) => {
          const el = pillRefs.current.get(name);
          if (!el) return;
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate3d(${b.position.x - w / 2}px, ${b.position.y - h / 2}px, 0) rotate(${b.angle}rad)`;
        });
      };

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!running) {
          last = now;
          return;
        }
        const dt = Math.min(now - last, 16.667);
        last = now;
        Engine.update(engine, dt);
        sync();
      };
      raf = requestAnimationFrame(loop);

      // Pause offscreen or when the tab is hidden.
      const io = new IntersectionObserver(([entry]) => {
        running = entry.isIntersecting && !document.hidden;
      });
      io.observe(stage);
      const onVis = () => {
        running = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVis);
      cleanups.push(() => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      });

      // Rebuild walls and keep bodies inside when the stage resizes.
      const ro = new ResizeObserver(() => {
        Composite.remove(engine.world, walls);
        walls = makeWalls();
        Composite.add(engine.world, walls);
        const w = stage.clientWidth;
        bodies.forEach((b) => {
          if (b.position.x > w) Body.setPosition(b, { x: w - 40, y: Math.min(b.position.y, 0) });
        });
        if (sim.current) sim.current.walls = walls;
      });
      ro.observe(stage);
      cleanups.push(() => ro.disconnect());

      sim.current = { M, engine, bodies, walls };
      setReady(true);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      if (sim.current) {
        sim.current.M.Composite.clear(sim.current.engine.world, false);
        sim.current.M.Engine.clear(sim.current.engine);
        sim.current = null;
      }
    };
  }, []);

  // Apply the filter: remove non-matching bodies, drop matching ones back in.
  useEffect(() => {
    const s = sim.current;
    if (!s) return;
    const { Composite, Body } = s.M;
    const stage = stageRef.current;
    const keep = new Set(visible.map((v) => v.name));
    s.bodies.forEach((body, name) => {
      const inWorld = !!Composite.get(s.engine.world, body.id, "body");
      const el = pillRefs.current.get(name);
      if (keep.has(name) && !inWorld) {
        const w = stage?.clientWidth ?? 800;
        Body.setPosition(body, { x: 60 + Math.random() * Math.max(1, w - 120), y: -80 });
        Body.setVelocity(body, { x: 0, y: 0 });
        Body.setAngularVelocity(body, 0);
        Composite.add(s.engine.world, body);
        if (el) el.style.visibility = "";
      } else if (!keep.has(name) && inWorld) {
        Composite.remove(s.engine.world, body);
        if (el) el.style.visibility = "hidden";
      }
    });
  }, [visible, ready]);

  return (
    <div
      ref={stageRef}
      className="relative cursor-grab overflow-hidden rounded-2xl border border-line bg-[radial-gradient(80%_60%_at_50%_100%,rgb(242_163_58/0.08),transparent_70%)]"
      style={{ height: STAGE_HEIGHT }}
      aria-label="Interactive skills playground"
      data-cursor="drag"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2efe9 1px, transparent 1px), linear-gradient(to bottom, #f2efe9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <ul className="contents">
        {skills.map((s) => (
          <li
            key={s.name}
            ref={(el) => {
              if (el) pillRefs.current.set(s.name, el);
              else pillRefs.current.delete(s.name);
            }}
            className="absolute top-0 left-0 will-change-transform"
            style={{ visibility: ready ? undefined : "hidden" }}
          >
            <Pill skill={s} className="cursor-[inherit]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
