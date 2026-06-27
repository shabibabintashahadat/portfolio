import { Mail, Github, Linkedin, MessageSquare, MapPin } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Background neon glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Contact</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="text-slate-400 font-mono text-sm">Ping the server or email directly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Card */}
        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="glass-panel p-6 rounded-xl border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 text-center flex flex-col items-center space-y-4 group cursor-pointer"
        >
          <div className="p-3.5 bg-slate-900 rounded-full border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
            <Mail className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-bold font-mono text-sm uppercase tracking-wider">Email Direct</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">{portfolioData.personal.email}</p>
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel p-6 rounded-xl border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 text-center flex flex-col items-center space-y-4 group cursor-pointer"
        >
          <div className="p-3.5 bg-slate-900 rounded-full border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
            <Github className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-bold font-mono text-sm uppercase tracking-wider">GitHub Hub</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">github.com/Shabiba</p>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href={portfolioData.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel p-6 rounded-xl border-slate-800 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 text-center flex flex-col items-center space-y-4 group cursor-pointer"
        >
          <div className="p-3.5 bg-slate-900 rounded-full border border-slate-800 group-hover:border-violet-500/50 transition-colors">
            <Linkedin className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-white font-bold font-mono text-sm uppercase tracking-wider">LinkedIn Feed</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">Connect professionally</p>
          </div>
        </a>
      </div>

      {/* Footer Details */}
      <div className="mt-20 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-500 font-mono text-xs gap-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>Dhaka, Bangladesh</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>SHABIBA BINTA SHAHADAT © 2026</span>
        </div>
      </div>
    </section>
  );
};
