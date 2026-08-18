import { useEffect, useRef } from "react";

// Base coordinate system the curves are designed for — everything scales from this
const BASE_SIZE = 400;

// Points in the order the arrows travel: left -> top -> right -> back to left
const loopPoints = [
  { x: 50, y: 300 },  // left
  { x: 200, y: 60 },  // top
  { x: 350, y: 300 }, // right
];

// How far each control point reaches along the shared tangent — bigger = wider outward loop
const TENSION = 0.35;

// Build 3 cubic bezier segments where the tangent at each vertex is shared between
// the incoming and outgoing curve, so the path flows continuously in one direction
// with no cusp or "pull toward center" at the joins.
const buildLoopSegments = (pts, tension) => {
  const n = pts.length;
  return pts.map((p1, i) => {
    const p0 = pts[(i - 1 + n) % n];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = { x: p1.x + (p2.x - p0.x) * tension, y: p1.y + (p2.y - p0.y) * tension };
    const c2 = { x: p2.x - (p3.x - p1.x) * tension, y: p2.y - (p3.y - p1.y) * tension };
    return { start: p1, c1, c2, end: p2 };
  });
};

const segments = buildLoopSegments(loopPoints, TENSION);

const getPointOnCubic = (seg, t) => {
  const { start, c1, c2, end } = seg;
  const mt = 1 - t;
  const x = mt ** 3 * start.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * end.x;
  const y = mt ** 3 * start.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * end.y;
  return { x, y };
};

const guidePathD = segments
  .map(
    (seg, i) =>
      `${i === 0 ? `M ${seg.start.x} ${seg.start.y}` : ""} C ${seg.c1.x} ${seg.c1.y}, ${seg.c2.x} ${seg.c2.y}, ${seg.end.x} ${seg.end.y}`
  )
  .join(" ");

function LoadingSpinner({ size = 60, fullScreen = false, label }) {
  const ballRefs = useRef([]);
  const scale = size / BASE_SIZE;

  useEffect(() => {
    let animationFrame;
    const speed = 0.006;
    let progress = 0;
    const segCount = segments.length;
    const animate = () => {
      progress += speed;
      if (progress >= 1) progress = 0;
      const offsets = [0, 1 / 3, 2 / 3];
      offsets.forEach((offset, index) => {
        let ballProgress = progress + offset;
        if (ballProgress >= 1) ballProgress -= 1;
        const segIndex = Math.min(Math.floor(ballProgress * segCount), segCount - 1);
        const segProgress = ballProgress * segCount - segIndex;
        const position = getPointOnCubic(segments[segIndex], segProgress);
        const ball = ballRefs.current[index];
        if (ball) {
          ball.style.transform = `translate(${position.x * scale}px, ${position.y * scale}px)`;
        }
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [scale]);

  const ballSize = Math.max(6, size * 0.06);

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="relative overflow-visible" style={{ width: size, height: size }}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
          fill="none"
        >
          <path d={guidePathD} stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
        </svg>
        <div
          ref={(el) => (ballRefs.current[0] = el)}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dcb458] shadow-[0_0_10px_rgba(220,180,88,0.6)]"
          style={{ width: ballSize, height: ballSize }}
        />
        <div
          ref={(el) => (ballRefs.current[1] = el)}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D7A0F] shadow-[0_0_10px_rgba(45,122,15,0.6)]"
          style={{ width: ballSize, height: ballSize }}
        />
        <div
          ref={(el) => (ballRefs.current[2] = el)}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#022B00] shadow-[0_0_10px_rgba(2,43,0,0.6)]"
          style={{ width: ballSize, height: ballSize }}
        />
      </div>
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }
  return spinner;
}

export default LoadingSpinner;