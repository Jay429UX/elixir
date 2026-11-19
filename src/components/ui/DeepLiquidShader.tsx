"use client";

import { useEffect, useRef } from "react";

/* A deeper, more 3D take on the bubbling potion floor.
   - Colour changes with depth: glowing lime under the surface, dark emerald at the bottom.
   - Bubbles are shaded as spheres (diffuse, a specular dot, a second reflection and a glassy rim).
   - Four depth layers: tiny dim blurry ones at the back, big soft out-of-focus ones at the front, each moving at its own speed for parallax.
   - Caustics shimmer on the floor, optional light shafts fall from the surface, and a glass-edge vignette frames the tank.
   - Bubbles that leave the liquid float as shaded soap bubbles and pop into droplets. */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_power;
uniform float u_rays;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

// A glassy sphere lit from the upper left. rgb is additive light, a is how much it covers what is behind.
// soft widens the outer edge so far-away bubbles read as out of focus.
vec4 sphere(vec2 p, vec2 c, float r, float soft){
  vec2 q = (p - c) / r;
  float d2 = dot(q, q);
  if (d2 > 1.0) return vec4(0.0);
  float len = sqrt(d2);
  float z = sqrt(1.0 - d2);
  vec3 n = vec3(q, z);
  vec3 L = normalize(vec3(-0.45, 0.65, 0.62));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 42.0);
  vec3 L2 = normalize(vec3(0.5, -0.6, 0.6));
  float spec2 = pow(max(dot(n, normalize(L2 + vec3(0.0, 0.0, 1.0))), 0.0), 16.0) * 0.35;
  float rim = pow(1.0 - z, 2.4);
  float edge = smoothstep(1.0, 1.0 - soft, len);
  vec3 col = vec3(0.35, 1.0, 0.5) * (0.05 + 0.16 * diff) + vec3(0.55, 1.0, 0.7) * rim * 0.95 + vec3(1.0) * (spec * 1.15 + spec2);
  float a = (0.10 + rim * 0.75 + spec + spec2) * edge;
  return vec4(col * edge, clamp(a, 0.0, 1.0));
}

// One depth layer of bubbles on a scrolling jittered grid.
vec4 bubbleLayer(vec2 uv, float aspect, float scale, float speed, float seed, float t, float soft){
  vec2 p = vec2(uv.x * aspect, uv.y) * scale;
  p.y -= t * speed;
  vec2 id = floor(p);
  vec2 f = fract(p) - 0.5;
  float exists = step(0.50, hash(id + seed));
  float r = 0.13 + 0.15 * hash(id + seed + 7.0);
  vec2 c = (vec2(hash(id + seed + 3.0), hash(id * 1.7 + seed)) - 0.5) * 0.42;
  c.x += sin(t * 1.4 + hash(id + seed) * 6.28) * 0.06;
  return sphere(f, c, r, soft) * exists;
}

// Bubbles that leave the liquid: rise, drift as soap bubbles, then pop into a ring and droplets.
vec4 floaters(vec2 uv, float aspect, float t, float surf){
  vec4 acc = vec4(0.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float h1 = hash(vec2(fi, 3.1));
    float h2 = hash(vec2(fi, 7.7));
    float h3 = hash(vec2(fi, 11.3));
    float period = 3.8 + h1 * 2.8;
    float u = fract(t / period + h2);
    float popStart = 0.84;
    float k = clamp(u / popStart, 0.0, 1.0);
    float peak = surf + 0.07 + h2 * 0.15;
    float y = mix(-0.04, peak, k * 0.75 + smoothstep(0.0, 1.0, k) * 0.25);
    float airborne = smoothstep(surf - 0.02, surf + 0.12, y);
    float x = (floor(mod(fi, 6.0)) + 0.5 + (h3 - 0.5) * 0.8) / 6.0;
    x += sin(u * 9.0 + h3 * 6.28) * 0.022 + airborne * (h1 - 0.5) * 0.16;
    vec2 c = vec2(x * aspect, y);
    float r = 0.048 + h1 * 0.05;
    float popT = clamp((u - popStart) / (1.0 - popStart), 0.0, 1.0);
    float rr = r * (1.0 + popT * 0.5);
    vec4 s = sphere(p, c, rr, 0.08);
    float alive = 1.0 - popT;
    float a = s.a * alive;
    vec3 rgb = s.rgb * alive;
    for (int j = 0; j < 6; j++) {
      float ang = float(j) * 1.047 + h3 * 6.28;
      vec2 dp = c + vec2(cos(ang), sin(ang)) * r * (1.0 + popT * 2.4);
      float dr = smoothstep(0.016, 0.0, length(p - dp)) * step(0.0001, popT) * (1.0 - popT);
      a += dr * 0.9;
      rgb += vec3(0.7, 1.0, 0.8) * dr * 0.9;
    }
    float fade = smoothstep(0.99, 0.74, uv.y);
    acc.rgb += rgb * fade;
    acc.a += a * fade;
  }
  acc.a = clamp(acc.a, 0.0, 1.0);
  return acc;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float t = u_time;

  float surf = 0.64 + 0.02 * sin(uv.x * 9.0 + t * 1.4) + 0.012 * sin(uv.x * 21.0 - t * 2.0);
  float inside = smoothstep(surf, surf - 0.015, uv.y);
  float d = clamp((surf - uv.y) / 0.64, 0.0, 1.0);          // 0 at the surface, 1 on the floor

  // colour absorbs with depth
  vec3 shallow = vec3(0.30, 1.0, 0.12);
  vec3 mid = vec3(0.04, 0.50, 0.08);
  vec3 deep = vec3(0.0, 0.10, 0.03);
  vec3 col = mix(shallow, mid, smoothstep(0.0, 0.35, d));
  col = mix(col, deep, smoothstep(0.25, 1.0, d));
  col += vec3(0.30, 1.0, 0.20) * exp(-d * 7.0) * 0.35;      // glow just under the surface

  // light shafts falling from the surface
  float shaft = pow(noise(vec2(uv.x * aspect * 4.0 + uv.y * 0.7 - t * 0.06, t * 0.05)), 2.0);
  col += vec3(0.4, 1.0, 0.3) * shaft * pow(1.0 - d, 2.0) * 0.38 * u_rays;

  // caustics on the floor
  float c1 = fbm(vec2(uv.x * aspect * 3.2 + t * 0.15, uv.y * 3.2 - t * 0.10));
  col += vec3(0.5, 1.0, 0.3) * pow(c1, 3.0) * smoothstep(0.35, 1.0, d) * 0.55 * u_power;

  // glass sides and a darker floor frame the tank
  float side = smoothstep(0.0, 0.07, uv.x) * smoothstep(0.0, 0.07, 1.0 - uv.x);
  col *= mix(0.55, 1.0, side);
  col *= mix(1.0, 0.72, smoothstep(0.7, 1.0, d));

  // bubbles, back to front, each fading just under the surface so they break through it
  float pop = smoothstep(surf - 0.01, surf - 0.12, uv.y);
  vec4 b1 = bubbleLayer(uv, aspect, 8.5, 0.20, 31.0, t, 0.55) * 0.5;
  vec4 b2 = bubbleLayer(uv, aspect, 5.4, 0.34, 11.0, t, 0.20) * 0.85;
  vec4 b3 = bubbleLayer(uv, aspect, 3.1, 0.50, 1.0, t, 0.08);
  vec4 b4 = bubbleLayer(uv, aspect, 1.7, 0.62, 41.0, t, 0.60) * 0.5;
  col = col * (1.0 - 0.25 * b1.a * pop) + b1.rgb * pop;
  col = col * (1.0 - 0.25 * b2.a * pop) + b2.rgb * pop;
  col = col * (1.0 - 0.25 * b3.a * pop) + b3.rgb * pop;
  col = col * (1.0 - 0.20 * b4.a * pop) + b4.rgb * pop;

  // the surface lip: a bright meniscus with a highlight that slides along it
  float lip = smoothstep(0.03, 0.0, abs(uv.y - (surf - 0.008)));
  float streak = pow(sin(uv.x * aspect * 5.0 - t * 1.2) * 0.5 + 0.5, 6.0);
  col += vec3(0.8, 1.0, 0.5) * lip * (0.9 + 0.9 * streak);

  vec4 f = floaters(uv, aspect, t, surf);
  float a = min(1.0, inside + f.a);
  vec3 rgb = min(col * inside + f.rgb, vec3(a));
  gl_FragColor = vec4(rgb, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function DeepLiquidShader({ className = "", power = 1, rays = false, scale = 0.75 }: { className?: string; power?: number; rays?: boolean; scale?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    gl.uniform1f(gl.getUniformLocation(prog, "u_power"), power);
    gl.uniform1f(gl.getUniformLocation(prog, "u_rays"), rays ? 1 : 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(2, Math.round(canvas.clientWidth * dpr * scale));
      const h = Math.max(2, Math.round(canvas.clientHeight * dpr * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const draw = (t: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const elapsed = () => (performance.now() - start) / 1000;
    const frame = () => { draw(elapsed()); raf = requestAnimationFrame(frame); };
    const observer = new ResizeObserver(() => { resize(); draw(reduce ? 2.0 : elapsed()); });
    observer.observe(canvas);
    resize();
    draw(reduce ? 2.0 : 0);
    if (!reduce) raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (reduce) return;
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [power, rays, scale]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none block ${className}`} />;
}
