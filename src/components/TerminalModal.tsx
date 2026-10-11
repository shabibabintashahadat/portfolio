import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            Welcome to Shabiba OS Terminal v2.6.4 (BRAC University · AI & Full-Stack Core)
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-yellow-400 font-mono">help</span> or click command chips below to inspect thesis, models, education, and contact channels.
          </p>
        </div>
      ),
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let res: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        res = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-cyan-300 font-bold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><strong className="text-yellow-400">thesis</strong> : Multimodal Sign & Braille research</div>
              <div><strong className="text-yellow-400">projects</strong> : List all 5 technical projects</div>
              <div><strong className="text-yellow-400">skills</strong> : Technical stack and libraries</div>
              <div><strong className="text-yellow-400">education</strong> : Degrees & academic institutions</div>
              <div><strong className="text-yellow-400">xai</strong> : Explainable AI fraud detection metrics</div>
              <div><strong className="text-yellow-400">contact</strong> : Email, Phone, and Social profiles</div>
              <div><strong className="text-yellow-400">cv</strong> : Download / Inspect full resume</div>
              <div><strong className="text-yellow-400">sudo hire</strong> : Direct recruiting authorization</div>
              <div><strong className="text-yellow-400">clear</strong> : Clear terminal history</div>
            </div>
          </div>
        );
        break;

      case 'thesis':
        res = (
          <div className="space-y-1 text-xs text-slate-300 font-mono bg-slate-900/60 p-3 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-bold">{portfolioData.thesis.title}</p>
            <p className="text-slate-400">Supervisor: {portfolioData.thesis.supervisor} · {portfolioData.thesis.period}</p>
            <p className="text-emerald-400">
              Accuracy: {portfolioData.thesis.metrics.accuracy} | Macro F1: {portfolioData.thesis.metrics.macroF1}
            </p>
            <p className="text-slate-300 pt-1">
              Architecture: EfficientNet-B0 (Spatial) + ViT (Temporal) + GCN (Skeletal) with Cross-Modal Attention Fusion generating Bangladeshi Braille Unicode.
            </p>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-300 font-bold">Featured Projects Showcase ({portfolioData.projects.length}):</p>
            {portfolioData.projects.map((p, i) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-yellow-400 font-bold">[{i + 1}] {p.name}</span>{' '}
                <span className="text-slate-400">({p.category})</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{p.technologies.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            {Object.entries(portfolioData.skills).map(([cat, items]) => (
              <div key={cat}>
                <span className="text-cyan-400 font-bold">{cat}: </span>
                <span className="text-slate-300">{items.join(' · ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        res = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-900/50 border border-slate-800">
                <p className="text-cyan-300 font-bold">{edu.institution} ({edu.graduation})</p>
                <p className="text-slate-300">{edu.degree} · <span className="text-emerald-400 font-bold">{edu.cgpa}</span></p>
              </div>
            ))}
          </div>
        );
        break;

      case 'xai':
        res = (
          <div className="text-xs text-slate-300 font-mono p-2.5 rounded bg-slate-900/60 border border-red-500/30 space-y-1">
            <p className="text-red-400 font-bold">Credit Card Fraud Detection with XAI</p>
            <p>Dataset: 568K+ transactions under realistic 99:1 imbalanced stream.</p>
            <p className="text-emerald-400">Precision improved from 0.48 to 0.86 (F1: 0.90) via PR calibration.</p>
            <p className="text-cyan-300">Audited with SHAP (Global importance) & LIME (Local instance audits).</p>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="text-xs text-slate-300 font-mono space-y-1">
            <p>Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-cyan-400 underline">{portfolioData.personal.email}</a></p>
            <p>Phone: <span className="text-emerald-400">{portfolioData.personal.phone}</span></p>
            <p>Location: <span className="text-slate-300">{portfolioData.personal.location}</span></p>
            <p>GitHub: <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{portfolioData.personal.github}</a></p>
            <p>LinkedIn: <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-violet-400 underline">{portfolioData.personal.linkedin}</a></p>
          </div>
        );
        break;

      case 'cv':
        res = (
          <div className="text-xs text-slate-300 font-mono space-y-1">
            <p className="text-emerald-400 font-bold">✓ Shabiba Binta Shahadat - B.Sc CSE BRAC University (2026)</p>
            <p>Opening CV modal and download pipeline...</p>
          </div>
        );
        break;

      case 'sudo hire':
        res = (
          <div className="text-xs text-emerald-400 font-mono p-3 rounded bg-emerald-950/40 border border-emerald-500/50 space-y-1">
            <p className="font-bold">PERMISSION GRANTED: Shabiba Binta Shahadat is ready for interviews!</p>
            <p className="text-slate-300">
              Skills: PyTorch, ViT, GCNs, React, Node.js, Express, MongoDB, Socket.io, WebRTC.
            </p>
            <p className="text-cyan-300">
              Ping directly at: {portfolioData.personal.email} or call {portfolioData.personal.phone}
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        res = (
          <p className="text-xs text-red-400 font-mono">
            command not found: &apos;{rawCmd}&apos;. Type &apos;help&apos; for list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: res }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const chips = ['help', 'thesis', 'projects', 'xai', 'education', 'contact', 'sudo hire', 'clear'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className={`glass-panel-elevated rounded-2xl border-cyan-500/40 flex flex-col shadow-2xl transition-all duration-300 w-full overflow-hidden ${
          isExpanded ? 'max-w-5xl h-[85vh]' : 'max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-cyan-400 ml-2 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
              shabiba@bracu-lab:~#
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              title="Close terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Command Helper Chips */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Quick:
          </span>
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleCommand(chip)}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/50 border border-slate-700 text-slate-300 transition-colors cursor-pointer flex-shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Scrollable Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs bg-slate-950/90 text-slate-200">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-2 text-cyan-400">
                <span className="text-emerald-400 font-bold">shabiba@ai-node:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Prompt Input */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-emerald-400 font-mono text-xs font-bold">shabiba@ai-node:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(input)}
            className="text-cyan-400 hover:text-cyan-300 p-1.5 rounded hover:bg-slate-800 cursor-pointer"
            title="Execute"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
