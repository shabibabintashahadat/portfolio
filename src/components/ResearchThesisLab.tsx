import { useState } from 'react';
import { Brain, Cpu, Sparkles, Volume2, CheckCircle2, ChevronRight, Activity, Eye, Layers } from 'lucide-react';

interface SignSample {
  id: string;
  bangla: string;
  transliteration: string;
  meaning: string;
  brailleUnicode: string;
  brailleDots: boolean[][]; // 2 cols x 3 rows per cell
  confidence: number;
  efficientNetConf: number;
  vitConf: number;
  gcnConf: number;
  attentionWeights: { spatial: number; temporal: number; graph: number };
  handPoseType: 'open_palm' | 'clenched_fist' | 'peace' | 'pointing' | 'thumbs_up' | 'namaste';
}

const SIGN_SAMPLES: SignSample[] = [
  {
    id: 'thanks',
    bangla: 'ধন্যবাদ',
    transliteration: 'Dhonnobad',
    meaning: 'Thank You',
    brailleUnicode: '⠙⠓⠝⠕⠃⠁⠙',
    brailleDots: [
      [true, true, false, true, true, false],
      [true, false, true, true, false, false],
      [true, true, false, false, false, false]
    ],
    confidence: 94.6,
    efficientNetConf: 94.2,
    vitConf: 93.8,
    gcnConf: 95.8,
    attentionWeights: { spatial: 0.31, temporal: 0.33, graph: 0.36 },
    handPoseType: 'open_palm',
  },

  {
    id: 'agri',
    bangla: 'কৃষি',
    transliteration: 'Krishi',
    meaning: 'Agriculture',
    brailleUnicode: '⠅⠗⠊⠱⠊',
    brailleDots: [
      [true, false, true, false, false, false],
      [true, true, true, false, true, false],
      [false, true, false, true, false, false]
    ],
    confidence: 90.4,
    efficientNetConf: 89.8,
    vitConf: 91.2,
    gcnConf: 90.2,
    attentionWeights: { spatial: 0.35, temporal: 0.32, graph: 0.33 },
    handPoseType: 'pointing',
  },
  {
    id: 'education',
    bangla: 'শিক্ষা',
    transliteration: 'Shikkha',
    meaning: 'Education / Learning',
    brailleUnicode: '⠱⠊⠅⠅⠓⠁',
    brailleDots: [
      [true, false, false, true, false, true],
      [false, true, false, true, false, false],
      [true, false, true, false, false, false]
    ],
    confidence: 92.1,
    efficientNetConf: 91.3,
    vitConf: 92.7,
    gcnConf: 92.3,
    attentionWeights: { spatial: 0.30, temporal: 0.36, graph: 0.34 },
    handPoseType: 'peace',
  },
  {
    id: 'help',
    bangla: 'সাহায্য',
    transliteration: 'Shahajjo',
    meaning: 'Assistance / Help',
    brailleUnicode: '⠎⠁⠓⠁⠚⠚⠕',
    brailleDots: [
      [false, true, true, false, true, false],
      [true, false, false, false, false, false],
      [true, true, false, false, true, false]
    ],
    confidence: 91.9,
    efficientNetConf: 90.5,
    vitConf: 91.8,
    gcnConf: 93.4,
    attentionWeights: { spatial: 0.29, temporal: 0.33, graph: 0.38 },
    handPoseType: 'thumbs_up',
  },
];

export const ResearchThesisLab = () => {
  const [selectedSign] = useState<SignSample>(SIGN_SAMPLES[0]);
  const [activeTab, setActiveTab] = useState<'demo' | 'architecture' | 'metrics'>('demo');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="research" className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 font-mono text-xs uppercase tracking-widest">
          <Brain className="h-3.5 w-3.5 animate-pulse" />
          <span>Undergraduate Thesis Spotlight</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Multimodal Sign Recognition & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">Braille Synthesis</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 via-teal-400 to-violet-500 mx-auto rounded-full" />
        <p className="max-w-3xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          Supervised by <span className="text-cyan-300 font-semibold font-mono">Dr. Md. Ashraful Alam</span> at <span className="text-white font-semibold">BRAC University</span>. 
          A novel deep learning architecture fusing <span className="text-cyan-400 font-mono">EfficientNet-B0</span>, <span className="text-violet-400 font-mono">Vision Transformers (ViT)</span>, and <span className="text-emerald-400 font-mono">Graph Convolutional Networks (GCN)</span> to generate real-time Bangladeshi Braille Unicode.
        </p>
      </div>

      {/* Metrics Highlights Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 text-center relative overflow-hidden group hover:border-cyan-400/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Test Accuracy</span>
          <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white font-mono mt-1">
            91.27%
          </div>
          <span className="text-[10px] font-mono text-cyan-400/80">Cross-Modal Evaluated</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-violet-500/20 text-center relative overflow-hidden group hover:border-violet-400/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Macro F1-Score</span>
          <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-white font-mono mt-1">
            0.9125
          </div>
          <span className="text-[10px] font-mono text-violet-400/80">Balanced Class Robustness</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 text-center relative overflow-hidden group hover:border-emerald-400/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Fusion Engine</span>
          <div className="text-xl md:text-2xl font-bold text-emerald-300 font-mono mt-2 truncate">
            Cross-Modal Attn
          </div>
          <span className="text-[10px] font-mono text-emerald-400/80">3-Stream Adaptive Gating</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-amber-500/20 text-center relative overflow-hidden group hover:border-amber-400/50 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Output Modality</span>
          <div className="text-xl md:text-2xl font-bold text-amber-300 font-mono mt-2 truncate">
            BD Braille Unicode
          </div>
          <span className="text-[10px] font-mono text-amber-400/80">Accessible Tactile Encoding</span>
        </div>
      </div>

      {/* Interactive Tabs Header */}
      <div className="flex justify-center mb-8">
        <div className="glass-panel p-1.5 rounded-2xl border-slate-800 flex space-x-1.5 max-w-md w-full">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'demo'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 inline mr-1.5" />
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'architecture'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5 inline mr-1.5" />
            3-Stream Pipeline
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === 'metrics'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="h-3.5 w-3.5 inline mr-1.5" />
            Research Data
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE SIMULATOR BENCH */}
      {activeTab === 'demo' && (
        <div className="glass-panel-elevated p-6 md:p-8 rounded-3xl border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: MediaPipe Landmark Topology Canvas */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Skeletal Graph Feature Stream</span>
                <h3 className="text-xl font-bold text-white mt-1">MediaPipe 21-Node Hand Topology</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Extracts spatial joint coordinates and structural edge vectors for the Graph Convolutional Network (GCN) pipeline:
                </p>
              </div>

              {/* Hand Skeletal Graph Landmark Visualization (SVG) */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Eye className="h-3 w-3 text-cyan-400" />
                    MediaPipe 21-Landmark Hand Graph
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                    GCN Graph Topology Active
                  </span>
                </div>

                <div className="h-44 w-full flex items-center justify-center relative">
                  <svg viewBox="0 0 200 160" className="w-full h-full stroke-cyan-400 fill-cyan-400">
                    {/* Palm base and connections */}
                    <circle cx="100" cy="140" r="4" className="fill-cyan-300" />
                    <line x1="100" y1="140" x2="80" y2="115" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <line x1="100" y1="140" x2="93" y2="105" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <line x1="100" y1="140" x2="107" y2="105" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <line x1="100" y1="140" x2="120" y2="115" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />

                    {/* Thumb */}
                    <circle cx="80" cy="115" r="3" />
                    <line x1="80" y1="115" x2="62" y2="98" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="62" cy="98" r="3" />
                    <line x1="62" y1="98" x2="48" y2="84" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="48" cy="84" r="3.5" className="fill-amber-400 animate-pulse" />

                    {/* Index finger */}
                    <circle cx="93" cy="105" r="3" />
                    <line x1="93" y1="105" x2="88" y2="72" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="88" cy="72" r="3" />
                    <line x1="88" y1="72" x2="85" y2="44" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="85" cy="44" r="3.5" className="fill-cyan-300 animate-pulse" />

                    {/* Middle finger */}
                    <circle cx="107" cy="105" r="3" />
                    <line x1="107" y1="105" x2="107" y2="65" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="107" cy="65" r="3" />
                    <line x1="107" y1="65" x2="107" y2="34" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="107" cy="34" r="3.5" className="fill-violet-300 animate-pulse" />

                    {/* Ring finger */}
                    <circle cx="120" cy="115" r="3" />
                    <line x1="120" y1="115" x2="124" y2="75" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="124" cy="75" r="3" />
                    <line x1="124" y1="75" x2="128" y2="48" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="128" cy="48" r="3.5" className="fill-emerald-300 animate-pulse" />

                    {/* Pinky */}
                    <line x1="120" y1="115" x2="136" y2="122" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="136" cy="122" r="3" />
                    <line x1="136" y1="122" x2="145" y2="95" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="145" cy="95" r="3" />
                    <line x1="145" y1="95" x2="150" y2="68" strokeWidth="2" stroke="rgba(56,189,248,0.6)" />
                    <circle cx="150" cy="68" r="3.5" className="fill-pink-400 animate-pulse" />
                  </svg>

                  {/* Overlay badge */}
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                    Nodes: 21 | Edges: 20
                  </div>
                </div>
              </div>
            </div>

            {/* Middle & Right: Multi-Stream Attention Weights & Braille Output */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Multimodal Stream Confidence Scores */}
              <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Cross-Modal Attention Fusion Weights
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Sign: <strong className="text-white">{selectedSign.bangla}</strong>
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Stream 1 */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Spatial Stream (EfficientNet-B0)</span>
                      <span className="text-cyan-400 font-bold">{selectedSign.efficientNetConf}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${selectedSign.efficientNetConf}%` }}
                      />
                    </div>
                  </div>

                  {/* Stream 2 */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Temporal Stream (Vision Transformer - ViT)</span>
                      <span className="text-violet-400 font-bold">{selectedSign.vitConf}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                        style={{ width: `${selectedSign.vitConf}%` }}
                      />
                    </div>
                  </div>

                  {/* Stream 3 */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Structural Stream (GCN Landmark Topology)</span>
                      <span className="text-emerald-400 font-bold">{selectedSign.gcnConf}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${selectedSign.gcnConf}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Attention distribution breakdown */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Attention Split:</span>
                  <div className="flex gap-4">
                    <span className="text-cyan-400">Spatial: {(selectedSign.attentionWeights.spatial * 100).toFixed(0)}%</span>
                    <span className="text-violet-400">Temporal: {(selectedSign.attentionWeights.temporal * 100).toFixed(0)}%</span>
                    <span className="text-emerald-400">Graph: {(selectedSign.attentionWeights.graph * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* BRAILLE SYNTHESIS RESULT CARD */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 border border-cyan-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-spin" />
                    Synthesized Bangladeshi Braille Unicode
                  </span>
                  <button
                    onClick={() => speakWord(selectedSign.bangla)}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 flex items-center gap-1 cursor-pointer transition-all"
                    title="Pronounce recognized gesture"
                  >
                    <Volume2 className={`h-3.5 w-3.5 ${isSpeaking ? 'animate-bounce text-cyan-300' : ''}`} />
                    <span>Pronounce</span>
                  </button>
                </div>

                {/* Giant Braille Presentation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-4xl md:text-5xl font-mono text-cyan-300 tracking-widest glow-text-cyan select-all">
                      {selectedSign.brailleUnicode}
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      Bengali Sign: <span className="text-white font-bold">{selectedSign.bangla}</span> ({selectedSign.transliteration})
                    </div>
                  </div>

                  {/* 6-Dot Physical Tactile Matrix Simulation */}
                  <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 write-vertical">6-Dot Cell</span>
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {selectedSign.brailleDots[0].map((active, idx) => (
                        <div
                          key={idx}
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                            active ? 'braille-dot-active scale-110' : 'braille-dot-inactive'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Macro F1: 0.9125 Confidence: {selectedSign.confidence}%
                  </span>
                  <span className="text-slate-500">
                    Bangladeshi Braille Standard Compatible
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: 3-STREAM ARCHITECTURE DEEP DIVE */}
      {activeTab === 'architecture' && (
        <div className="glass-panel-elevated p-6 md:p-8 rounded-3xl border-violet-500/30 space-y-8 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">End-to-End Multimodal Pipeline</span>
            <h3 className="text-2xl font-bold text-white mt-1">Cross-Modal Attention Fusion Architecture</h3>
            <p className="text-sm text-slate-300 mt-1">
              How EfficientNet-B0, ViT, and GCN cooperate to eliminate spatial occlusion and temporal ambiguity in sign language:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stream 1 */}
            <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500" />
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Cpu className="h-4 w-4" />
                <span>Stream 1: Spatial</span>
              </div>
              <h4 className="text-lg font-bold text-white">EfficientNet-B0</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extracts high-resolution fine-grained appearance features, hand texture nuances, and wrist orientations from individual video frames with compound scaling.
              </p>
              <div className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/40 p-2 rounded-lg border border-cyan-800/40">
                Input: [B, C, H, W] → 1280-dim Spatial Embedding
              </div>
            </div>

            {/* Stream 2 */}
            <div className="glass-panel p-5 rounded-2xl border-violet-500/30 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />
              <div className="flex items-center space-x-2 text-violet-400 font-mono text-xs font-bold uppercase">
                <Layers className="h-4 w-4" />
                <span>Stream 2: Temporal</span>
              </div>
              <h4 className="text-lg font-bold text-white">Vision Transformer (ViT)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Models sequence dynamics, trajectory transitions, and motion context across sequential frames using multi-head self-attention mechanisms.
              </p>
              <div className="text-[10px] font-mono text-violet-300/80 bg-violet-950/40 p-2 rounded-lg border border-violet-800/40">
                Input: [B, T, D] → Multi-Head Self-Attention
              </div>
            </div>

            {/* Stream 3 */}
            <div className="glass-panel p-5 rounded-2xl border-emerald-500/30 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <Activity className="h-4 w-4" />
                <span>Stream 3: Skeletal</span>
              </div>
              <h4 className="text-lg font-bold text-white">Graph Convolutions (GCN)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Represents 21 MediaPipe hand landmarks as node graph vertices and skeletal bones as adjacency edges, making posture detection invariant to lighting and skin tone.
              </p>
              <div className="text-[10px] font-mono text-emerald-300/80 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                Input: A ∈ R^(21x21) adjacency graph + coords
              </div>
            </div>
          </div>

          {/* Fusion Gate Diagram */}
          <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
            <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Cross-Modal Attention Fusion Mechanism
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rather than naive concatenation, an attention gating layer computes learnable softmax cross-weights across the 3 representation spaces. If hand posture is ambiguous due to motion blur, the GCN graph stream is dynamically upweighted; if skeletal points occlude, the EfficientNet-B0 visual stream compensates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300">
                Spatial Feature (F_s)
              </div>
              <span className="text-slate-500">⊕</span>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-violet-500/30 text-violet-300">
                Temporal Sequence (F_t)
              </div>
              <span className="text-slate-500">⊕</span>
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300">
                Graph Skeleton (F_g)
              </div>
              <ChevronRight className="h-4 w-4 text-cyan-400" />
              <div className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400 text-white font-bold">
                Softmax Gating Attention
              </div>
              <ChevronRight className="h-4 w-4 text-cyan-400" />
              <div className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-400 text-amber-200 font-bold">
                Braille Unicode Mapper
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BENCHMARK METRICS */}
      {activeTab === 'metrics' && (
        <div className="glass-panel-elevated p-6 md:p-8 rounded-3xl border-emerald-500/30 space-y-6 animate-fade-in">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Empirical Thesis Validation</span>
            <h3 className="text-2xl font-bold text-white mt-1">Ablation Study & Model Benchmarks</h3>
            <p className="text-sm text-slate-300 mt-1">
              Comparative performance proving the superiority of the proposed multimodal fusion framework:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Architecture</th>
                  <th className="py-3 px-4">Modality</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Macro F1</th>
                  <th className="py-3 px-4">Braille Synthesis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/30">
                  <td className="py-3 px-4">EfficientNet-B0 Baseline</td>
                  <td className="py-3 px-4 text-slate-400">Spatial Only</td>
                  <td className="py-3 px-4">84.15%</td>
                  <td className="py-3 px-4">0.8390</td>
                  <td className="py-3 px-4 text-slate-500">No</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-3 px-4">ViT Video Sequence</td>
                  <td className="py-3 px-4 text-slate-400">Temporal Only</td>
                  <td className="py-3 px-4">86.40%</td>
                  <td className="py-3 px-4">0.8610</td>
                  <td className="py-3 px-4 text-slate-500">No</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-3 px-4">Skeletal GCN</td>
                  <td className="py-3 px-4 text-slate-400">Graph Landmark</td>
                  <td className="py-3 px-4">88.20%</td>
                  <td className="py-3 px-4">0.8795</td>
                  <td className="py-3 px-4 text-slate-500">No</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="py-3 px-4">Naive Concatenation</td>
                  <td className="py-3 px-4 text-slate-400">Spatial + Temporal + Graph</td>
                  <td className="py-3 px-4">89.10%</td>
                  <td className="py-3 px-4">0.8870</td>
                  <td className="py-3 px-4 text-emerald-400">Yes</td>
                </tr>
                <tr className="bg-cyan-950/30 text-white font-bold border-l-4 border-cyan-400">
                  <td className="py-3.5 px-4 text-cyan-300">Proposed: Cross-Modal Attention Fusion (Shabiba et al.)</td>
                  <td className="py-3.5 px-4 text-cyan-400">Multimodal 3-Stream</td>
                  <td className="py-3.5 px-4 text-emerald-400">91.27%</td>
                  <td className="py-3.5 px-4 text-emerald-400">0.9125</td>
                  <td className="py-3.5 px-4 text-cyan-300">Bangladeshi Braille Unicode</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 font-sans flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Social Impact & Accessibility:</strong> By directly generating standard Bangladeshi Braille Unicode points from camera feeds, this system bridges communication barriers between deaf, mute, and visually impaired individuals in Bangladesh without requiring expensive specialized sensor gloves.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
