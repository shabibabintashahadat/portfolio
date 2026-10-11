import { useState } from 'react';
import { ExternalLink, Github, Code2, CheckCircle2, ChevronRight, X } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import { FishingGame3DWidget } from './FishingGame3DWidget';

type CategoryFilter = 'All' | 'AI & Deep Learning' | 'Full-Stack Web' | 'Computer Graphics';

interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  type: string;
  technologies: string[];
  github: string;
  live: string;
  badge: string;
  description: string;
  bullets: string[];
  featured: boolean;
  stats: { label: string; value: string }[];
}

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const categories: CategoryFilter[] = ['All', 'AI & Deep Learning', 'Full-Stack Web', 'Computer Graphics'];

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  }) as ProjectItem[];

  return (
    <section id="projects" className="py-24 px-4 relative max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-5 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
          <Code2 className="h-3.5 w-3.5" />
          <span>Production & Research Implementations</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">Projects</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="max-w-2xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          From real-time WebRTC live video bidding marketplaces to hybrid Graph Neural Networks and Explainable AI pipelines.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105'
                    : 'glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40">
                  {cat === 'All'
                    ? portfolioData.projects.length
                    : portfolioData.projects.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card-interactive p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-900 border border-slate-800 text-cyan-300">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-violet-950/60 border border-violet-800/40 text-violet-300 font-semibold">
                  {project.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Key Bullet Highlights */}
              <ul className="space-y-1.5 text-xs text-slate-300">
                {project.bullets.slice(0, 2).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 text-xs mt-0.5 flex-shrink-0">⚡</span>
                    <span className="line-clamp-2">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 py-1">
                {project.stats.map((stat, i) => (
                  <div key={i} className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
                    <span className="text-[9px] font-mono text-slate-500 block truncate">{stat.label}</span>
                    <span className="text-[10px] font-mono font-bold text-cyan-300 truncate block">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-cyan-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-500">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setActiveProjectModal(project)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Deep Dive</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
                  title="View GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </a>
                {project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-400 transition-colors border border-cyan-800/40"
                    title="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Deep Dive Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel-elevated rounded-3xl border-cyan-500/40 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {activeProjectModal.category} · {activeProjectModal.type}
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">{activeProjectModal.name}</h3>
                <p className="text-xs font-mono text-slate-400">{activeProjectModal.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-950/95 text-slate-200">
              
              {/* If it's the 3D Fishing Game, embed the live interactive 3D OpenGL Widget! */}
              {activeProjectModal.id === 'game3d' && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Interactive Graphics Renderer Demonstration:
                  </span>
                  <FishingGame3DWidget />
                </div>
              )}

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Project Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProjectModal.description}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Key Technical Achievements
                </h4>
                <div className="space-y-2">
                  {activeProjectModal.bullets.map((bullet, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-200 leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {activeProjectModal.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{s.label}</span>
                    <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Full Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <a
                  href={activeProjectModal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-mono text-xs font-bold flex items-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect on GitHub</span>
                </a>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono hover:text-white"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
