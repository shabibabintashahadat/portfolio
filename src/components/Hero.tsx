import { useState, useEffect } from 'react';
import { ArrowDown, Code2, Cpu, Brain, Terminal, FileText, Sparkles, MapPin, Clock, ShieldAlert } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Hero = ({ onOpenTerminal, onOpenResume }: HeroProps) => {
  const [dhakaTime, setDhakaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Dhaka (Asia/Dhaka GMT+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-24 pb-16 overflow-hidden"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Cybergrid background layer */}
      <div className="absolute inset-0 cyber-grid -z-10 opacity-40 pointer-events-none" />

      <div className="max-w-5xl text-center space-y-6 z-10">
        
        {/* Top Badges / Telemetry Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BRAC University CSE Graduate &apos;26</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 font-mono text-xs">
            <MapPin className="h-3 w-3 text-cyan-400" />
            <span>Dhaka, Bangladesh</span>
            <span className="text-slate-600">·</span>
            <Clock className="h-3 w-3 text-cyan-400" />
            <span>{dhakaTime || '11:45 PM GMT+6'}</span>
          </div>

          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-violet-500/40 bg-violet-950/30 hover:bg-violet-900/40 text-violet-300 font-mono text-xs cursor-pointer transition-all hover:scale-105"
            title="Open Interactive Shabiba OS Terminal"
          >
            <Terminal className="h-3 w-3 text-violet-400" />
            <span>CLI Terminal [~#]</span>
          </button>
        </div>

        {/* Hero Name Header */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white select-none font-sans leading-none">
            SHABIBA BINTA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 glow-text-cyan">
              SHAHADAT
            </span>
          </h1>
        </div>

        {/* Objective Statement from CV */}
        <p className="max-w-3xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed font-sans pt-2">
          {portfolioData.personal.objective}
        </p>

        {/* 4 Interactive Telemetry Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-6 text-left">
          
          {/* Card 1: Thesis */}
          <div
            onClick={() => scrollTo('research')}
            className="glass-card-interactive p-4 rounded-2xl border-cyan-500/20 hover:border-cyan-400/60 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <Brain className="h-5 w-5 text-cyan-400" />
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">Thesis</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">91.27%</div>
            <div className="text-xs font-semibold text-cyan-300 font-mono">Sign-to-Braille</div>
            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">EfficientNet + ViT + GCN</p>
          </div>

          {/* Card 2: XAI Fraud Pipeline */}
          <div
            onClick={() => scrollTo('xai-lab')}
            className="glass-card-interactive p-4 rounded-2xl border-red-500/20 hover:border-red-400/60 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/40">XAI</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">568K+</div>
            <div className="text-xs font-semibold text-red-300 font-mono">Fraud Transactions</div>
            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">SHAP & LIME Audits</p>
          </div>

          {/* Card 3: Full-Stack WebRTC */}
          <div
            onClick={() => scrollTo('projects')}
            className="glass-card-interactive p-4 rounded-2xl border-violet-500/20 hover:border-violet-400/60 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <Code2 className="h-5 w-5 text-violet-400" />
              <span className="text-[10px] font-mono text-violet-400 bg-violet-950/60 px-1.5 py-0.5 rounded border border-violet-800/40">Full-Stack</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">Live Stream</div>
            <div className="text-xs font-semibold text-violet-300 font-mono">WebRTC Bidding</div>
            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">MERN + Socket.io + KYC</p>
          </div>

          {/* Card 4: Academic Record */}
          <div
            onClick={() => scrollTo('experience')}
            className="glass-card-interactive p-4 rounded-2xl border-emerald-500/20 hover:border-emerald-400/60 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <Cpu className="h-5 w-5 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">BRACU</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">3.31 CGPA</div>
            <div className="text-xs font-semibold text-emerald-300 font-mono">B.Sc in CSE</div>
            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">HSC 5.00 · SSC 5.00</p>
          </div>

        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 pt-6">
          <button
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-violet-600 text-slate-950 font-bold font-mono text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            Explore 5 Projects
          </button>

          <button
            onClick={() => scrollTo('research')}
            className="px-6 py-3 rounded-xl border border-cyan-500/40 bg-slate-900/80 hover:bg-cyan-950/40 text-cyan-300 font-bold font-mono text-xs sm:text-sm transition-all duration-300 hover:border-cyan-400 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            <span>Thesis Braille Lab</span>
          </button>

          <button
            onClick={onOpenResume}
            className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>View / Print CV</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-mono text-xs sm:text-sm transition-all duration-300 cursor-pointer"
          >
            Direct Contact
          </button>
        </div>

      </div>

      {/* Floating Arrow Down indicator */}
      <div
        onClick={() => scrollTo('research')}
        className="mt-12 cursor-pointer animate-bounce text-slate-500 hover:text-cyan-400 transition-colors p-2"
        title="Scroll to Research Thesis"
      >
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
};
