import { useState, useEffect } from 'react';
import { Terminal, Menu, X, Mail, Github, Linkedin, FileText } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar = ({ onOpenTerminal, onOpenResume }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'research', label: 'Thesis Lab' },
    { id: 'projects', label: 'Projects' },
    { id: 'xai-lab', label: 'XAI Sandbox' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-cyan-500/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Sign */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => scrollTo('hero')}
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Terminal className="h-4 w-4 text-cyan-400 group-hover:animate-pulse" />
            </div>
            <div className="leading-tight">
              <span className="font-mono text-sm font-bold tracking-tight text-white block">
                SHABIBA<span className="text-cyan-400">.ai</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 block">BRACU CSE &apos;26</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-6 font-mono text-xs">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`transition-all duration-200 hover:text-cyan-300 focus:outline-none cursor-pointer py-1 relative ${
                  activeSection === link.id ? 'text-cyan-400 font-bold' : 'text-slate-400'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </button>
            ))}
          </div>

          {/* Action Tools & Social Connect */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenTerminal}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              title="Launch Terminal"
            >
              <Terminal className="h-3 w-3 text-cyan-400" />
              <span>~# CLI</span>
            </button>

            <button
              onClick={onOpenResume}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-500/20 text-cyan-300 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              title="View & Print Official CV"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>CV</span>
            </button>

            <div className="h-4 w-px bg-slate-800" />

            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              title="Email Shabiba"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Drawer Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenResume}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
            >
              CV
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none cursor-pointer p-1"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden glass-panel bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 font-mono text-sm animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === link.id
                  ? 'bg-cyan-950/50 text-cyan-300 border-l-2 border-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 flex items-center justify-center gap-2"
            >
              <Terminal className="h-4 w-4" />
              <span>Launch Terminal CLI</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>View & Print Official CV</span>
            </button>

            <div className="flex justify-around pt-3 text-slate-400">
              <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                <Github className="h-5 w-5" />
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-violet-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-emerald-400">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
