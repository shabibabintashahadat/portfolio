import { ArrowDown, Code2, Cpu, Brain } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-20 overflow-hidden"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-glow" />

      {/* Cybergrid background layer */}
      <div className="absolute inset-0 cyber-grid -z-10 animate-grid-move opacity-30" />

      <div className="max-w-4xl text-center space-y-6 z-10">
        {/* Decorative Tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          <Cpu className="h-3.5 w-3.5" />
          <span>System Status: Online</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white select-none">
          {portfolioData.personal.name.split(' ').map((word, i) => (
            <span key={i} className={i === 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 font-extrabold'}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Objective */}
        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed font-sans pt-2">
          {portfolioData.personal.objective}
        </p>

        {/* Info Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6">
          <div className="glass-panel p-4 rounded-xl border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
            <Code2 className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold font-mono text-sm">Full-Stack Stack</h3>
            <p className="text-xs text-slate-400 mt-1">MERN Stack, WebRTC, Socket.io</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border-slate-800 hover:border-violet-500/50 transition-all duration-300">
            <Brain className="h-6 w-6 text-violet-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold font-mono text-sm">AI / Deep Learning</h3>
            <p className="text-xs text-slate-400 mt-1">EfficientNet, ViT, Graph Neural Nets</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border-slate-800 hover:border-emerald-500/50 transition-all duration-300">
            <Cpu className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold font-mono text-sm">Graphics / Games</h3>
            <p className="text-xs text-slate-400 mt-1">Python, PyOpenGL, 3D Renderers</p>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
          <button
            onClick={() => scrollTo('projects')}
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold font-mono transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            Explore Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto px-8 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white font-bold font-mono transition-all duration-300 hover:border-cyan-500/50 cursor-pointer"
          >
            Contact System
          </button>
        </div>
      </div>

      {/* Floating Arrow down */}
      <div
        onClick={() => scrollTo('projects')}
        className="absolute bottom-10 cursor-pointer animate-bounce text-slate-500 hover:text-cyan-400 transition-colors"
      >
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
};
