import { BookOpen, Award, GraduationCap, MapPin, Brain, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-5 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-xs uppercase tracking-widest">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Academic Pedigree & Milestones</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Credentials</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          Consistent academic excellence across BRAC University and Rajshahi with top-tier GPA records and specialized data science tracks.
        </p>
      </div>

      {/* Vertical Timeline Wrapper */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-36 space-y-12">
        
        {/* Milestone 1: BRAC University (Undergraduate Degree) */}
        <div className="relative pl-8 md:pl-12 group">
          {/* Node Icon */}
          <div className="absolute -left-[17px] top-1.5 bg-slate-950 border-2 border-cyan-400 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            <GraduationCap className="h-4 w-4 text-cyan-300" />
          </div>

          {/* Desktop Timeline Date Tag */}
          <div className="hidden md:block absolute -left-40 top-2 text-right w-32 text-xs font-mono text-cyan-400 font-bold">
            2022 – 2026
          </div>

          <div className="glass-panel-elevated p-6 md:p-8 rounded-2xl border-cyan-500/30 transition-all duration-300 space-y-4 hover:border-cyan-400/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Undergraduate Degree · Class of 2026
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans mt-0.5">
                  BRAC University
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-400/50 text-cyan-300">
                  CGPA: 3.31 / 4.00
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-cyan-400" /> Dhaka, BD
                </span>
              </div>
            </div>

            <p className="font-semibold text-slate-200 text-sm">
              Bachelor of Science in Computer Science and Engineering (CSE)
            </p>

            {/* Coursework Chips */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Relevant Coursework:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.education[0].coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Thesis highlight badge */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-3 mt-2">
              <Brain className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-cyan-300 font-bold font-mono">Undergraduate Thesis: </span>
                <span className="text-slate-300 italic">Intelligent Sign Language Recognition & Braille Representation</span>
                <span className="text-slate-500 block text-[11px] mt-0.5 font-mono">
                  Supervised by Dr. Md. Ashraful Alam · Achieved 91.27% Accuracy & 0.9125 Macro F1
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone 2: Rajshahi Government City College (HSC) */}
        <div className="relative pl-8 md:pl-12 group">
          <div className="absolute -left-[17px] top-1.5 bg-slate-950 border-2 border-emerald-400 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all">
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="hidden md:block absolute -left-40 top-2 text-right w-32 text-xs font-mono text-emerald-400 font-bold">
            2018 – 2020
          </div>

          <div className="glass-panel p-6 rounded-2xl border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                  Higher Secondary Certificate (HSC)
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white font-sans mt-0.5">
                  Rajshahi Government City College
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 border border-emerald-400/50 text-emerald-300">
                  GPA: 5.00 / 5.00 (Golden)
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-400" /> Rajshahi, BD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              Science Discipline · Physics, Chemistry, Higher Mathematics, Biology, ICT
            </p>
          </div>
        </div>

        {/* Milestone 3: Rajshahi Cantonment Public School and College (SSC) */}
        <div className="relative pl-8 md:pl-12 group">
          <div className="absolute -left-[17px] top-1.5 bg-slate-950 border-2 border-violet-400 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-all">
            <BookOpen className="h-4 w-4 text-violet-400" />
          </div>

          <div className="hidden md:block absolute -left-40 top-2 text-right w-32 text-xs font-mono text-violet-400 font-bold">
            2016 – 2018
          </div>

          <div className="glass-panel p-6 rounded-2xl border-slate-800/80 hover:border-violet-500/30 transition-all duration-300 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold">
                  Secondary School Certificate (SSC)
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white font-sans mt-0.5">
                  Rajshahi Cantonment Public School and College
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-violet-950 border border-violet-400/50 text-violet-300">
                  GPA: 5.00 / 5.00 (Golden)
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-violet-400" /> Rajshahi, BD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              Science Discipline · Core STEM Foundations
            </p>
          </div>
        </div>

        {/* Milestone 4: Certifications & Specialized Tracks */}
        <div className="relative pl-8 md:pl-12 group">
          <div className="absolute -left-[17px] top-1.5 bg-slate-950 border-2 border-amber-400 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all">
            <Award className="h-4 w-4 text-amber-400" />
          </div>

          <div className="hidden md:block absolute -left-40 top-2 text-right w-32 text-xs font-mono text-amber-400 font-bold">
            2026
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 space-y-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                Industry Certifications & Professional Training
              </span>
              <h3 className="text-xl font-bold text-white font-sans mt-0.5">
                DataCamp Certified Tracks
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolioData.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-400">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans leading-tight">
                    {cert.name}
                  </h4>
                  <p className="text-[11px] font-mono text-amber-400/90">{cert.issuer}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cert.topics.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
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
