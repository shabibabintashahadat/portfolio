import { useEffect, useRef, useState } from 'react';
import { Sparkles, Activity, Network } from 'lucide-react';

type CanvasMode = 'synapse' | 'matrix' | 'quantum';

export const InteractiveCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<CanvasMode>('synapse');
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 160 };

    // Synapse Particle Mode
    class SynapseParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseColor: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 2.2 + 1;
        const palette = [
          'rgba(56, 189, 248, 0.6)',  // cyan
          'rgba(168, 85, 247, 0.5)', // violet
          'rgba(52, 211, 153, 0.5)', // emerald
        ];
        this.baseColor = palette[Math.floor(Math.random() * palette.length)];
        this.color = this.baseColor;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 4;
        context.fill();
        context.shadowBlur = 0;
      }
    }

    // Matrix Rain Mode
    const matrixChars = '01AI/ML0101SHABIBA01GCNViT0101';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const particles: SynapseParticle[] = [];
    const particleCount = 75;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new SynapseParticle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let frameCount = 0;

    const render = () => {
      frameCount++;

      if (mode === 'matrix') {
        ctx.fillStyle = 'rgba(3, 7, 18, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        // Clear frame with deep gradient
        ctx.clearRect(0, 0, width, height);

        // Draw delicate coordinate grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.025)';
        ctx.lineWidth = 1;
        const gridSpacing = 60;
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw Synapses / Quantum
        const maxDist = mode === 'quantum' ? 150 : 120;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.update();
          p.draw(ctx);

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = mode === 'quantum' 
                ? `rgba(168, 85, 247, ${alpha * 1.4})` 
                : `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = mode === 'quantum' ? 0.8 : 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-20 pointer-events-none" />

      {/* Floating Canvas Mode Switcher Widget in bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        {showControls ? (
          <div className="glass-panel p-2.5 rounded-2xl border-cyan-500/30 flex items-center space-x-2 shadow-2xl backdrop-blur-xl animate-fade-in">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 uppercase tracking-wider">
              Canvas Mode:
            </span>
            <button
              onClick={() => setMode('synapse')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                mode === 'synapse'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Network className="h-3 w-3 inline mr-1" />
              Synapse
            </button>
            <button
              onClick={() => setMode('quantum')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                mode === 'quantum'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Activity className="h-3 w-3 inline mr-1" />
              Quantum
            </button>
            <button
              onClick={() => setMode('matrix')}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                mode === 'matrix'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="h-3 w-3 inline mr-1" />
              Matrix
            </button>
            <button
              onClick={() => setShowControls(false)}
              className="text-slate-500 hover:text-slate-300 px-1 text-xs ml-1"
              title="Minimize"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowControls(true)}
            className="glass-panel px-3 py-1.5 rounded-full border-cyan-500/30 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 shadow-lg flex items-center space-x-1.5 transition-all hover:scale-105"
            title="Switch Background Canvas Animation Mode"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>FX: {mode.toUpperCase()}</span>
          </button>
        )}
      </div>
    </>
  );
};
