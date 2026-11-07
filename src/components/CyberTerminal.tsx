import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, CornerDownLeft, Sparkles, Calculator, 
  BookOpen, Lightbulb, RefreshCw, Maximize2, Minimize2 
} from 'lucide-react';
import { FieldKey } from '../types';
import { soundEngine } from '../utils/audio';

interface EngyAssistantProps {
  currentField: FieldKey;
  onSwitchField: (f: FieldKey) => void;
  scores: Record<FieldKey, number>;
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'engy' | 'sys';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: 'WIX1001 Logic & Proofs', query: 'Explain WIX1001 Computing Mathematics I: Induction proofs and propositional logic.' },
  { label: 'WIA2001 DB Normalization', query: 'How does WIA2001 Database normalization work? Give a 1NF, 2NF, 3NF, BCNF example.' },
  { label: 'WIA2005 Master Theorem', query: 'WIA2005: Explain Master Theorem formulas and Big-O dynamic programming patterns.' },
  { label: 'WIA3001 Backpropagation', query: 'Break down WIA3001 Artificial Intelligence neural backpropagation step-by-step.' },
  { label: 'WIX4001 FYP Topic Ideas', query: 'Suggest high-scoring FYP capstone project ideas for Malaysian IPTA engineering students.' },
  { label: 'KMEA1112 Beam Deflection', query: 'How to calculate maximum bending moment and beam deflection in KMEA1112?' },
  { label: 'KEEA1111 Circuit Thévenin', query: 'Show step-by-step Thévenin equivalent resistance and voltage calculation for KEEA1111.' }
];

export function CyberTerminal({ currentField, onSwitchField, scores, isOpen, onToggle }: EngyAssistantProps) {
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'sys',
      text: 'ENGY NEURAL CO-PILOT INITIALIZED // MALAYSIAN IPTA & EAC CURRICULUM READY',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 'init-2',
      sender: 'engy',
      text: `Salam & greetings, Engineer! I am **Engy**, your dedicated AI Engineering Assistant.

I am specialized in the Malaysian IPTA syllabus (e.g. **WIX1001**, **WIA2001**, **WIA2005**, **WIA3001**, **WIX4001/4002** and engineering codes like **KMEA**, **KEEA**, **KCEA**).

Ask me for:
• Course notes, formula breakdowns & past-year problem derivations
• Final Year Project (FYP) & Capstone design proposal coaching
• Rapid calculations (e.g. type \`calc ohm 12 0.5\` or \`calc beam 6 5000\`)
• Sector navigation (e.g. \`field mech\` or \`field cs\`)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isLoading]);

  // Handle message sending (CLI calculator fast-path or Gemini AI backend)
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    soundEngine.playClick();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Fast-path client side commands
    const lower = trimmed.toLowerCase();
    const parts = lower.split(' ');

    if (parts[0] === 'clear') {
      setMessages([]);
      return;
    }

    if (parts[0] === 'field' && ['cs', 'mech', 'elec', 'civil'].includes(parts[1])) {
      const target = parts[1] as FieldKey;
      onSwitchField(target);
      soundEngine.playWarp();
      setMessages((prev) => [
        ...prev,
        {
          id: `engy-${Date.now()}`,
          sender: 'engy',
          text: `[WARP DIRECTIVE EXECUTED] Warped active sector hub to **${target.toUpperCase()}**. Neural radar synchronized.`,
          timestamp: timeStr
        }
      ]);
      return;
    }

    if (parts[0] === 'stats') {
      setMessages((prev) => [
        ...prev,
        {
          id: `engy-${Date.now()}`,
          sender: 'engy',
          text: `**NEURAL AFFINITY SCORE TELEMETRY:**
• **CS & AI:** ${scores.cs || 0} pts
• **Mechanical & Robotics:** ${scores.mech || 0} pts
• **Electrical & Photonic:** ${scores.elec || 0} pts
• **Civil Infrastructure:** ${scores.civil || 0} pts
• **Active Hub:** ${currentField.toUpperCase()}`,
          timestamp: timeStr
        }
      ]);
      return;
    }

    if (parts[0] === 'calc') {
      if (parts[1] === 'ohm') {
        const v = parseFloat(parts[2]);
        const i = parseFloat(parts[3]);
        if (!isNaN(v) && !isNaN(i) && i !== 0) {
          const r = (v / i).toFixed(2);
          const p = (v * i).toFixed(2);
          setMessages((prev) => [
            ...prev,
            {
              id: `engy-${Date.now()}`,
              sender: 'engy',
              text: `### [ENGY // OHM'S LAW COMPUTATION]
- **Voltage ($V$):** ${v} V
- **Current ($I$):** ${i} A
- **Resistance ($R = V/I$):** **${r} Ω**
- **Power ($P = V \\times I$):** **${p} W**`,
              timestamp: timeStr
            }
          ]);
          return;
        }
      } else if (parts[1] === 'beam') {
        const l = parseFloat(parts[2]);
        const w = parseFloat(parts[3]);
        if (!isNaN(l) && !isNaN(w)) {
          const maxM = ((w * l) / 4).toFixed(2);
          setMessages((prev) => [
            ...prev,
            {
              id: `engy-${Date.now()}`,
              sender: 'engy',
              text: `### [ENGY // BEAM BENDING MOMENT (KMEA1112)]
- **Span Length ($L$):** ${l} m
- **Point Load ($W$):** ${w} N (Center applied)
- **Maximum Bending Moment ($M_{\\max} = \\frac{WL}{4}$):** **${maxM} N·m** (at midspan)`,
              timestamp: timeStr
            }
          ]);
          return;
        }
      } else if (parts[1] === 'bigo') {
        const n = parseInt(parts[2], 10);
        if (!isNaN(n) && n > 0) {
          const linear = n;
          const nlogn = Math.round(n * Math.log2(n));
          const quad = n * n;
          setMessages((prev) => [
            ...prev,
            {
              id: `engy-${Date.now()}`,
              sender: 'engy',
              text: `### [ENGY // ASYMPTOTIC COMPLEXITY (WIA2005) for N = ${n}]
- **$O(\\log N)$:** ${Math.round(Math.log2(n))} operations
- **$O(N)$:** ${linear.toLocaleString()} operations
- **$O(N \\log N)$:** ${nlogn.toLocaleString()} operations
- **$O(N^2)$:** ${quad.toLocaleString()} operations`,
              timestamp: timeStr
            }
          ]);
          return;
        }
      }
    }

    // Call Engy AI Backend (/api/engy/chat)
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.sender === 'user' || m.sender === 'engy')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text
        }));

      const res = await fetch('/api/engy/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      soundEngine.playSuccess();

      setMessages((prev) => [
        ...prev,
        {
          id: `engy-${Date.now()}`,
          sender: 'engy',
          text: data.reply || 'Engy neural network returned an empty answer. Please retry.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error('Failed to communicate with Engy AI server:', err);
      soundEngine.playTone(300, 0.2, 'sawtooth', 0.2);

      setMessages((prev) => [
        ...prev,
        {
          id: `engy-err-${Date.now()}`,
          sender: 'engy',
          text: `### [ENGY // SYLLABUS DIRECTIVE: MALAYSIAN IPTA SYLLABUS]
*Local heuristic protocol engaged.*

For course queries such as **WIX1001** (Discrete Math), **WIA2001** (Database), **WIA2005** (Algorithms), **WIA3001** (AI), or **WIX4001/4002** (FYP):

• Check the corresponding note module under the **Sector Hub** tab!
• You can also execute quick local formulas:
  - \`calc ohm <V> <I>\` (e.g. \`calc ohm 240 10\`)
  - \`calc beam <length> <load>\` (e.g. \`calc beam 8 2000\`)
  - \`calc bigo <N>\` (e.g. \`calc bigo 500\`)
  - \`field <cs|mech|elec|civil>\` (e.g. \`field elec\`)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-40 bg-[#070712]/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.25)] backdrop-blur-2xl overflow-hidden flex flex-col transition-all duration-300 font-sans ${
        isExpanded 
          ? 'w-[95vw] sm:w-[680px] h-[82vh] max-h-[850px]' 
          : 'w-[95vw] sm:w-[500px] h-[520px]'
      }`}
    >
      {/* Top Bar */}
      <div className="px-4 py-3 bg-[#0c0c1a] border-b border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_12px_rgba(0,243,255,0.4)]">
            <Bot className="w-4 h-4 text-black font-black" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold font-mono tracking-wider text-cyan-300">ENGY</span>
              <span className="text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 rounded font-mono">
                IPTA AI COPILOT
              </span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>EAC/BEM Washington Accord Ready</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-gray-400">
          <button 
            onClick={() => setMessages([messages[0], messages[1]])} 
            className="p-1.5 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors"
            title="Clear Chat History"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-1.5 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors"
            title={isExpanded ? 'Minimize Window' : 'Expand Window'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={onToggle} 
            className="p-1.5 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Chips Carousel */}
      <div className="px-3 py-2 bg-black/40 border-b border-gray-800/60 overflow-x-auto flex items-center space-x-1.5 scrollbar-thin scrollbar-thumb-gray-800">
        <span className="text-[9px] font-mono text-cyan-500/80 uppercase tracking-wider shrink-0 flex items-center pr-1">
          <Sparkles className="w-2.5 h-2.5 mr-1" />
          IPTA PROMPTS:
        </span>
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.query)}
            disabled={isLoading}
            className="shrink-0 text-[10px] font-mono px-2 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 transition-all flex items-center space-x-1 disabled:opacity-50"
          >
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs leading-relaxed">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-1">
            {msg.sender === 'sys' && (
              <div className="text-center py-1 font-mono text-[9px] text-cyan-400/70 border-y border-cyan-500/10">
                {msg.text}
              </div>
            )}

            {msg.sender === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/40 text-cyan-100 rounded-2xl rounded-tr-none px-3.5 py-2.5 shadow-md">
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className="text-[8px] font-mono text-cyan-400/60 text-right mt-1">{msg.timestamp}</div>
                </div>
              </div>
            )}

            {msg.sender === 'engy' && (
              <div className="flex justify-start items-start space-x-2">
                <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="max-w-[90%] bg-[#0f0f20]/90 border border-gray-800 text-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm space-y-1.5">
                  <div className="whitespace-pre-wrap font-sans text-[11px] leading-relaxed markdown-body">
                    {msg.text}
                  </div>
                  <div className="text-[8px] font-mono text-gray-500 flex items-center justify-between pt-1 border-t border-gray-800/50">
                    <span className="text-cyan-400/60">ENGY // TACTICAL NODE</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[11px] p-2 bg-cyan-950/20 rounded-xl border border-cyan-500/20 animate-pulse">
            <Bot className="w-4 h-4 animate-spin" />
            <span>Engy is analyzing IPTA syllabus telemetry & computing equations...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputVal);
        }}
        className="p-3 bg-[#0a0a16] border-t border-cyan-500/30 flex items-center space-x-2"
      >
        <span className="text-cyan-400 font-mono font-bold text-xs pl-1">›</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask Engy about WIX1001, WIA2001, FYP topics, or type 'calc ohm 12 0.5'..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none disabled:opacity-50 font-sans"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-bold text-xs rounded-xl hover:opacity-90 disabled:opacity-40 transition-all flex items-center space-x-1 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline font-mono text-[10px]">SEND</span>
        </button>
      </form>
    </div>
  );
}
