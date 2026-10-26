"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { prefersReducedMotion } from "@/lib/gsap";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * Two layers of animated simplex noise, warped by a third, tinted between the
 * accent lime and violet. One full-screen quad — no geometry, no lighting, so
 * it costs a single fragment pass per frame.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uScroll;

  // Ashima simplex noise.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Keep the pattern square regardless of viewport aspect.
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.045;

    // Domain warp: noise driving the lookup of more noise.
    vec2 warp = vec2(
      snoise(p * 1.2 + vec2(t, 0.0)),
      snoise(p * 1.2 + vec2(0.0, t * 1.3))
    );

    // Pointer nudges the field; scroll slides it so the hero keeps moving as
    // the page leaves.
    p += warp * 0.42 + uPointer * 0.07;
    p.y += uScroll * 0.35;

    // Lower frequencies than you'd expect: large, slow forms read as depth,
    // while tighter noise reads as green blobs sitting on top of the page.
    float n1 = snoise(p * 0.85 + t * 1.4);
    float n2 = snoise(p * 1.9 - t * 0.9);
    float field = n1 * 0.7 + n2 * 0.3;

    vec3 ink    = vec3(0.031, 0.035, 0.043);
    vec3 lime   = vec3(0.796, 1.000, 0.353);
    vec3 violet = vec3(0.545, 0.361, 0.965);

    // Wide, soft bands at low opacity. This sits behind a headline, so it has
    // to stay closer to the background than to the accent.
    float limeBand   = smoothstep(-0.1, 0.95, field);
    float violetBand = smoothstep(0.05, 1.05, -field);

    vec3 color = ink;
    color = mix(color, lime,   limeBand   * 0.17);
    color = mix(color, violet, violetBand * 0.15);

    // Vignette, plus a fade along the bottom so it meets the page background.
    float vignette = smoothstep(1.15, 0.25, length(uv - 0.5) * 1.6);
    color = mix(ink, color, vignette);
    color = mix(color, ink, smoothstep(0.55, 1.0, uv.y));

    // Dither to kill banding across the large soft gradients.
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.015;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function HeroCanvas({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Reduced motion: leave the CSS fallback showing and don't start a loop.
    if (prefersReducedMotion()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      // No WebGL (old browser, blocklisted driver, hardware accel off) — the
      // fallback underneath is already on screen, so there's nothing to do.
      return;
    }

    // Cap DPR — this is a soft background, and 3x on a phone is wasted fill rate.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(host.clientWidth, host.clientHeight),
      },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms }),
    );
    scene.add(mesh);

    const pointerTarget = new THREE.Vector2(0, 0);
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      if (!host.clientWidth) return;
      renderer.setSize(host.clientWidth, host.clientHeight);
      uniforms.uResolution.value.set(host.clientWidth, host.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(host);

    // Don't burn frames when the hero is scrolled past or the tab is hidden.
    let onscreen = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(host);

    const clock = new THREE.Clock();
    let frame = 0;

    const render = () => {
      frame = requestAnimationFrame(render);
      if (!onscreen || document.hidden) return;

      uniforms.uTime.value = clock.getElapsedTime();
      // Ease the pointer so the field drifts rather than snapping.
      uniforms.uPointer.value.lerp(pointerTarget, 0.045);
      uniforms.uScroll.value = window.scrollY / window.innerHeight;

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      visibility.disconnect();
      mesh.geometry.dispose();
      (mesh.material as THREE.ShaderMaterial).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  /*
   * The CSS stand-in is always rendered, and the canvas host sits on top of
   * it. When WebGL starts, its opaque canvas covers the fallback; when it
   * can't (no WebGL, reduced motion, JS off), the fallback is simply what you
   * see. No state, so no second render and nothing to mismatch on hydration.
   */
  return (
    <div aria-hidden className={className}>
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute top-20 -right-20 size-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      </div>
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
