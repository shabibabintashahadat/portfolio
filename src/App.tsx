import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResearchThesisLab } from './components/ResearchThesisLab';
import { Projects } from './components/Projects';
import { FraudXaiLab } from './components/FraudXaiLab';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { TerminalModal } from './components/TerminalModal';
import { ResumeModal } from './components/ResumeModal';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Interactive Multi-Mode Canvas (Synapse, Quantum, Matrix) */}
      <InteractiveCanvas />

      {/* Navigation Header */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <ResearchThesisLab />
        <Projects />
        <FraudXaiLab />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Interactive Modals */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* System Footer Banner */}
      <footer className="w-full py-8 text-center text-[11px] font-mono text-slate-500 border-t border-slate-900 mt-20 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SHABIBA BINTA SHAHADAT // BRAC UNIVERSITY CSE &apos;26</span>
          </div>
          <div className="text-slate-600">
            Engineered with React 19, TypeScript, PyOpenGL Simulation & Multimodal AI Research
          </div>
          <div>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Open Terminal [~#]
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
