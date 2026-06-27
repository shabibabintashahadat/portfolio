import { useState, useEffect } from 'react';
import { Terminal, Menu, X, Mail, Github, Linkedin } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Terminal Sign */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <Terminal className="h-5 w-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              SHABIBA<span className="text-cyan-400">.exe</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 font-mono text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`transition-colors duration-300 hover:text-cyan-400 focus:outline-none cursor-pointer ${
                  activeSection === link.id ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Connect Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel bg-slate-950/95 border-b border-slate-800">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 font-mono">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-slate-900 text-cyan-400 border-l-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex justify-around pt-4 border-t border-slate-800">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-violet-400"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="text-slate-400 hover:text-emerald-400">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
