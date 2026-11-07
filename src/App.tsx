/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bot, Terminal, RotateCcw, Activity, Volume2, VolumeX, Sparkles, 
  Cpu, Wrench, Zap, Building, HelpCircle, Layers, CheckCircle2 
} from 'lucide-react';
import { FieldKey, CommunityProject, EngineeringSquad } from './types';
import { FIELD_CONFIGS, INITIAL_COMMUNITY_PROJECTS, INITIAL_SQUADS } from './data/engineeringData';
import { Phase1Game } from './components/Phase1Game';
import { Phase2Analysis } from './components/Phase2Analysis';
import { Phase3Dashboard } from './components/Phase3Dashboard';
import { CyberTerminal } from './components/CyberTerminal';
import { soundEngine } from './utils/audio';

export default function App() {
  // App Phase State: 1 = MiniGame, 2 = HUD Analysis, 3 = Main Hub Engine
  const [phase, setPhase] = useState<number>(1);

  // Assessment Scores
  const [scores, setScores] = useState<Record<FieldKey, number>>({
    cs: 0,
    mech: 0,
    elec: 0,
    civil: 0
  });
  const [dominantField, setDominantField] = useState<FieldKey>('cs');

  // Active Selected Field for Phase 3 Hub
  const [currentField, setCurrentField] = useState<FieldKey>('cs');
  const [activeTab, setActiveTab] = useState<string>('notes');

  // Community Projects with localStorage persistence
  const [communityProjects, setCommunityProjects] = useState<CommunityProject[]>(() => {
    try {
      const saved = localStorage.getItem('engiforge_community_projects');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_COMMUNITY_PROJECTS;
  });

  // Squads with localStorage persistence
  const [squads, setSquads] = useState<EngineeringSquad[]>(() => {
    try {
      const saved = localStorage.getItem('engiforge_squads');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SQUADS;
  });

  // Sound Engine state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Cyber Terminal CLI open state
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('engiforge_community_projects', JSON.stringify(communityProjects));
    } catch {
      // ignore
    }
  }, [communityProjects]);

  // Sync squads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('engiforge_squads', JSON.stringify(squads));
    } catch {
      // ignore
    }
  }, [squads]);

  // Update sound engine toggle
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEngine.enabled = nextState;
    if (nextState) {
      soundEngine.playTone(700, 0.1, 'sine', 0.15);
    }
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string>('');

  // Quick bypass for immediate testing
  const quickBypass = (fieldKey: FieldKey = 'cs') => {
    soundEngine.playWarp();
    setScores({ cs: 16, mech: 9, elec: 11, civil: 7 });
    setDominantField(fieldKey);
    setCurrentField(fieldKey);
    setPhase(3);
    setToastMessage(`Sector warped to ${FIELD_CONFIGS[fieldKey].title}`);
    setTimeout(() => setToastMessage(''), 2500);
  };


  return (
    <div className="min-h-screen bg-[#07070c] text-gray-100 font-sans selection:bg-[#00f3ff] selection:text-black relative overflow-x-hidden">
      {/* BACKGROUND NEON GLOWS & GRID */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#00f3ff 1px, transparent 1px), radial-gradient(#b026ff 1px, #07070c 1px)`,
            backgroundSize: `48px 48px`,
            backgroundPosition: `0 0, 24px 24px`
          }}
        />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f3ff] rounded-full blur-[140px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#b026ff] rounded-full blur-[160px] opacity-15 pointer-events-none" />
      </div>

      {/* TOP CYBER NAVIGATION BAR */}
      <header className="relative z-30 border-b border-cyan-500/20 bg-[#0a0a14]/85 backdrop-blur-md sticky top-0 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => {
            soundEngine.playClick();
            setPhase(1);
          }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-600 to-indigo-700 shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-black font-black" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
            </span>
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent font-display">
              ENGI<span className="text-white font-mono">FORGE</span>
            </h1>
            <p className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase">
              Cybernetic Engineering Platform
            </p>
          </div>
        </div>

        {/* Phase Stepper Pills (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 bg-black/60 border border-gray-800 px-3 py-1.5 rounded-full text-xs font-mono">
          <button 
            onClick={() => {
              soundEngine.playClick();
              setPhase(1);
            }}
            className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
              phase === 1 ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>1. ASSESSMENT</span>
          </button>
          <span className="text-gray-700">/</span>
          <button 
            onClick={() => {
              soundEngine.playClick();
              setPhase(2);
            }}
            className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
              phase === 2 ? 'bg-purple-500 text-white font-bold shadow-[0_0_10px_rgba(176,38,255,0.5)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>2. NEURAL RADAR</span>
          </button>
          <span className="text-gray-700">/</span>
          <button 
            onClick={() => {
              soundEngine.playClick();
              setPhase(3);
            }}
            className={`px-3 py-1 rounded-full transition-all flex items-center space-x-1.5 ${
              phase === 3 ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.5)]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>3. SECTOR HUB</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Engy AI Assistant Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setTerminalOpen(!terminalOpen);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center space-x-1.5 transition-all ${
              terminalOpen 
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.3)]' 
                : 'border-cyan-500/40 bg-black/60 text-cyan-400 hover:text-cyan-200 hover:border-cyan-400'
            }`}
            title="Open Engy AI Assistant (Malaysian IPTA Engineering Copilot)"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">ENGY AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs font-mono flex items-center space-x-1 transition-all ${
              soundEnabled
                ? 'border-cyan-500/40 bg-black/60 text-cyan-400'
                : 'border-gray-800 bg-black/40 text-gray-600'
            }`}
            title={soundEnabled ? 'Mute Cyber Synthesizer' : 'Enable Cyber Synthesizer'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden md:inline text-[10px]">SYNTH ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-500" />
                <span className="hidden md:inline text-[10px]">MUTED</span>
              </>
            )}
          </button>

          {/* Replay Test Button if in Phase 2 or 3 */}
          {phase !== 1 && (
            <button
              onClick={() => {
                soundEngine.playClick();
                setPhase(1);
              }}
              className="px-3 py-1.5 rounded-xl border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 text-xs font-mono flex items-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RETAKE GAME</span>
            </button>
          )}
        </div>
      </header>

      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 animate-bounce">
          <div className="bg-[#0f0f1b] border border-cyan-400 text-cyan-300 px-4 py-2 rounded-xl text-xs font-mono shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* MAIN VIEW SWITCHER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* PHASE 1: GAME ASSESSMENT */}
        {phase === 1 && (
          <Phase1Game
            onGameComplete={(finalScores, winnerField) => {
              setScores(finalScores);
              setDominantField(winnerField);
              setCurrentField(winnerField);
              setPhase(2);
            }}
            onBypass={quickBypass}
            soundEnabled={soundEnabled}
          />
        )}

        {/* PHASE 2: NEURAL HUD & RADAR */}
        {phase === 2 && (
          <Phase2Analysis
            scores={scores}
            dominantField={dominantField}
            onProceed={(selected) => {
              setCurrentField(selected);
              setPhase(3);
            }}
            onRetake={() => setPhase(1)}
          />
        )}

        {/* PHASE 3: SECTOR DASHBOARD */}
        {phase === 3 && (
          <Phase3Dashboard
            currentField={currentField}
            setCurrentField={setCurrentField}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            communityProjects={communityProjects}
            setCommunityProjects={setCommunityProjects}
            squads={squads}
            setSquads={setSquads}
          />
        )}
      </main>

      {/* ENGY AI ASSISTANT */}
      <CyberTerminal
        currentField={currentField}
        onSwitchField={(f) => setCurrentField(f)}
        scores={scores}
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
      />

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-gray-900/80 bg-black/60 py-6 px-4 text-center text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>ENGI-FORGE // MALAYSIAN IPTA ENGINEERING PLATFORM</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <button onClick={() => setTerminalOpen(true)} className="hover:text-cyan-400 text-cyan-400 flex items-center space-x-1">
              <Bot className="w-3 h-3 text-cyan-400" />
              <span>Engy AI Assistant</span>
            </button>
            <span>•</span>
            <button onClick={() => quickBypass('cs')} className="hover:text-cyan-400">
              AI Hub
            </button>
            <span>•</span>
            <button onClick={() => quickBypass('mech')} className="hover:text-amber-400">
              Robotics
            </button>
            <span>•</span>
            <button onClick={() => quickBypass('elec')} className="hover:text-purple-400">
              Hardware
            </button>
            <span>•</span>
            <button onClick={() => quickBypass('civil')} className="hover:text-emerald-400">
              Infrastructure
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
