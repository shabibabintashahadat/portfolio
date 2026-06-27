import { Flame } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Projects = () => {
  const agriNetwork = portfolioData.projects.find((p) => p.id === 'agrinetwork');
  const otherProjects = portfolioData.projects.filter((p) => p.id !== 'agrinetwork');

  return (
    <section id="projects" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Projects</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="text-slate-400 font-mono text-sm">Interactive systems & graphical simulations</p>
      </div>

      {/* Featured Project: AgriNetwork */}
      {agriNetwork && (
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-4 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20">
            <Flame className="h-4 w-4" />
            <span>Featured Project</span>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Neon side strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent" />

            <div className="space-y-6 pl-4">
              <div>
                <span className="text-cyan-400 font-mono text-sm font-semibold tracking-wider uppercase">{agriNetwork.type}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">{agriNetwork.name}</h3>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-3xl">
                {agriNetwork.description}
              </p>

              {/* Feature bullets */}
              <ul className="space-y-2.5 font-sans text-slate-400 text-sm max-w-3xl">
                {agriNetwork.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-0.5">⚡</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {agriNetwork.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-400/40 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover p-6 rounded-xl border-slate-800 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-violet-950/40 text-violet-400 border border-violet-800/40">
                  {project.type}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-mono">{project.name}</h3>
                <p className="text-slate-400 text-xs font-mono">{project.technologies.join(' · ')}</p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>

              <ul className="space-y-1.5 text-xs text-slate-400 pl-1 list-inside list-disc">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
