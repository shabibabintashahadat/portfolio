import type { ReactNode } from 'react';
import { Terminal, Database, Brain, Settings } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Skills = () => {
  // Mapping categories to suitable lucide icons and colors
  const categoryConfig: Record<
    string,
    { icon: ReactNode; colorClass: string; glowClass: string }
  > = {
    'Programming Languages': {
      icon: <Terminal className="h-5 w-5 text-cyan-400" />,
      colorClass: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400',
      glowClass: 'border-neon-glow-cyan',
    },
    'Full-Stack & Web': {
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      colorClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400',
      glowClass: 'border-neon-glow-emerald',
    },
    'ML & AI': {
      icon: <Brain className="h-5 w-5 text-violet-400" />,
      colorClass: 'text-violet-400 border-violet-500/20 bg-violet-950/10 hover:border-violet-400',
      glowClass: 'border-neon-glow-purple',
    },
    'DevOps & Tools': {
      icon: <Settings className="h-5 w-5 text-pink-400" />,
      colorClass: 'text-pink-400 border-pink-500/20 bg-pink-950/10 hover:border-pink-400',
      glowClass: 'border-neon-glow-purple',
    },
  };

  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Capabilities</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="text-slate-400 font-mono text-sm">Hardware, software systems, and algorithmic expertise</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(portfolioData.skills).map(([category, items]) => {
          const config = categoryConfig[category] || {
            icon: <Terminal className="h-5 w-5 text-slate-400" />,
            colorClass: 'text-slate-400 border-slate-700 bg-slate-900/10',
            glowClass: '',
          };

          return (
            <div
              key={category}
              className="glass-panel p-6 rounded-xl border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/50">
                  {config.icon}
                  <h3 className="text-lg font-bold text-white font-mono">{category}</h3>
                </div>

                {/* Pill Badges Grid */}
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className={`px-4 py-2 text-xs font-mono font-semibold rounded-full border transition-all duration-300 hover:scale-105 cursor-default ${config.colorClass} ${config.glowClass} flex items-center justify-center`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
