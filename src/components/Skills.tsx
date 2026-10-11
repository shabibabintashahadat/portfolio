import { useState, type ReactNode } from 'react';
import { Terminal, Database, Brain, Wrench, Globe, Cpu, CheckCircle } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categoryConfig: Record<
    string,
    { icon: ReactNode; colorClass: string; borderGlow: string; badgeBg: string }
  > = {
    'Programming Languages': {
      icon: <Terminal className="h-5 w-5 text-cyan-400" />,
      colorClass: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]',
      badgeBg: 'bg-cyan-950/30 text-cyan-300 border-cyan-800/40 hover:border-cyan-400',
    },
    'Web Technologies': {
      icon: <Globe className="h-5 w-5 text-emerald-400" />,
      colorClass: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
      badgeBg: 'bg-emerald-950/30 text-emerald-300 border-emerald-800/40 hover:border-emerald-400',
    },
    'Artificial Intelligence': {
      icon: <Brain className="h-5 w-5 text-violet-400" />,
      colorClass: 'text-violet-400',
      borderGlow: 'hover:border-violet-400/60 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]',
      badgeBg: 'bg-violet-950/30 text-violet-300 border-violet-800/40 hover:border-violet-400',
    },
    'Database': {
      icon: <Database className="h-5 w-5 text-amber-400" />,
      colorClass: 'text-amber-400',
      borderGlow: 'hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
      badgeBg: 'bg-amber-950/30 text-amber-300 border-amber-800/40 hover:border-amber-400',
    },
    'Tools': {
      icon: <Wrench className="h-5 w-5 text-pink-400" />,
      colorClass: 'text-pink-400',
      borderGlow: 'hover:border-pink-400/60 hover:shadow-[0_0_15px_rgba(244,114,182,0.2)]',
      badgeBg: 'bg-pink-950/30 text-pink-300 border-pink-800/40 hover:border-pink-400',
    },
  };

  // Find which projects use the selected skill
  const relatedProjects = selectedSkill
    ? portfolioData.projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase().includes(selectedSkill.toLowerCase()) || selectedSkill.toLowerCase().includes(t.toLowerCase()))
      )
    : [];

  return (
    <section id="skills" className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Background ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-400 font-mono text-xs uppercase tracking-widest">
          <Cpu className="h-3.5 w-3.5" />
          <span>Core Competencies & Stack</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">Capabilities</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="max-w-2xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          Full breakdown of languages, deep learning frameworks, databases, and developer tooling. Click any skill chip to see its real-world implementation:
        </p>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(portfolioData.skills).map(([category, items]) => {
          const config = categoryConfig[category] || {
            icon: <Terminal className="h-5 w-5 text-slate-400" />,
            colorClass: 'text-slate-400',
            borderGlow: '',
            badgeBg: 'bg-slate-900 text-slate-300 border-slate-800',
          };

          return (
            <div
              key={category}
              className={`glass-panel p-6 rounded-2xl border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${config.borderGlow}`}
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div className="flex items-center space-x-2.5">
                    {config.icon}
                    <h3 className="text-base font-bold text-white font-mono">{category}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {items.length} items
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                            : `${config.badgeBg} hover:scale-105`
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Skill-to-Project Connection Inspector */}
      {selectedSkill && (
        <div className="mt-8 p-6 rounded-2xl glass-panel-elevated border-cyan-500/40 animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Cross-Reference:
              </span>
              <span className="text-sm font-bold font-mono text-white px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                {selectedSkill}
              </span>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Clear selection ✕
            </button>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {relatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{proj.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                    <span className="text-[10px] font-mono text-cyan-400 mt-2 block">
                      Stack: {proj.technologies.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-400 pt-1">
              Used across academic coursework, research prototyping, and core engineering modules at BRAC University.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
