import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { InteractiveCanvas } from './components/InteractiveCanvas';


function App() {
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Interactive Nodes */}
      <InteractiveCanvas />

      {/* Navigation Header */}
      <Navbar />

      {/* Portfolio Layout Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Footer Banner */}
      <footer className="w-full py-8 text-center text-[10px] font-mono text-slate-600 border-t border-slate-900/60 mt-16 bg-slate-950/20 backdrop-blur-sm">
        System: Shabiba Portfolio v1.0.0 // Node: v22.12.0 // Latency: 0.12ms // Access Level: Public
      </footer>
    </div>
  );
}

export default App;

