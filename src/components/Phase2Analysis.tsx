import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, RotateCcw, Cpu, Wrench, Zap, Building, 
  CheckCircle2, Compass, Activity, Award 
} from 'lucide-react';
import { FieldKey } from '../types';
import { FIELD_CONFIGS } from '../data/engineeringData';
import { soundEngine } from '../utils/audio';

interface Phase2AnalysisProps {
  scores: Record<FieldKey, number>;
  dominantField: FieldKey;
  onProceed: (selectedField: FieldKey) => void;
  onRetake: () => void;
}

export function Phase2Analysis({ scores, dominantField, onProceed, onRetake }: Phase2AnalysisProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [chosenField, setChosenField] = useState<FieldKey>(dominantField);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'Initializing quantum tensor decoding...',
    'Deconvolving collection velocity & coordinate trajectory...',
    'Matching neural bias against 4-discipline engineering matrix...',
    'Synthesizing dominant specialization signature...'
  ];

  useEffect(() => {
    soundEngine.playWarp();
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) {
          soundEngine.playTone(450 + prev * 120, 0.05, 'triangle', 0.08);
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    const timer = setTimeout(() => {
      setAnalyzing(false);
      soundEngine.playSuccess();
    }, 2200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(timer);
    };
  }, []);

  const totalScore = Math.max(1, Object.values(scores).reduce((a, b) => a + b, 0));
  const activeInfo = FIELD_CONFIGS[chosenField];

  // Radar polygon calculation for the 4 axes:
  // North (CS), East (Mech), South (Elec), West (Civil)
  const maxScore = Math.max(1, ...Object.values(scores));
  const center = 110;
  const radius = 80;

  const getPoint = (val: number, angleDeg: number) => {
    const r = (val / maxScore) * radius * 0.85 + radius * 0.15;
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + r * Math.sin(rad),
      y: center - r * Math.cos(rad)
    };
  };

  const pCS = getPoint(scores.cs || 0, 0);       // North
  const pMech = getPoint(scores.mech || 0, 90);  // East
  const pElec = getPoint(scores.elec || 0, 180); // South
  const pCivil = getPoint(scores.civil || 0, 270); // West

  const radarPath = `M ${pCS.x} ${pCS.y} L ${pMech.x} ${pMech.y} L ${pElec.x} ${pElec.y} L ${pCivil.x} ${pCivil.y} Z`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-4">
      <div className="bg-[#0f0f1a] border border-cyan-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_45px_rgba(0,243,255,0.18)]">
        {/* Animated Scanner Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 animate-pulse" />

        {analyzing ? (
          <div className="py-20 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
              <Sparkles className="w-8 h-8 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-mono font-bold text-cyan-300">
                SYNTHESIZING NEURAL BLOCK DATA
              </h3>
              <p className="text-xs font-mono text-gray-400 mt-1 max-w-md mx-auto">
                {logs[logIndex]}
              </p>
            </div>

            <div className="w-64 h-1.5 bg-black/60 mx-auto rounded-full overflow-hidden border border-cyan-500/30">
              <div 
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((logIndex + 1) / logs.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Result */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-800 pb-6 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                    ANALYSIS COMPLETE // AFFINITY MATCH CONFIRMED
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mt-1 font-display" style={{ color: activeInfo.primaryColor }}>
                  {activeInfo.title}
                </h2>
                <div className="text-xs font-mono text-purple-300 mt-1">
                  ARCHETYPE: <span className="font-bold text-white">{activeInfo.personaTitle}</span>
                </div>
              </div>

              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg self-start md:self-center"
                style={{ backgroundColor: `${activeInfo.primaryColor}20`, border: `2px solid ${activeInfo.primaryColor}` }}
              >
                {chosenField === 'cs' && <Cpu className="w-9 h-9" style={{ color: activeInfo.primaryColor }} />}
                {chosenField === 'mech' && <Wrench className="w-9 h-9" style={{ color: activeInfo.primaryColor }} />}
                {chosenField === 'elec' && <Zap className="w-9 h-9" style={{ color: activeInfo.primaryColor }} />}
                {chosenField === 'civil' && <Building className="w-9 h-9" style={{ color: activeInfo.primaryColor }} />}
              </div>
            </div>

            {/* Persona Traits Narrative */}
            <div className="p-4 rounded-xl bg-black/50 border border-gray-800 text-sm text-gray-300 leading-relaxed font-sans flex items-start space-x-3">
              <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-cyan-300">Affinity Profile: </span>
                {activeInfo.traitDescription}
              </div>
            </div>

            {/* Visual Radar & Breakdown Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Radar Graphic */}
              <div className="bg-black/60 border border-gray-800/80 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                <span className="text-[10px] font-mono text-gray-400 uppercase mb-2">4-AXIS DISCIPLINE RADAR</span>
                
                <svg width="220" height="220" className="overflow-visible">
                  {/* Background Grid Rings */}
                  <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="#222" strokeWidth="1" />
                  <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="#222" strokeWidth="1" />
                  <circle cx={center} cy={center} r={radius} fill="none" stroke="#333" strokeWidth="1" />

                  {/* Axes */}
                  <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#222" strokeWidth="1" />
                  <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#222" strokeWidth="1" />

                  {/* Axis Labels */}
                  <text x={center} y={center - radius - 8} fill="#00f3ff" fontSize="9" fontFamily="monospace" textAnchor="middle">CS & AI</text>
                  <text x={center + radius + 12} y={center + 3} fill="#ffaa00" fontSize="9" fontFamily="monospace" textAnchor="start">MECH</text>
                  <text x={center} y={center + radius + 14} fill="#b026ff" fontSize="9" fontFamily="monospace" textAnchor="middle">ELEC</text>
                  <text x={center - radius - 10} y={center + 3} fill="#00ff66" fontSize="9" fontFamily="monospace" textAnchor="end">CIVIL</text>

                  {/* Radar Polygon */}
                  <polygon
                    points={`${pCS.x},${pCS.y} ${pMech.x},${pMech.y} ${pElec.x},${pElec.y} ${pCivil.x},${pCivil.y}`}
                    fill="rgba(0, 243, 255, 0.25)"
                    stroke="#00f3ff"
                    strokeWidth="2"
                  />

                  {/* Points */}
                  {[pCS, pMech, pElec, pCivil].map((pt, idx) => (
                    <circle key={idx} cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#00f3ff" strokeWidth="1.5" />
                  ))}
                </svg>
              </div>

              {/* Progress Bars Breakdown */}
              <div className="space-y-3.5 bg-black/40 border border-gray-800 p-5 rounded-2xl font-mono">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                  Vector Calibration Breakdown:
                </span>
                {(['cs', 'mech', 'elec', 'civil'] as FieldKey[]).map((key) => {
                  const item = FIELD_CONFIGS[key];
                  const score = scores[key] || 0;
                  const pct = Math.round((score / totalScore) * 100);
                  const isCurrent = chosenField === key;

                  return (
                    <div 
                      key={key} 
                      onClick={() => {
                        setChosenField(key);
                        soundEngine.playClick();
                      }}
                      className={`p-2 rounded-lg cursor-pointer transition-all border ${
                        isCurrent ? 'bg-white/5 border-cyan-500/40' : 'border-transparent hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex justify-between text-xs text-gray-300 mb-1">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.primaryColor }} />
                          <span className={isCurrent ? 'font-bold text-white' : ''}>{item.title}</span>
                        </span>
                        <span style={{ color: item.primaryColor }}>{score} pts ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${Math.max(6, pct)}%`,
                            backgroundColor: item.primaryColor
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Override / Choice Selector */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
              <button
                onClick={onRetake}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-700 bg-black/40 text-gray-400 hover:text-white hover:border-gray-500 text-xs font-mono flex items-center justify-center space-x-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETAKE BLOCK CATCHER TEST</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  onProceed(chosenField);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono font-bold text-black flex items-center justify-center space-x-2.5 transition-all shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: activeInfo.primaryColor,
                  boxShadow: `0 0 24px ${activeInfo.primaryColor}80`
                }}
              >
                <span>ENTER {activeInfo.title.toUpperCase()} HUB</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
