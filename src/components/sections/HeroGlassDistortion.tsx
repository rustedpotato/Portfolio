"use client";

import { useEffect, useRef } from "react";

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

// 2D hash
float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Smooth noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

// FBM
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.y = 1.0 - uv.y; // flip Y to match DOM coords

  // Mouse in 0–1 space
  vec2 mouse = u_mouse / u_resolution;
  mouse.y = 1.0 - mouse.y;

  float dist = distance(uv, mouse);
  // Proximity weight: strong near cursor, fades at ~40% screen radius
  float proximity = 1.0 - smoothstep(0.0, 0.35, dist);

  // Animated FBM noise field
  float t = u_time * 0.28;
  float n = fbm(uv * 3.5 + t);
  float n2 = fbm(uv * 2.8 - t * 0.7 + 3.14);

  // Displacement amount — stronger near mouse
  float strength = 0.012 + proximity * 0.022;

  // Chromatic fringe: split R/G/B channels slightly
  vec2 offset  = vec2(n  - 0.5, n2 - 0.5) * strength;
  vec2 offsetR = offset * 1.3;
  vec2 offsetG = offset * 1.0;
  vec2 offsetB = offset * 0.7;

  // Sample the "refracted" noise field at displaced coords
  float refR = fbm((uv + offsetR) * 4.0 + t * 0.5);
  float refG = fbm((uv + offsetG) * 4.0 + t * 0.5);
  float refB = fbm((uv + offsetB) * 4.0 + t * 0.5);

  // Glass shimmer: only visible near the edges of distorted zones
  float shimmer = smoothstep(0.45, 0.55, refG) * proximity;

  // Output: faint iridescent white shimmer with slight amber tint
  vec3 color = mix(
    vec3(1.0, 0.97, 0.85),   // warm white
    vec3(0.91, 0.77, 0.28),  // accent amber
    refR * 0.5
  );

  // Alpha: only shimmer regions, no base fill
  float alpha = shimmer * 0.32 + (n - 0.5) * proximity * 0.08;
  alpha = clamp(alpha, 0.0, 0.55);

  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroGlassDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Compile shaders
    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vert || !frag) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime       = gl.getUniformLocation(prog, "u_time");
    const uResolution = gl.getUniformLocation(prog, "u_resolution");
    const uMouse      = gl.getUniformLocation(prog, "u_mouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let w = 0, h = 0;
    let mouseX = 0, mouseY = 0;
    let raf: number;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width  = Math.floor(w * window.devicePixelRatio * 0.5); // half-res for perf
      canvas.height = Math.floor(h * window.devicePixelRatio * 0.5);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (e.clientY - rect.top)  * (canvas.height / rect.height);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    const render = () => {
      const t = (performance.now() - startTime) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "screen",
        // Upscale from half-res via CSS — gives the blurry "glass" feel for free
        imageRendering: "auto",
      }}
    />
  );
}
