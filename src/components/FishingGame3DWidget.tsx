import { useEffect, useRef, useState } from 'react';
import { Gamepad2, Box } from 'lucide-react';

export const FishingGame3DWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<string>('Click canvas to cast hook & trigger 3D AABB Collision');
  const [wireframeMode, setWireframeMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 300);

    // 3D camera angles
    let angleY = 0.35;
    let angleX = 0.45;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // 3D Projection math
    const project = (x: number, y: number, z: number) => {
      // Rotate around Y
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      // Perspective projection
      const fov = 340;
      const distance = 420;
      const scale = fov / (distance + z2);
      const projX = width / 2 + x1 * scale;
      const projY = height / 2 + y2 * scale;

      return { x: projX, y: projY, z: z2, scale };
    };

    // 3D entities
    interface Fish3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      size: number;
      color: string;
      wobble: number;
    }

    const fishList: Fish3D[] = [
      { x: -120, y: 30, z: -40, vx: 1.2, size: 22, color: '#38bdf8', wobble: 0 },
      { x: 60, y: 70, z: 50, vx: -1.0, size: 28, color: '#a855f7', wobble: 1.5 },
      { x: -50, y: 110, z: 20, vx: 0.8, size: 24, color: '#34d399', wobble: 3.0 },
    ];

    // Hook state
    const hook = {
      x: 0,
      y: -100, // air
      z: 0,
      targetY: -100,
      isDropping: false,
      hasCaught: false,
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        angleY += dx * 0.008;
        angleX = Math.max(-0.2, Math.min(1.1, angleX + dy * 0.008));
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      if (!hook.isDropping) {
        hook.isDropping = true;
        hook.targetY = 120; // cast deep
        setStatus('Hook submerged! Calculating 3D Bounding-Box collisions...');
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw water plane wireframe grid (y = 0)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      const gridExtent = 160;

      for (let gx = -gridExtent; gx <= gridExtent; gx += gridSize) {
        const p1 = project(gx, 0, -gridExtent);
        const p2 = project(gx, 0, gridExtent);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      for (let gz = -gridExtent; gz <= gridExtent; gz += gridSize) {
        const p1 = project(-gridExtent, 0, gz);
        const p2 = project(gridExtent, 0, gz);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw bounding box tank limits
      if (wireframeMode) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        const c = [
          [-gridExtent, -100, -gridExtent],
          [gridExtent, -100, -gridExtent],
          [gridExtent, 140, -gridExtent],
          [-gridExtent, 140, -gridExtent],
          [-gridExtent, -100, gridExtent],
          [gridExtent, -100, gridExtent],
          [gridExtent, 140, gridExtent],
          [-gridExtent, 140, gridExtent],
        ].map(([px, py, pz]) => project(px, py, pz));

        // Connect tank wireframe edges
        const edges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7]
        ];
        edges.forEach(([i1, i2]) => {
          ctx.beginPath();
          ctx.moveTo(c[i1].x, c[i1].y);
          ctx.lineTo(c[i2].x, c[i2].y);
          ctx.stroke();
        });
      }

      // Update Hook physics
      if (hook.isDropping) {
        hook.y += 3.5;
        if (hook.y >= hook.targetY) {
          hook.isDropping = false;
          hook.y = -100; // reel back
          setStatus('Reeled in! Click again to cast.');
        }
      }

      // Draw Fishing line & hook
      const rodTip = project(0, -120, 0);
      const hookPt = project(hook.x, hook.y, hook.z);

      ctx.beginPath();
      ctx.moveTo(rodTip.x, rodTip.y);
      ctx.lineTo(hookPt.x, hookPt.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Hook AABB Box
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(hookPt.x, hookPt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Render and update 3D Fish
      fishList.forEach((fish) => {
        fish.x += fish.vx;
        fish.wobble += 0.08;

        // Bounce back from boundaries
        if (fish.x > 150) {
          fish.x = 150;
          fish.vx *= -1;
        } else if (fish.x < -150) {
          fish.x = -150;
          fish.vx *= -1;
        }

        const waveY = fish.y + Math.sin(fish.wobble) * 6;
        const fishPt = project(fish.x, waveY, fish.z);

        // Check AABB Collision with hook
        if (hook.isDropping) {
          const dx = Math.abs(fish.x - hook.x);
          const dy = Math.abs(waveY - hook.y);
          const dz = Math.abs(fish.z - hook.z);

          if (dx < 25 && dy < 25 && dz < 25) {
            setScore((s) => s + 1);
            setStatus(`COLLISION DETECTED! Hook captured 3D Target at (${Math.round(fish.x)}, ${Math.round(waveY)}, ${Math.round(fish.z)})!`);
            fish.x = -140; // reset fish
            hook.isDropping = false;
            hook.y = -100;
          }
        }

        // Draw 3D wireframe / fish diamond representation
        const size = fish.size * fishPt.scale;
        ctx.fillStyle = fish.color;
        ctx.strokeStyle = '#ffffff';

        // Fish body
        ctx.beginPath();
        ctx.ellipse(fishPt.x, fishPt.y, size * 1.3, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = fish.color;
        ctx.shadowColor = fish.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Fish wireframe bounding box if active
        if (wireframeMode) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.strokeRect(fishPt.x - size, fishPt.y - size * 0.8, size * 2, size * 1.6);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, [wireframeMode]);

  return (
    <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-4 w-4 text-emerald-400" />
          <h4 className="text-sm font-bold font-mono text-white">
            PyOpenGL 3D Physics & Collision Simulation
          </h4>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              wireframeMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Box className="h-3 w-3" />
            <span>AABB Wireframe: {wireframeMode ? 'ON' : 'OFF'}</span>
          </button>
          <span className="text-cyan-400 font-bold">Catches: {score}</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-slate-950/90 border border-slate-800 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Overlay controls prompt */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 pointer-events-none">
          Drag: Rotate 3D View | Click: Cast Hook
        </div>

        <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-mono text-emerald-400 bg-slate-950/90 py-1 px-2 rounded border border-emerald-900/40 truncate">
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400">
        <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
          <strong>Projection:</strong> Perspective FOV 340°
        </div>
        <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
          <strong>Physics:</strong> 3D AABB Collision
        </div>
        <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
          <strong>Render Engine:</strong> PyOpenGL / Matrix Math
        </div>
      </div>
    </div>
  );
};
