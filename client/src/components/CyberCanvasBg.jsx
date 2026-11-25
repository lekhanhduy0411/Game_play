import { useEffect, useRef, useState } from "react";

const VARIANT_CONFIG = {
  TITLE: {
    src: "/images/bg-title.png",
    fallbackBg:
      "radial-gradient(circle at 20% 25%, rgba(245, 158, 11, 0.22), transparent 48%), radial-gradient(circle at 82% 75%, rgba(6, 182, 212, 0.2), transparent 50%), linear-gradient(160deg, #060A11 0%, #0B1324 55%, #060A11 100%)",
  },
  DESK: {
    src: "/images/bg-desk.png",
    fallbackBg:
      "radial-gradient(circle at 15% 20%, rgba(245, 158, 11, 0.18), transparent 45%), radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.18), transparent 45%), radial-gradient(circle at 50% 90%, rgba(245, 158, 11, 0.12), transparent 50%), linear-gradient(180deg, #060A11 0%, #09111E 50%, #060A11 100%)",
  },
  BOSS: {
    src: "/images/bg-boss.png",
    fallbackBg:
      "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.22), transparent 52%), radial-gradient(circle at 15% 80%, rgba(245, 158, 11, 0.15), transparent 45%), linear-gradient(160deg, #0D050A 0%, #150710 50%, #060A11 100%)",
  },
};

export default function CyberCanvasBg({ variant = "DESK" }) {
  const activeVariant = VARIANT_CONFIG[variant] ? variant : "DESK";
  const canvasRef = useRef(null);
  const variantRef = useRef(activeVariant);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    variantRef.current = activeVariant;
  }, [activeVariant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Layer 3A: Gentle slanted rainfall
    const RAIN_COUNT = 110;
    const raindrops = Array.from({ length: RAIN_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 12 + Math.random() * 20,
      speed: 4.5 + Math.random() * 5.2,
      opacity: 0.08 + Math.random() * 0.16,
      isWarm: Math.random() < 0.24,
    }));

    // Layer 3B: Delicate water streaks sliding down smoked glass
    const STREAK_COUNT = 14;
    const glassStreaks = Array.from({ length: STREAK_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: 0.25 + Math.random() * 0.42,
      trail: 26 + Math.random() * 48,
      r: 1.1 + Math.random() * 1.3,
      wobble: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const isBoss = variantRef.current === "BOSS";

      // Transparent clear so real background artwork shines through cleanly
      ctx.clearRect(0, 0, width, height);

      // Slanted rainfall
      const windX = -1.35;
      ctx.lineCap = "round";
      for (const drop of raindrops) {
        drop.x += windX;
        drop.y += drop.speed;
        if (drop.y > height + 24) {
          drop.y = -24;
          drop.x = Math.random() * (width + 120);
        }
        if (drop.x < -30) {
          drop.x = width + 20;
        }

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + windX * 2.2, drop.y + drop.len);
        ctx.strokeStyle = isBoss
          ? `rgba(244, 63, 94, ${drop.opacity * 1.15})`
          : drop.isWarm
          ? `rgba(245, 158, 11, ${drop.opacity * 0.95})`
          : `rgba(148, 226, 240, ${drop.opacity})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // Thin water droplets sliding down glass
      for (const s of glassStreaks) {
        s.y += s.vy;
        s.wobble += 0.015;
        const wx = s.x + Math.sin(s.wobble) * 1.1;

        if (s.y - s.trail > height) {
          s.y = -15;
          s.x = Math.random() * width;
        }

        const streakGrad = ctx.createLinearGradient(wx, s.y - s.trail, wx, s.y);
        streakGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
        streakGrad.addColorStop(
          0.8,
          isBoss ? "rgba(244, 63, 94, 0.16)" : "rgba(6, 182, 212, 0.14)"
        );
        streakGrad.addColorStop(1, "rgba(245, 158, 11, 0.28)");

        ctx.beginPath();
        ctx.moveTo(wx, s.y - s.trail);
        ctx.lineTo(wx, s.y);
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(wx, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 232, 240, 0.26)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#060A11]">
      {/* LAYER 1: Real Cinematic Background Artworks + CSS Gradient Fallbacks with Smooth 700ms Crossfade */}
      {Object.entries(VARIANT_CONFIG).map(([key, cfg]) => {
        const isActive = key === activeVariant;
        const imgFailed = Boolean(failedImages[key]);
        return (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: cfg.fallbackBg }}
          >
            {!imgFailed && (
              <img
                src={cfg.src}
                alt=""
                aria-hidden="true"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [key]: true }))
                }
                className="object-cover w-full h-full scale-[1.01]"
              />
            )}
          </div>
        );
      })}

      {/* LAYER 2: Readability Veil — Horizontal Asymmetric Reveal on TITLE, Balanced Dark Veil on DESK/BOSS */}
      {activeVariant === "TITLE" ? (
        <div className="absolute inset-0 bg-gradient-to-r from-[#060A11]/90 via-[#060A11]/55 to-[#060A11]/30" />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#060A11]/75 via-[#060A11]/65 to-[#060A11]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,10,17,0.45)_0%,rgba(6,10,17,0.12)_60%,rgba(6,10,17,0.52)_100%)]" />
        </>
      )}

      {/* LAYER 3: Slanted Neo-Saigon Rain & Glass Droplets Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="noir-glass-overlay absolute inset-0" />
    </div>
  );
}
