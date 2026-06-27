import { BookOpen, Award, CheckCircle } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Timeline</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="text-slate-400 font-mono text-sm">Academic foundations and research milestones</p>
      </div>

      {/* Vertical Timeline Wrapper */}
      <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
        
        {/* Step 1: Education (BRAC University) */}
        <div className="relative pl-8 md:pl-12 group">
          {/* Node Icon Indicator */}
          <div className="absolute -left-4 top-1.5 bg-slate-950 border border-slate-700 w-8 h-8 rounded-full flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all duration-300">
            <BookOpen className="h-4 w-4 text-cyan-400" />
          </div>

          {/* Floating Timeframe Label (Desktop) */}
          <div className="hidden md:block absolute -left-36 top-2.5 text-right w-28 text-xs font-mono text-slate-500">
            2022 – 2026
          </div>

          <div className="glass-panel p-6 rounded-xl border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Education</span>
                <h3 className="text-xl font-bold text-white font-mono mt-0.5">{portfolioData.education.institution}</h3>
              </div>
              <span className="mt-1 sm:mt-0 px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
                {portfolioData.education.graduation}
              </span>
            </div>

            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-semibold text-slate-200">{portfolioData.education.degree}</p>
              <p className="text-slate-400 font-mono text-xs">CGPA: {portfolioData.education.cgpa}</p>
            </div>

            {/* Coursework Tags */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.education.coursework.map((course) => (
                  <span key={course} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Step 3: Certifications */}
        <div className="relative pl-8 md:pl-12 group">
          <div className="absolute -left-4 top-1.5 bg-slate-950 border border-slate-700 w-8 h-8 rounded-full flex items-center justify-center group-hover:border-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-300">
            <Award className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="hidden md:block absolute -left-36 top-2.5 text-right w-28 text-xs font-mono text-slate-500">
            2026
          </div>

          <div className="glass-panel p-6 rounded-xl border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 space-y-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Certifications</span>
              <h3 className="text-xl font-bold text-white font-mono mt-0.5">Professional Training</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.certifications.map((cert, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 leading-tight">{cert.name}</h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
