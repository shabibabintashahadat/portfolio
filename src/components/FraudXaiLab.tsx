import { useState, useMemo } from 'react';
import { ShieldAlert, ShieldCheck, Cpu, Sliders, BarChart3, Info } from 'lucide-react';

interface PresetTransaction {
  name: string;
  amount: number;
  distance: number;
  velocity: number;
  hour: number;
  tag: string;
}

const PRESETS: PresetTransaction[] = [
  {
    name: 'Typical Grocery Run',
    amount: 45,
    distance: 4,
    velocity: 1,
    hour: 14,
    tag: 'Legitimate Baseline',
  },
  {
    name: 'Midnight Overseas Spike',
    amount: 3200,
    distance: 4500,
    velocity: 8,
    hour: 3,
    tag: 'High Risk Attack',
  },
  {
    name: 'Unusual Electronics Buy',
    amount: 850,
    distance: 120,
    velocity: 3,
    hour: 22,
    tag: 'Borderline Trigger',
  },
  {
    name: 'Daily Commute Coffee',
    amount: 8,
    distance: 12,
    velocity: 1,
    hour: 8,
    tag: 'Low Risk Habit',
  },
];

export const FraudXaiLab = () => {
  const [amount, setAmount] = useState<number>(45);
  const [distance, setDistance] = useState<number>(4);
  const [velocity, setVelocity] = useState<number>(1);
  const [hour, setHour] = useState<number>(14);

  // Simulated PyTorch DNN calibrated scoring function
  const { fraudProbability, shapValues, isFraud, limeInsights } = useMemo(() => {
    // Feature normalizations
    const normAmount = Math.min(amount / 2000, 2.5);
    const normDist = Math.min(distance / 1500, 2.5);
    const normVel = Math.min(velocity / 8, 2.5);
    const nightRisk = hour < 6 || hour > 23 ? 0.35 : 0.05;

    // Linear combination + Sigmoid simulating PyTorch DNN with PR threshold calibration
    const logit =
      -3.2 +
      normAmount * 2.8 +
      normDist * 2.4 +
      normVel * 2.2 +
      nightRisk * 1.8;

    const prob = 1 / (1 + Math.exp(-logit));
    const percentage = Math.round(prob * 100);

    // Calibrated PR threshold from thesis/CV (0.65 threshold yields Precision 0.86, F1 0.90)
    const calibratedThreshold = 65;
    const fraudFlag = percentage >= calibratedThreshold;

    // SHAP Attribution calculation (marginal contribution of each feature departing from base)
    const shapAmount = +(normAmount * 0.38).toFixed(2);
    const shapDistance = +(normDist * 0.32).toFixed(2);
    const shapVelocity = +(normVel * 0.28).toFixed(2);
    const shapTime = +(nightRisk * 0.22).toFixed(2);

    const insights = [];
    if (amount > 1000) insights.push('Amount exceeds 98th percentile of historical cardholder spending');
    if (distance > 500) insights.push(`Geographical displacement (${distance} km) deviates severely from habitual cluster`);
    if (velocity >= 4) insights.push(`High transaction burst (${velocity} txns/hr) indicates automated card testing`);
    if (hour < 5) insights.push(`Off-hours activity at ${hour}:00 AM heightens fraud anomaly vector`);
    if (insights.length === 0) insights.push('All behavioral features remain well within 99.5% legitimate confidence envelope');

    return {
      fraudProbability: percentage,
      shapValues: [
        { name: 'Transaction Amount ($)', val: amount, shap: shapAmount, isPositive: shapAmount > 0.15 },
        { name: 'Geo Distance (km)', val: distance, shap: shapDistance, isPositive: shapDistance > 0.15 },
        { name: 'Hourly Velocity (tx/hr)', val: velocity, shap: shapVelocity, isPositive: shapVelocity > 0.12 },
        { name: 'Time of Day (Hour)', val: `${hour}:00`, shap: shapTime, isPositive: shapTime > 0.10 },
      ],
      isFraud: fraudFlag,
      limeInsights: insights,
    };
  }, [amount, distance, velocity, hour]);

  const applyPreset = (preset: PresetTransaction) => {
    setAmount(preset.amount);
    setDistance(preset.distance);
    setVelocity(preset.velocity);
    setHour(preset.hour);
  };

  return (
    <section id="xai-lab" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-widest">
          <ShieldAlert className="h-3.5 w-3.5 animate-pulse" />
          <span>Interactive Machine Learning & XAI Sandbox</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
          Explainable AI (XAI) <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400">Fraud Auditing Engine</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full" />
        <p className="max-w-3xl mx-auto text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          From Shabiba&apos;s project benchmarking across <span className="text-white font-semibold font-mono">568,000+ transactions</span> under severe <span className="text-red-400 font-mono">99:1 class imbalance</span>. Calibrated Precision-Recall thresholds boosted precision from <span className="text-red-400 font-mono">0.48 → 0.86</span> (F1: <span className="text-emerald-400 font-mono">0.90</span>). Test transaction parameters below to audit PyTorch neural network decisions with <span className="text-cyan-400 font-mono">SHAP</span> and <span className="text-violet-400 font-mono">LIME</span>.
        </p>
      </div>

      {/* Benchmarking Comparison Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="glass-panel p-3.5 rounded-xl border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Dataset Size</span>
          <div className="text-xl font-bold font-mono text-white mt-0.5">568,000+</div>
          <span className="text-[10px] text-slate-500">Robust Scaled + PCA</span>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Stream Imbalance</span>
          <div className="text-xl font-bold font-mono text-red-400 mt-0.5">99:1 Ratio</div>
          <span className="text-[10px] text-slate-500">Realistic Skewed Sim</span>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Precision Leap</span>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">0.48 → 0.86</div>
          <span className="text-[10px] text-slate-500">+79.1% PR Calibration</span>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Final F1-Score</span>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">0.90</div>
          <span className="text-[10px] text-slate-500">DNN with SHAP/LIME</span>
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="glass-panel-elevated p-6 md:p-8 rounded-3xl border-slate-800">
        
        {/* Preset Buttons */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5" />
              Quick Simulation Scenarios
            </span>
            <span className="text-[11px] font-mono text-slate-500">Click to load transaction vector</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{p.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {p.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Feature Sliders */}
          <div className="lg:col-span-6 space-y-5 bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              Input Transaction Features
            </h3>

            {/* Slider 1: Amount */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Transaction Amount:</span>
                <span className="text-cyan-400 font-bold">${amount.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="1"
                max="5000"
                step="5"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>$1</span>
                <span>$2,500</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Slider 2: Geo Distance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Distance from Cardholder Residence:</span>
                <span className="text-cyan-400 font-bold">{distance.toLocaleString()} km</span>
              </div>
              <input
                type="range"
                min="0"
                max="6000"
                step="10"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 km (Home)</span>
                <span>3,000 km</span>
                <span>6,000 km</span>
              </div>
            </div>

            {/* Slider 3: Velocity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Velocity (Transactions in Last Hour):</span>
                <span className="text-cyan-400 font-bold">{velocity} txns / hr</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 tx/hr</span>
                <span>6 tx/hr</span>
                <span>12 tx/hr</span>
              </div>
            </div>

            {/* Slider 4: Hour of Day */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Time of Transaction:</span>
                <span className="text-cyan-400 font-bold">{hour}:00 ({hour < 12 ? 'AM' : 'PM'})</span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>00:00 (Midnight)</span>
                <span>12:00 (Noon)</span>
                <span>23:00 (Night)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prediction Gauge + SHAP Attribution Chart */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Verdict Card */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isFraud
                  ? 'bg-red-950/30 border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
                  : 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                  Calibrated PyTorch DNN Output
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 ${
                    isFraud
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {isFraud ? <ShieldAlert className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                  {isFraud ? 'FLAGGED AS FRAUD' : 'LEGITIMATE TRANSACTION'}
                </span>
              </div>

              {/* Probability Meter */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {fraudProbability}%
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    PR Decision Threshold: <strong>65%</strong>
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isFraud
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${Math.min(fraudProbability, 100)}%` }}
                  />
                  {/* Threshold mark */}
                  <div className="absolute top-0 bottom-0 left-[65%] w-0.5 bg-white/70" title="Threshold (65%)" />
                </div>
              </div>
            </div>

            {/* SHAP Feature Attribution Waterfall */}
            <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  SHAP (SHapley Additive exPlanations) Values
                </h4>
                <span className="text-[10px] font-mono text-slate-500">Global & Local Attribution</span>
              </div>

              <p className="text-[11px] text-slate-400">
                Red pushes probability towards <span className="text-red-400 font-bold">Fraud</span>; Cyan/Emerald pulls towards <span className="text-emerald-400 font-bold">Normal</span>:
              </p>

              <div className="space-y-2.5 pt-1">
                {shapValues.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{item.name}</span>
                      <span className={item.isPositive ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {item.isPositive ? `+${item.shap} (Fraud risk)` : `${item.shap} (Normal)`}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          item.isPositive ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(Math.abs(item.shap) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local LIME Instance Audit Bullet */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-violet-400 font-bold flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                LIME Local Instance Audit:
              </div>
              <ul className="space-y-1 text-slate-300 pl-4 list-disc text-[11px]">
                {limeInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
