"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { LOGO_PATH } from "@/lib/logo";
import { getLenis, prefersReducedMotion } from "@/lib/runtime";

/**
 * The Acadex mark as a glossy 3D charm hanging on a chrome chain from the top of the hero.
 * It swings like a pendulum: cursor movement and scrolling nudge it, damping settles it.
 */
export default function HangingLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = prefersReducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 4, 6);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // ---------- materials ----------
    const chrome = new THREE.MeshStandardMaterial({ color: 0xdedede, metalness: 1, roughness: 0.14 });
    const enamel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4f46e5"),
      metalness: 0.15,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    });
    const rim = new THREE.MeshStandardMaterial({ color: 0xcfcfd4, metalness: 1, roughness: 0.2 });

    // ---------- logo charm ----------
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193 213"><path d="${LOGO_PATH}" fill="#000" fill-rule="evenodd"/></svg>`;
    const parsed = new SVGLoader().parse(svg);
    const shapes = parsed.paths.flatMap((p) => SVGLoader.createShapes(p));
    const logoGeo = new THREE.ExtrudeGeometry(shapes, {
      depth: 26,
      bevelEnabled: true,
      bevelThickness: 7,
      bevelSize: 3.5,
      bevelSegments: 8,
      curveSegments: 28,
    });
    logoGeo.center();
    logoGeo.rotateX(Math.PI); // SVG y points down; rotating (not mirroring) keeps faces the right way out
    const s = 2.35 / 213;
    logoGeo.scale(s, s, s);
    // face = enamel, sides/bevel = chrome-ish rim
    const logo = new THREE.Mesh(logoGeo, [enamel, rim]);

    // ---------- chain ----------
    const pivot = new THREE.Group(); // top of the chain; swings around this point
    scene.add(pivot);
    const linkGeo = new THREE.TorusGeometry(0.11, 0.028, 14, 36);
    linkGeo.scale(1, 1.45, 1);
    const LINKS = 7;
    const linkGap = 0.24;
    for (let i = 0; i < LINKS; i++) {
      const link = new THREE.Mesh(linkGeo, chrome);
      link.position.y = -i * linkGap;
      link.rotation.y = i % 2 ? Math.PI / 2 : 0;
      pivot.add(link);
    }
    const ringGeo = new THREE.TorusGeometry(0.2, 0.035, 16, 48);
    const ring = new THREE.Mesh(ringGeo, chrome);
    const ringY = -(LINKS - 1) * linkGap - 0.24;
    ring.position.y = ringY;
    ring.rotation.y = Math.PI / 2;
    pivot.add(ring);

    // the charm turns on its own axis under the ring
    const charm = new THREE.Group();
    charm.position.y = ringY - 0.2;
    logo.position.y = -1.18; // hang from the tip of the mark
    charm.add(logo);
    pivot.add(charm);

    // ---------- layout ----------
    let visibleTop = 0;
    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 10.5 : 9;
      camera.updateProjectionMatrix();
      visibleTop = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      pivot.position.y = visibleTop + 0.05; // chain starts just above the top edge
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---------- pendulum physics ----------
    const swing = { z: 0.18, vz: 0, x: 0, vx: 0 }; // start with a little swing so it feels alive
    let spin = 0.4;
    let spinV = 0;
    let lastMouseX: number | null = null;
    let targetTilt = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      targetTilt = nx;
      if (lastMouseX !== null) {
        const dx = (e.clientX - lastMouseX) / window.innerWidth;
        swing.vz -= dx * 1.6;
        spinV += dx * 0.25;
      }
      lastMouseX = e.clientX;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // ---------- loop (only while on screen) ----------
    let raf = 0;
    let running = false;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      if (!reduce) {
        const v = getLenis()?.velocity ?? 0;
        swing.vx += v * 0.0009 * dt * 60;

        // damped springs (small-angle pendulum)
        const k = 9;
        const c = 1.1;
        swing.vz += (-k * swing.z - c * swing.vz) * dt;
        swing.vx += (-k * swing.x - c * swing.vx) * dt;
        swing.z += swing.vz * dt;
        swing.x += swing.vx * dt;
        swing.z = THREE.MathUtils.clamp(swing.z, -0.6, 0.6);
        swing.x = THREE.MathUtils.clamp(swing.x, -0.4, 0.4);

        // the charm slowly turns back toward the viewer, with a hint of cursor tilt
        const spinTarget = targetTilt * 0.7 + Math.sin(now * 0.0005) * 0.25;
        spinV += (spinTarget - spin) * 2.2 * dt;
        spinV *= 1 - 1.6 * dt;
        spin += spinV;
      }

      pivot.rotation.z = swing.z;
      pivot.rotation.x = swing.x;
      charm.rotation.y = spin;
      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(wrap);

    // fade in once the first frame is ready
    renderer.render(scene, camera);
    wrap.style.opacity = "1";

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      [logoGeo, linkGeo, ringGeo].forEach((g) => g.dispose());
      [chrome, enamel, rim].forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[300px] opacity-0 transition-opacity duration-1000 sm:h-[400px] lg:h-[440px]"
    />
  );
}
