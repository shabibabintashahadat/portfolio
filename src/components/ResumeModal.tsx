import { X, Printer, ExternalLink, Mail, Phone, MapPin, Award, BookOpen, Briefcase } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-elevated rounded-2xl border-cyan-500/40 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Toolbar */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Curriculum Vitae — Shabiba Binta Shahadat
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print CV or save to PDF"
            >
              <Printer className="h-3.5 w-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CV Document Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-950/95 text-slate-200 space-y-8 font-sans">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-800 space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-wide font-sans">
              SHABIBA BINTA SHAHADAT
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-cyan-400" /> Dhaka, Bangladesh</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-emerald-400" /> +8801770554527</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-cyan-400" /> shahadatshabiba@gmail.com</span>
            </div>
            <div className="flex justify-center gap-4 text-xs font-mono text-cyan-400 pt-1">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#" className="hover:underline flex items-center gap-1">
                Portfolio <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
              Objective
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {portfolioData.personal.objective}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Education
            </h2>

            <div className="space-y-4 text-xs">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-white">
                    <span>{edu.institution}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{edu.location}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 italic">
                    <span>{edu.degree}</span>
                    <span className="font-mono not-italic text-slate-400">{edu.graduation}</span>
                  </div>
                  <div className="text-cyan-300 font-mono font-semibold">
                    • {edu.cgpa}
                  </div>
                  {edu.coursework && (
                    <div className="text-[11px] text-slate-400">
                      • Relevant Coursework: {edu.coursework.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Research Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              Research Experience
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-baseline font-bold text-white">
                <span>{portfolioData.thesis.role}</span>
                <span className="text-slate-400 font-mono text-[11px]">{portfolioData.thesis.period}</span>
              </div>
              <div className="text-cyan-300 italic font-semibold">
                {portfolioData.thesis.title}
              </div>
              <div className="text-slate-400 text-[11px]">
                Supervisor: {portfolioData.thesis.supervisor}, {portfolioData.thesis.institution}
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
                {portfolioData.thesis.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs">
              {Object.entries(portfolioData.skills).map(([category, list]) => (
                <div key={category} className="text-[11px]">
                  <strong className="text-white">{category}: </strong>
                  <span className="text-slate-300">{list.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">
              Technical Projects
            </h2>

            <div className="space-y-4 text-xs">
              {portfolioData.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-white">
                    <span>{proj.name} — <span className="font-normal text-slate-300">{proj.type}</span></span>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline font-mono text-[11px]">
                      GitHub
                    </a>
                  </div>
                  <div className="text-slate-400 font-mono text-[10px]">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300 text-[11px]">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              Certifications
            </h2>
            <div className="space-y-1.5 text-xs">
              {portfolioData.certifications.map((c, i) => (
                <div key={i} className="flex justify-between text-[11px]">
                  <span className="text-white font-semibold">{c.name}</span>
                  <span className="text-slate-400 font-mono">{c.issuer} — {c.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
