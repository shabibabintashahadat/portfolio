import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Phone, Copy, Check, Send, MessageSquare } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

export const Contact = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Construct mailto link with prefilled body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hi Shabiba,\n\n${message}\n\nFrom: ${name} (${senderEmail})`
    );
    window.open(`mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`);
    setSentStatus('Opening email client with pre-filled message!');
    setTimeout(() => setSentStatus(null), 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Background neon glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-xs uppercase tracking-widest">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Open for Opportunities</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">Connection</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          Seeking impactful software engineering, AI/ML research, and IT opportunities in Dhaka or remote. Reach out directly:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards (Left Column) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Email Direct */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-center justify-between group">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-cyan-950/60 rounded-xl border border-cyan-800/40 group-hover:border-cyan-400 transition-colors">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email Direct</span>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-xs font-mono font-bold text-white hover:text-cyan-300 break-all"
                >
                  {portfolioData.personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(portfolioData.personal.email, 'email')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copiedType === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          {/* Phone Direct */}
          <div className="glass-panel p-5 rounded-2xl border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-center justify-between group">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 group-hover:border-emerald-400 transition-colors">
                <Phone className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Direct Phone</span>
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  className="text-xs font-mono font-bold text-white hover:text-emerald-300"
                >
                  {portfolioData.personal.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(portfolioData.personal.phone, 'phone')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Copy Phone"
            >
              {copiedType === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-xl border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-center space-x-3 group"
            >
              <Github className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">GitHub</span>
                <span className="text-xs font-mono font-bold text-white">/Shabiba</span>
              </div>
            </a>

            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-xl border-slate-800/80 hover:border-violet-500/40 transition-all flex items-center space-x-3 group"
            >
              <Linkedin className="h-5 w-5 text-violet-400 group-hover:scale-110 transition-transform" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">LinkedIn</span>
                <span className="text-xs font-mono font-bold text-white">Shabiba Binta</span>
              </div>
            </a>
          </div>

          {/* Location Badge */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
            <span>Dhaka, Bangladesh · Available for On-Site & Remote Roles</span>
          </div>

        </div>

        {/* Quick Message Dispatcher Form (Right Column) */}
        <div className="lg:col-span-7 glass-panel-elevated p-6 md:p-8 rounded-3xl border-slate-800">
          <div className="mb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Direct Communication Channel
            </span>
            <h3 className="text-xl font-bold text-white mt-1">Send a Message</h3>
            <p className="text-xs text-slate-400 mt-1">
              Have an opening, collaboration, or research opportunity? Dispatch your note directly:
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Email</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's discuss opportunities, research, or technical projects..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-violet-600 text-slate-950 font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <Send className="h-4 w-4" />
              <span>Dispatch Message via Email</span>
            </button>

            {sentStatus && (
              <p className="text-center text-xs font-mono text-emerald-400 animate-pulse pt-1">
                ✓ {sentStatus}
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Footer System Details */}
      <div className="mt-20 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-500 font-mono text-xs gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Shabiba Binta Shahadat · Portfolio Architecture v2.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>BRAC University CSE Graduate © 2026</span>
        </div>
      </div>
    </section>
  );
};
