import { Play, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface HeroSectionProps {
  onBookClick?: () => void;
  onVideoClick?: () => void;
  onScrollDown?: () => void;
}

// ── Brand palette extracted from Kayaking Kalawewa logo ──
// Navy blue:  #1B3A6B (body/hull/text)
// Cyan/teal:  #00B4D8 (water waves)
// Deep cyan:  #0077A8 (secondary water)
// Red:        #E63329 (sun circle)
// Light cyan: #48CAE4 (water highlights)

const STATS = [
  { target: 500, suffix: "+", label: "Happy Adventurers", decimals: 0 },
  { target: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { target: 100, suffix: "%", label: "Safe Record", decimals: 0 },
];

function useCountUp(
  target: number,
  duration = 1800,
  decimals = 0,
  started = false
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((target * ease).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, decimals, started]);
  return value;
}

function StatItem({
  stat,
  started,
  isLast,
}: {
  stat: (typeof STATS)[0];
  started: boolean;
  isLast: boolean;
}) {
  const val = useCountUp(stat.target, 1800, stat.decimals, started);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "0 28px",
        position: "relative",
        flex: "0 0 auto",
      }}
    >
      {!isLast && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "36px",
            width: "1px",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      )}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "34px",
          fontWeight: 700,
          color: "#48CAE4",
          lineHeight: 1,
          marginBottom: "4px",
          letterSpacing: "-0.5px",
        }}
      >
        {stat.decimals ? val.toFixed(stat.decimals) : Math.round(val)}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export function HeroSection({
  onBookClick,
  onVideoClick,
  onScrollDown,
}: HeroSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const rippleIdRef = useRef(0);

  // ── Canvas animated scene ──
  const drawScene = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const t = tRef.current;

    ctx.clearRect(0, 0, W, H);

    // ── Sky gradient (deep navy to dark teal-navy) ──
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.58);
    skyGrad.addColorStop(0, "#060e1f");
    skyGrad.addColorStop(0.3, "#0a1832");
    skyGrad.addColorStop(0.65, "#0b2040");
    skyGrad.addColorStop(1, "#0d2a3a");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.58);

    // ── Stars ──
    for (let i = 0; i < 80; i++) {
      const sx = ((i * 173.1) % 1) * W;
      const sy = ((i * 97.3) % 1) * H * 0.38;
      const a = (0.15 + 0.6 * Math.abs(Math.sin(t * 0.0008 + i))) * (i % 3 === 0 ? 1 : 0.5);
      ctx.beginPath();
      ctx.arc(sx, sy, i % 5 === 0 ? 1.2 : 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,230,255,${a})`;
      ctx.fill();
    }

    // ── Red sun / moon (from logo) ──
    const sunX = W * 0.78, sunY = H * 0.14;
    // outer glow
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 55);
    sunGlow.addColorStop(0, "rgba(230,51,41,0.25)");
    sunGlow.addColorStop(1, "rgba(230,51,41,0)");
    ctx.fillStyle = sunGlow;
    ctx.beginPath(); ctx.arc(sunX, sunY, 55, 0, Math.PI * 2); ctx.fill();
    // sun disc
    ctx.beginPath(); ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#E63329"; ctx.fill();
    // crescent mask
    ctx.beginPath(); ctx.arc(sunX + 7, sunY - 4, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#060e1f"; ctx.fill();

    // ── Floating light orbs (cyan tones) ──
    [
      { x: 0.12, y: 0.22, r: 180, c: "rgba(0,180,216,0.06)" },
      { x: 0.55, y: 0.18, r: 140, c: "rgba(27,58,107,0.08)" },
      { x: 0.85, y: 0.3,  r: 200, c: "rgba(0,119,168,0.07)" },
    ].forEach((orb, i) => {
      const ox = orb.x * W + 12 * Math.sin(t * 0.0004 + i * 2);
      const oy = orb.y * H + 8 * Math.cos(t * 0.0003 + i * 1.5);
      const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
      og.addColorStop(0, orb.c);
      og.addColorStop(1, "transparent");
      ctx.fillStyle = og;
      ctx.beginPath(); ctx.arc(ox, oy, orb.r, 0, Math.PI * 2); ctx.fill();
    });

    // ── Tree silhouettes (jungle, navy-dark) ──
    const drawTree = (tx: number, ty: number, h: number, w: number, seed: number) => {
      ctx.save(); ctx.translate(tx, ty);
      // trunk
      ctx.fillStyle = "#05100a";
      ctx.fillRect(-w * 0.04, 0, w * 0.08, h * 0.3);
      for (let l = 0; l < 3; l++) {
        const ly = -h * (0.28 + l * 0.26);
        const lw = w * (0.9 - l * 0.22) * (1 + 0.03 * Math.sin(t * 0.0007 + seed + l));
        const lh = h * (0.36 - l * 0.04);
        ctx.fillStyle = l === 0 ? "#0a2215" : l === 1 ? "#091a10" : "#07130b";
        ctx.beginPath();
        ctx.moveTo(0, ly - lh);
        ctx.bezierCurveTo(-lw * 0.55, ly - lh * 0.4, -lw * 0.5, ly, -lw, ly + lh * 0.18);
        ctx.bezierCurveTo(-lw * 0.28, ly + lh * 0.04, lw * 0.28, ly + lh * 0.04, lw, ly + lh * 0.18);
        ctx.bezierCurveTo(lw * 0.5, ly, lw * 0.55, ly - lh * 0.4, 0, ly - lh);
        ctx.fill();
        // subtle cyan rim light on top layer
        if (l === 2) {
          ctx.strokeStyle = "rgba(0,180,216,0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      // hanging vines
      for (let v = 0; v < 3; v++) {
        const vx = -w * 0.28 + v * w * 0.27;
        const swing = 5 * Math.sin(t * 0.0005 + seed + v * 1.4);
        ctx.strokeStyle = "rgba(10,45,20,0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(vx, 0);
        ctx.quadraticCurveTo(vx + swing, h * 0.14, vx + swing * 0.5, h * 0.3);
        ctx.stroke();
      }
      ctx.restore();
    };

    [
      { x: 0,      y: H * 0.69, h: H * 0.47, w: W * 0.13, s: 1 },
      { x: W*0.07, y: H * 0.64, h: H * 0.39, w: W * 0.1,  s: 2 },
      { x: W*0.15, y: H * 0.67, h: H * 0.43, w: W * 0.11, s: 3 },
      { x: W*0.82, y: H * 0.66, h: H * 0.45, w: W * 0.12, s: 4 },
      { x: W*0.89, y: H * 0.63, h: H * 0.37, w: W * 0.1,  s: 5 },
      { x: W*0.97, y: H * 0.68, h: H * 0.42, w: W * 0.11, s: 6 },
    ].forEach(tr => drawTree(tr.x, tr.y, tr.h, tr.w, tr.s));

    // ── Mist band ──
    const mist = ctx.createLinearGradient(0, H * 0.46, 0, H * 0.58);
    mist.addColorStop(0, "rgba(0,180,216,0)");
    mist.addColorStop(0.5, "rgba(0,180,216,0.05)");
    mist.addColorStop(1, "rgba(0,180,216,0)");
    ctx.fillStyle = mist; ctx.fillRect(0, H * 0.46, W, H * 0.12);

    // ── River (navy → cyan gradient) ──
    const riverGrad = ctx.createLinearGradient(0, H * 0.56, 0, H);
    riverGrad.addColorStop(0, "#0a2a3d");
    riverGrad.addColorStop(0.3, "#0b2e42");
    riverGrad.addColorStop(0.7, "#091f2e");
    riverGrad.addColorStop(1, "#060f1a");
    ctx.fillStyle = riverGrad;
    ctx.beginPath();
    ctx.moveTo(W * 0.17, H * 0.64);
    ctx.bezierCurveTo(W * 0.27, H * 0.60, W * 0.73, H * 0.60, W * 0.83, H * 0.64);
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fill();

    // ── Cyan water shimmer lines ──
    for (let r = 0; r < 16; r++) {
      const rx = W * (0.20 + (r * 0.044) % 0.62);
      const ry = H * (0.68 + (r * 0.029) % 0.26);
      const rlen = W * (0.018 + 0.028 * Math.sin(t * 0.0014 + r));
      const a = 0.07 + 0.1 * Math.abs(Math.sin(t * 0.0013 + r * 0.8));
      ctx.strokeStyle = `rgba(0,180,216,${a})`;
      ctx.lineWidth = 1 + 0.4 * Math.sin(t * 0.002 + r);
      ctx.beginPath(); ctx.moveTo(rx - rlen, ry); ctx.lineTo(rx + rlen, ry); ctx.stroke();
    }

    // ── Red sun river reflection ──
    const refGrad = ctx.createLinearGradient(0, H * 0.64, 0, H * 0.92);
    refGrad.addColorStop(0, "rgba(230,51,41,0.14)");
    refGrad.addColorStop(1, "rgba(230,51,41,0)");
    ctx.fillStyle = refGrad;
    ctx.beginPath();
    ctx.ellipse(W * 0.78, H * 0.78, W * 0.022 * (1 + 0.05 * Math.sin(t * 0.001)), H * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // ── Elephants ──
    const drawElephant = (ex: number, ey: number, scale: number, phase: number) => {
      ctx.save(); ctx.translate(ex, ey); ctx.scale(scale, scale);
      const bob = 1.8 * Math.sin(t * 0.0009 + phase);
      // body — navy blue matching logo
      ctx.fillStyle = "#1B3A6B";
      ctx.beginPath(); ctx.ellipse(0, bob, 40, 25, 0, 0, Math.PI * 2); ctx.fill();
      // head
      ctx.beginPath(); ctx.ellipse(-30, -11 + bob, 21, 18, -0.2, 0, Math.PI * 2); ctx.fill();
      // ear
      ctx.fillStyle = "#152d55";
      ctx.beginPath(); ctx.ellipse(-41, -10 + bob, 12, 10, 0.4, 0, Math.PI * 2); ctx.fill();
      // trunk (swaying)
      const trunkSwing = 7 * Math.sin(t * 0.0016 + phase + 1);
      ctx.strokeStyle = "#1B3A6B"; ctx.lineWidth = 9; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-43, -4 + bob);
      ctx.quadraticCurveTo(-60, -20 + bob + trunkSwing, -54, -33 + bob + trunkSwing * 1.5);
      ctx.stroke();
      // tusk (white/ivory)
      ctx.strokeStyle = "rgba(220,205,170,0.75)"; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-40, -7 + bob);
      ctx.quadraticCurveTo(-53, -11 + bob, -55, -5 + bob);
      ctx.stroke();
      // legs
      ctx.fillStyle = "#1B3A6B";
      [-18, -4, 10, 24].forEach(lx => {
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(lx - 5, 16 + bob, 10, 14, 3);
        else ctx.rect(lx - 5, 16 + bob, 10, 14);
        ctx.fill();
      });
      // eye (cyan highlight)
      ctx.fillStyle = "rgba(0,180,216,0.8)";
      ctx.beginPath(); ctx.arc(-35, -14 + bob, 2.5, 0, Math.PI * 2); ctx.fill();
      // water ripples (cyan)
      [46, 64].forEach((rad, ri) => {
        ctx.strokeStyle = `rgba(0,180,216,${0.13 - ri * 0.04 + 0.05 * Math.sin(t * 0.001 + phase + ri)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.ellipse(0, 30 + bob, rad, rad * 0.22, 0, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.restore();
    };

    [
      { xf: 0.19, yf: 0.635, sc: 0.92, ph: 0 },
      { xf: 0.43, yf: 0.650, sc: 1.08, ph: 1.9 },
      { xf: 0.66, yf: 0.642, sc: 0.88, ph: 3.2 },
    ].forEach(el => drawElephant(W * el.xf, H * el.yf, el.sc, el.ph));

    // ── Kayakers (orange hull matching logo boat) ──
    const drawKayak = (kx: number, ky: number, phase: number) => {
      ctx.save(); ctx.translate(kx, ky);
      const bob = 2.2 * Math.sin(t * 0.002 + phase);
      const tilt = 0.045 * Math.sin(t * 0.0013 + phase);
      ctx.rotate(tilt);

      // hull gradient (logo orange-blue boat)
      const hg = ctx.createLinearGradient(-32, 0, 32, 0);
      hg.addColorStop(0, "#1B3A6B");
      hg.addColorStop(0.4, "#1B3A6B");
      hg.addColorStop(0.6, "#215080");
      hg.addColorStop(1, "#1B3A6B");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.ellipse(0, bob, 30, 7, 0, 0, Math.PI * 2); ctx.fill();

      // cockpit
      ctx.fillStyle = "#0d1f3a";
      ctx.beginPath(); ctx.ellipse(0, bob - 1.5, 11, 4.5, 0, 0, Math.PI * 2); ctx.fill();

      // paddler silhouette (navy, matching logo)
      ctx.fillStyle = "#1B3A6B";
      // torso
      ctx.beginPath(); ctx.ellipse(0, bob - 13, 5, 9, 0, 0, Math.PI * 2); ctx.fill();
      // head
      ctx.beginPath(); ctx.arc(0, bob - 24, 5, 0, Math.PI * 2); ctx.fill();

      // paddle
      const pAngle = 0.55 * Math.sin(t * 0.0022 + phase);
      ctx.save(); ctx.translate(0, bob - 13); ctx.rotate(pAngle);
      ctx.strokeStyle = "#0d2240"; ctx.lineWidth = 2.2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-26, -3); ctx.lineTo(26, -3); ctx.stroke();
      // blades (cyan water colour from logo)
      ctx.fillStyle = "#00B4D8";
      ctx.beginPath(); ctx.ellipse(-26, -4, 4.5, 9.5, 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(26, -4, 4.5, 9.5, -0.4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // wake lines (cyan)
      ctx.strokeStyle = "rgba(0,180,216,0.18)"; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, bob + 4);
      ctx.quadraticCurveTo(52, bob + 2, 70, bob + 6);
      ctx.stroke();
      ctx.restore();
    };

    [
      { xf: 0.31, ph: 0 },
      { xf: 0.52, ph: 1.3 },
      { xf: 0.72, ph: 2.7 },
    ].forEach(k => {
      const kx = W * k.xf + 18 * Math.sin(t * 0.00013 + k.ph);
      drawKayak(kx, H * 0.702, k.ph);
    });

    // ── Birds ──
    for (let b = 0; b < 7; b++) {
      const bx = ((W * (0.05 + b * 0.14) + t * (0.018 + b * 0.003)) % (W + 80)) - 40;
      const by = H * (0.1 + (b * 0.037) % 0.1);
      const flap = Math.sin(t * 0.004 + b * 1.1);
      ctx.strokeStyle = "rgba(0,180,216,0.45)"; ctx.lineWidth = 1.3; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(bx - 8, by);
      ctx.quadraticCurveTo(bx - 3, by + flap * 4.5, bx, by);
      ctx.quadraticCurveTo(bx + 3, by + flap * 4.5, bx + 8, by);
      ctx.stroke();
    }

    // ── Fireflies (cyan) ──
    for (let f = 0; f < 30; f++) {
      const seed1 = f * 137.5, seed2 = f * 89.7;
      const fx = (seed1 % 1) * W * 0.6 + W * 0.2 + 20 * Math.sin(t * 0.0004 * (1 + f % 3) + seed2);
      const fy = H * (0.48 + (seed2 % 1) * 0.22) + 12 * Math.cos(t * 0.0003 + seed1);
      const a = 0.25 + 0.65 * Math.abs(Math.sin(t * 0.0018 * (1 + (f % 4) * 0.3) + f));
      ctx.beginPath(); ctx.arc(fx, fy, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,216,${a})`; ctx.fill();
      const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 11);
      fg.addColorStop(0, `rgba(72,202,228,${a * 0.35})`);
      fg.addColorStop(1, "rgba(0,180,216,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, 11, 0, Math.PI * 2); ctx.fill();
    }

    // ── Foreground bushes ──
    ctx.fillStyle = "#040c08";
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.lineTo(0, H * 0.8);
    ctx.bezierCurveTo(W * 0.06, H * 0.74, W * 0.11, H * 0.77, W * 0.16, H * 0.82);
    ctx.lineTo(W * 0.19, H); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.lineTo(W, H * 0.81);
    ctx.bezierCurveTo(W * 0.95, H * 0.74, W * 0.87, H * 0.78, W * 0.83, H * 0.83);
    ctx.lineTo(W * 0.81, H); ctx.closePath(); ctx.fill();

    // ── Vignette ──
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.18, W / 2, H / 2, H * 0.88);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.62)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

    tRef.current += 16;
    rafRef.current = requestAnimationFrame(() => drawScene(canvas));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    resize();
    drawScene(canvas);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawScene]);

  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Water ripple on click
  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    const id = ++rippleIdRef.current;
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1800);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onScrollDown?.();
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgeFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-14px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(230,51,41,0.7); }
          50%      { opacity:0.5; box-shadow:0 0 0 6px rgba(230,51,41,0); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes waterRipple {
          0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(6); opacity: 0; }
        }
        @keyframes scrollLine {
          0%   { top:-100%; opacity:0; }
          20%  { opacity:1; }
          80%  { opacity:1; }
          100% { top:100%; opacity:0; }
        }
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.88) translateY(20px); }
          to   { opacity:1; transform:scale(1)    translateY(0); }
        }
        @keyframes sunPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.75; }
        }

        .kk-btn-primary {
          background: linear-gradient(135deg, #E63329 0%, #c42820 100%);
          color: #fff;
          border: none;
          padding: 18px 44px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 8px 32px rgba(230,51,41,0.45);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s;
          position: relative;
          overflow: hidden;
        }
        .kk-btn-primary:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 18px 48px rgba(230,51,41,0.6);
        }
        .kk-btn-primary:active { transform: translateY(-1px) scale(0.99); }

        .kk-btn-secondary {
          background: rgba(0,180,216,0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #fff;
          border: 1px solid rgba(0,180,216,0.35);
          padding: 18px 36px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.25s, border-color 0.25s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .kk-btn-secondary:hover {
          background: rgba(0,180,216,0.2);
          border-color: rgba(0,180,216,0.6);
          transform: translateY(-3px);
        }
        .kk-btn-secondary:active { transform: translateY(0) scale(0.99); }

        .kk-scroll-btn:hover .kk-scroll-label { color: #00B4D8; }
      `}</style>

      <section
        ref={sectionRef}
        onClick={handleSectionClick}
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "680px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "crosshair",
          background: "#060e1f",
        }}
      >
        {/* ── Animated Canvas Scene ── */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* ── Click ripples ── */}
        {ripples.map(r => (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "1.5px solid rgba(0,180,216,0.7)",
              animation: "waterRipple 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        ))}

        {/* ── Badge ── */}
        <div
          style={{
            position: "absolute",
            top: "110px",
            left: "50%",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            background: "rgba(0,180,216,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,180,216,0.28)",
            padding: "9px 24px",
            borderRadius: "50px",
            whiteSpace: "nowrap",
            animation: "badgeFade 0.7s ease-out 0.2s both",
            zIndex: 10,
          }}
        >
          {/* Red sun dot matching logo */}
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#E63329",
              animation: "pulseGlow 2.2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.92)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            First in South Asia · Sri Lanka
          </span>
        </div>

        {/* ── Main Content ── */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "940px",
            marginTop: "28px",
            zIndex: 10,
          }}
        >
          {/* Eyebrow line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "22px",
              animation: "heroFadeUp 0.9s ease-out 0.15s both",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "48px",
                background: "rgba(0,180,216,0.55)",
                transformOrigin: "right",
                animation: "lineExpand 0.8s ease-out 0.7s both",
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "11px",
                color: "#00B4D8",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Kayak · Encounter · Connect
            </span>
            <div
              style={{
                height: "1px",
                width: "48px",
                background: "rgba(0,180,216,0.55)",
                transformOrigin: "left",
                animation: "lineExpand 0.8s ease-out 0.7s both",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 7.5vw, 88px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: "26px",
              letterSpacing: "-1px",
              animation: "heroFadeUp 1s ease-out 0.3s both",
            }}
          >
            Paddle Beside{" "}
            <span
              style={{
                color: "#00B4D8",
                fontStyle: "italic",
                position: "relative",
                display: "inline-block",
              }}
            >
              Wild Elephants
              {/* Underline in brand cyan */}
              <svg
                viewBox="0 0 340 14"
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: 0,
                  width: "100%",
                  height: "14px",
                  overflow: "visible",
                }}
              >
                <path
                  d="M4,10 C60,2 140,12 200,6 C260,0 310,8 336,5"
                  stroke="#00B4D8"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="380"
                  strokeDashoffset="380"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="380"
                    to="0"
                    dur="1.2s"
                    begin="1.2s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </span>
            <br />
            <span
              style={{
                fontSize: "0.52em",
                fontWeight: 600,
                fontStyle: "normal",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "3px",
                textTransform: "uppercase",
                display: "block",
                marginTop: "14px",
              }}
            >
              Kayaking Kalawewa
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(14px, 1.8vw, 18px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              margin: "0 auto 40px",
              maxWidth: "560px",
              animation: "heroFadeUp 1s ease-out 0.5s both",
            }}
          >
            Glide silently through ancient waters as wild elephants bathe just
            metres away. An intimate wildlife encounter{" "}
            <em style={{ color: "#48CAE4", fontStyle: "italic" }}>
              unlike anywhere else on Earth.
            </em>
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "heroFadeUp 1s ease-out 0.65s both",
            }}
          >
            <button
              className="kk-btn-primary"
              onClick={() => { onBookClick?.(); scrollTo("#booking"); }}
            >
              Book Your Adventure
            </button>

            <button
              className="kk-btn-secondary"
              onClick={() => { setVideoOpen(true); onVideoClick?.(); }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 0 4px rgba(0,180,216,0.2)",
                }}
              >
                <Play size={12} fill="#1B3A6B" color="#1B3A6B" style={{ marginLeft: "2px" }} />
              </div>
              Watch the Experience
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "64px",
              flexWrap: "wrap",
              animation: "heroFadeUp 1s ease-out 0.85s both",
            }}
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.label}
                stat={stat}
                started={statsStarted}
                isLast={i === STATS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <button
          className="kk-scroll-btn"
          onClick={() => scrollTo("#about")}
          style={{
            position: "absolute",
            bottom: "88px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "heroFadeUp 1s ease-out 1.3s both",
            zIndex: 10,
          }}
        >
          
          <div
            style={{
              width: "1px",
              height: "44px",
              background: "rgba(255,255,255,0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100%",
                left: 0,
                right: 0,
                height: "100%",
                background: "linear-gradient(to bottom, transparent, #00B4D8, transparent)",
                animation: "scrollLine 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <ChevronDown size={16} color="rgba(0,180,216,0.75)" />
        </button>

        {/* ── Animated Wave Divider ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 5 }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            {/* Back wave - cyan brand color */}
            <path fill="rgba(0,180,216,0.12)" d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                  M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z;
                  M0,60 C200,85 400,30 600,60 C800,85 1000,30 1200,60 C1300,72 1370,55 1440,60 L1440,80 L0,80 Z;
                  M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z
                "
              />
            </path>
            {/* Front wave - page background */}
            <path fill="#FAF5EA" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                values="
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z;
                  M0,55 C360,15 1080,65 1440,55 L1440,80 L0,80 Z;
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z
                "
              />
            </path>
          </svg>
        </div>

        {/* ── Video Modal ── */}
        {videoOpen && (
          <div
            onClick={() => setVideoOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(6,14,31,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: "#060e1f",
                borderRadius: "20px",
                overflow: "hidden",
                width: "90%",
                maxWidth: "900px",
                aspectRatio: "16/9",
                border: "1px solid rgba(0,180,216,0.18)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(230,51,41,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
                animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              {/* Logo-inspired icon: red circle + play */}
              <div
                style={{
                  width: "76px",
                  height: "76px",
                  borderRadius: "50%",
                  border: "2.5px solid #E63329",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                  animation: "sunPulse 2s ease-in-out infinite",
                }}
              >
                <Play size={28} color="#00B4D8" style={{ marginLeft: "4px" }} />
              </div>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                }}
              >
                Video coming soon — connect your media source
              </p>
              <button
                onClick={() => setVideoOpen(false)}
                style={{
                  marginTop: "8px",
                  background: "rgba(0,180,216,0.1)",
                  border: "1px solid rgba(0,180,216,0.28)",
                  color: "rgba(255,255,255,0.8)",
                  padding: "10px 32px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,180,216,0.22)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,180,216,0.1)")}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}