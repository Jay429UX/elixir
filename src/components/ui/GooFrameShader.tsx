"use client";

import { useEffect, useRef } from "react";

/* Real-time WebGL GLSL viscous green goo perimeter frame:
   - Domain-warped FBM liquid goo clinging to all 4 edges with animated viscous top drips
   - Finite-difference 3D surface normals for glossy wet specular highlights & Fresnel rim glow
   - Deep emerald-to-radioactive-lime subsurface colour absorption & internal caustics
   - 3D glass-shaded bubbles (diffuse + dual specular + rim) rising inside the goo & popping along the edges
   - Clean transparent center window so UI components sit unobstructed inside the living potion frame */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// Smooth-min for organic viscous metaball blending
float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// 3D glass-lit bubble sphere (matches DeepLiquidShader fidelity)
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
  float rim = pow(1.0 - z, 2.3);
  float edge = smoothstep(1.0, 1.0 - soft, len);
  vec3 col = vec3(0.35, 1.0, 0.45) * (0.06 + 0.18 * diff)
           + vec3(0.60, 1.0, 0.72) * rim * 0.95
           + vec3(1.0) * (spec * 1.2 + spec2);
  float a = (0.14 + rim * 0.78 + spec + spec2) * edge;
  return vec4(col * edge, clamp(a, 0.0, 1.0));
}

// Signed distance to a slim viscous goo perimeter frame (negative = inside goo, positive = open center)
float gooSdf(vec2 uv, float aspect, float t){
  // Wide rounded inner window so frame content stays completely unobstructed
  vec2 q = abs(uv - 0.5) - vec2(0.478, 0.458);
  float box = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.022;
  float frame = -box;

  // Subtle organic FBM liquid ripple along the perimeter
  float wave = (fbm(vec2(uv.x * 8.5 + t * 0.25, uv.y * 8.5 - t * 0.35)) - 0.5) * 0.014;
  frame += wave;

  // Slim undulating top edge (no heavy hanging drips)
  float topWave = 0.017 + 0.006 * sin(uv.x * 13.0 - t * 1.4) + 0.004 * sin(uv.x * 23.0 + t * 1.9);
  float topRim = (1.0 - uv.y) - topWave;

  // Slim simmering wavy pool along bottom edge
  float botWave = 0.023 + 0.008 * sin(uv.x * 16.0 + t * 1.8) + 0.005 * sin(uv.x * 29.0 - t * 2.4);
  float botPool = uv.y - botWave;

  float d = smin(frame, topRim, 0.016);
  d = smin(d, botPool, 0.018);

  // 5 viscous green metaball bubbles pinching off & rising upward from the bottom rim
  vec2 p = vec2(uv.x * aspect, uv.y);
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float bx = (fi == 0.0) ? 0.10 : (fi == 1.0 ? 0.28 : (fi == 2.0 ? 0.52 : (fi == 3.0 ? 0.74 : 0.90)));
    float phase = fract(t * (0.22 + fi * 0.03) + fi * 0.29);
    float riseY = 0.02 + phase * 0.14;
    float wobbleX = sin(phase * 6.28 + fi * 2.1) * 0.008;
    float blobR = (0.015 - phase * 0.007) * smoothstep(0.0, 0.14, phase) * smoothstep(1.0, 0.74, phase);
    float blob = length(p - vec2((bx + wobbleX) * aspect, riseY)) - max(blobR, 0.0001);
    d = smin(d, blob, 0.020);
  }

  return d;
}

vec4 perimeterBubbles(vec2 uv, float aspect, float scale, float speed, float seed, float t, float soft){
  vec2 p = vec2(uv.x * aspect, uv.y) * scale;
  p.y -= t * speed;
  vec2 id = floor(p);
  vec2 f = fract(p) - 0.5;
  float exists = step(0.46, hash(id + seed));
  float r = 0.14 + 0.16 * hash(id + seed + 7.0);
  vec2 c = (vec2(hash(id + seed + 3.0), hash(id * 1.7 + seed)) - 0.5) * 0.42;
  c.x += sin(t * 1.5 + hash(id + seed) * 6.28) * 0.06;
  return sphere(f, c, r, soft) * exists;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  float t = u_time;

  float d = gooSdf(uv, aspect, t);
  float mask = smoothstep(0.006, -0.004, d);

  // Soft outer radioactive aura bleeding slightly into the center
  float aura = exp(-max(d, 0.0) * 28.0) * 0.34;

  // Compute 3D surface normal from SDF gradient for glossy wet slime shading
  vec2 eps = vec2(0.004, 0.0);
  float gx = gooSdf(uv + eps.xy, aspect, t) - gooSdf(uv - eps.xy, aspect, t);
  float gy = gooSdf(uv + eps.yx, aspect, t) - gooSdf(uv - eps.yx, aspect, t);
  float depth = clamp(-d * 18.0, 0.0, 1.0);
  vec3 N = normalize(vec3(gx * 26.0, gy * 26.0, 0.35 + depth * 0.85));

  // Subsurface depth colour + internal shimmering FBM caustics
  float caustics = fbm(vec2(uv.x * 14.0 + t * 0.45, uv.y * 14.0 - t * 0.65));
  float caustics2 = fbm(vec2(uv.x * 24.0 - t * 0.7, uv.y * 24.0 + t * 0.5));
  float shimmer = pow(caustics * 0.6 + caustics2 * 0.4, 1.6);

  vec3 deepEmerald = vec3(0.02, 0.24, 0.06);
  vec3 midPotion   = vec3(0.10, 0.68, 0.14);
  vec3 neonRim     = vec3(0.38, 1.00, 0.22);
  vec3 hotSpec     = vec3(0.88, 1.00, 0.78);

  vec3 baseCol = mix(neonRim, midPotion, smoothstep(0.0, 0.45, depth));
  baseCol = mix(baseCol, deepEmerald, smoothstep(0.35, 1.0, depth));
  baseCol += vec3(0.28, 0.95, 0.24) * shimmer * 0.55;

  // Upper-left key light + wet specular highlight + glowing Fresnel meniscus
  vec3 L = normalize(vec3(-0.45, 0.72, 0.55));
  float diff = max(dot(N, L), 0.0);
  float spec = pow(max(dot(N, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 34.0);
  float meniscus = smoothstep(0.024, 0.0, abs(d)) * (0.75 + 0.25 * sin(uv.x * 18.0 + t * 2.4));

  vec3 gooCol = baseCol * (0.65 + 0.55 * diff) + hotSpec * spec * 0.95 + neonRim * meniscus * 0.65;

  // 3 depth layers of 3D glass-lit bubbles trapped inside the viscous goo
  vec4 b1 = perimeterBubbles(uv, aspect, 18.0, 0.16, 11.0, t, 0.16) * 0.55;
  vec4 b2 = perimeterBubbles(uv, aspect, 11.0, 0.26, 29.0, t, 0.09) * 0.85;
  vec4 b3 = perimeterBubbles(uv, aspect, 7.2,  0.34, 53.0, t, 0.07) * 0.95;

  gooCol = gooCol * (1.0 - b1.a * 0.4) + b1.rgb;
  gooCol = gooCol * (1.0 - b2.a * 0.5) + b2.rgb;
  gooCol = gooCol * (1.0 - b3.a * 0.55) + b3.rgb;

  // Composite goo + aura cleanly with alpha=0 in the open center
  vec3 outRgb = gooCol * mask + vec3(0.28, 0.96, 0.22) * aura * (1.0 - mask);
  float outA = clamp(mask * 0.95 + aura, 0.0, 1.0);

  gl_FragColor = vec4(outRgb, outA);
}
`;

export default function GooFrameShader({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 2.4 : (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
