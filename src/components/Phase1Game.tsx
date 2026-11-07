import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, FastForward, Play, Pause, Clock, Sparkles, 
  Trophy, ShieldAlert, Zap, Cpu, Wrench, Building 
} from 'lucide-react';
import { FieldKey } from '../types';
import { soundEngine } from '../utils/audio';

interface Phase1GameProps {
  onGameComplete: (scores: Record<FieldKey, number>, winner: FieldKey) => void;
  onBypass: (fieldKey?: FieldKey) => void;
  soundEnabled: boolean;
}

interface Block {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: FieldKey;
  color: string;
  symbol: string;
  name: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

export function Phase1Game({ onGameComplete, onBypass, soundEnabled }: Phase1GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('engiforge_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [gameScores, setGameScores] = useState<Record<FieldKey, number>>({
    cs: 0,
    mech: 0,
    elec: 0,
    civil: 0
  });

  const stateRef = useRef<{
    scores: Record<FieldKey, number>;
    blocks: Block[];
    particles: Particle[];
    floatingTexts: FloatingText[];
    basketPos: number; // 5 to 95
    basketTargetPos: number;
    isPlaying: boolean;
    isPaused: boolean;
    timeLeft: number;
    combo: number;
    lastCaughtType: FieldKey | null;
  }>({
    scores: { cs: 0, mech: 0, elec: 0, civil: 0 },
    blocks: [],
    particles: [],
    floatingTexts: [],
    basketPos: 50,
    basketTargetPos: 50,
    isPlaying: false,
    isPaused: false,
    timeLeft: 60,
    combo: 0,
    lastCaughtType: null
  });

  const BLOCK_TYPES: { type: FieldKey; color: string; symbol: string; name: string }[] = [
    { type: 'cs', color: '#00f3ff', symbol: 'AI', name: 'Computer Science' },
    { type: 'mech', color: '#ffaa00', symbol: 'GEAR', name: 'Mechanical' },
    { type: 'elec', color: '#b026ff', symbol: 'ZAP', name: 'Electrical' },
    { type: 'civil', color: '#00ff66', symbol: 'GRID', name: 'Civil Eng' }
  ];

  // Start / restart game
  const startGame = () => {
    stateRef.current.scores = { cs: 0, mech: 0, elec: 0, civil: 0 };
    stateRef.current.blocks = [];
    stateRef.current.particles = [];
    stateRef.current.floatingTexts = [];
    stateRef.current.timeLeft = 60;
    stateRef.current.isPlaying = true;
    stateRef.current.isPaused = false;
    stateRef.current.combo = 0;
    stateRef.current.basketPos = 50;
    stateRef.current.basketTargetPos = 50;

    setGameScores({ cs: 0, mech: 0, elec: 0, civil: 0 });
    setTimeLeft(60);
    setIsPlaying(true);
    setIsPaused(false);
    setCombo(0);
    soundEngine.playTone(660, 0.15, 'sine', 0.2);
  };

  const togglePause = () => {
    stateRef.current.isPaused = !stateRef.current.isPaused;
    setIsPaused(stateRef.current.isPaused);
    soundEngine.playClick();
  };

  // Timer tick
  useEffect(() => {
    startGame();
    const timerInterval = setInterval(() => {
      if (stateRef.current.isPlaying && !stateRef.current.isPaused) {
        stateRef.current.timeLeft -= 1;
        setTimeLeft(stateRef.current.timeLeft);

        if (stateRef.current.timeLeft <= 0) {
          stateRef.current.isPlaying = false;
          setIsPlaying(false);
          clearInterval(timerInterval);

          const s = stateRef.current.scores;
          const totalPoints = Object.values(s).reduce((a, b) => a + b, 0);
          if (totalPoints > highScore) {
            setHighScore(totalPoints);
            try {
              localStorage.setItem('engiforge_highscore', totalPoints.toString());
            } catch {
              // ignore
            }
          }

          let winner: FieldKey = 'cs';
          let maxVal = -1;
          (Object.keys(s) as FieldKey[]).forEach((k) => {
            if (s[k] > maxVal) {
              maxVal = s[k];
              winner = k;
            }
          });

          soundEngine.playSuccess();
          onGameComplete(s, winner);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!stateRef.current.isPlaying || stateRef.current.isPaused) return;
      const step = 8;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.basketTargetPos = Math.max(6, stateRef.current.basketTargetPos - step);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.basketTargetPos = Math.min(94, stateRef.current.basketTargetPos + step);
      } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastSpawn = 0;

    const resize = () => {
      if (!canvas) return;
      const parentW = canvas.parentElement?.clientWidth || 0;
      const targetW = parentW > 50 ? parentW : (window.innerWidth ? Math.min(window.innerWidth - 32, 900) : 800);
      if (canvas.width !== targetW) {
        canvas.width = targetW;
      }
      canvas.height = 430;
    };
    resize();

    window.addEventListener('resize', resize);
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    const render = (time: number) => {
      if (!canvas) return;
      if (canvas.width === 0) {
        resize();
        if (canvas.width === 0) return;
      }

      // 1. Dark Cyberpunk Background with Grid
      ctx.fillStyle = '#090914';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber Grid lines
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Smooth lerp basket position
      stateRef.current.basketPos += (stateRef.current.basketTargetPos - stateRef.current.basketPos) * 0.22;

      // Draw Basket Catcher
      const basketW = 100;
      const basketH = 18;
      const basketPixelX = (stateRef.current.basketPos / 100) * canvas.width - basketW / 2;
      const basketY = canvas.height - 40;

      // Basket Thruster Glow
      const thrusterColor = '#00f3ff';
      ctx.shadowBlur = 18;
      ctx.shadowColor = thrusterColor;
      ctx.fillStyle = '#101426';
      ctx.strokeStyle = thrusterColor;
      ctx.lineWidth = 2;

      // Basket body
      ctx.beginPath();
      ctx.roundRect(basketPixelX, basketY, basketW, basketH, 6);
      ctx.fill();
      ctx.stroke();

      // Top Neon Catcher Lip
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(basketPixelX + 4, basketY, basketW - 8, 3);

      // Side wings
      ctx.fillStyle = thrusterColor;
      ctx.fillRect(basketPixelX - 6, basketY + 3, 6, 12);
      ctx.fillRect(basketPixelX + basketW, basketY + 3, 6, 12);
      ctx.shadowBlur = 0;

      // Draw Basket Label
      ctx.fillStyle = '#a5f3fc';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ENGI-CATCHER', basketPixelX + basketW / 2, basketY + basketH / 2 + 1);

      if (stateRef.current.isPlaying && !stateRef.current.isPaused) {
        // Spawn falling blocks
        const spawnInterval = Math.max(380, 520 - (60 - stateRef.current.timeLeft) * 2.5);
        if (time - lastSpawn > spawnInterval) {
          const randomType = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
          stateRef.current.blocks.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: -30,
            size: 34,
            speed: 2.8 + Math.random() * 2.4,
            ...randomType
          });
          lastSpawn = time;
        }

        // Update & Render Blocks
        for (let i = stateRef.current.blocks.length - 1; i >= 0; i--) {
          const b = stateRef.current.blocks[i];
          b.y += b.speed;

          // Draw neon block
          ctx.shadowBlur = 14;
          ctx.shadowColor = b.color;
          ctx.fillStyle = '#0e0e1f';
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.roundRect(b.x - b.size / 2, b.y - b.size / 2, b.size, b.size, 5);
          ctx.fill();
          ctx.stroke();

          // Symbol inside block
          ctx.fillStyle = b.color;
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(b.symbol, b.x, b.y);
          ctx.shadowBlur = 0;

          // Collision detection with basket
          if (
            b.y + b.size / 2 >= basketY &&
            b.y - b.size / 2 <= basketY + basketH &&
            b.x >= basketPixelX - 8 &&
            b.x <= basketPixelX + basketW + 8
          ) {
            // Collision caught!
            stateRef.current.scores[b.type] += 1;
            setGameScores({ ...stateRef.current.scores });

            // Combo logic
            if (stateRef.current.lastCaughtType === b.type) {
              stateRef.current.combo += 1;
            } else {
              stateRef.current.combo = 1;
              stateRef.current.lastCaughtType = b.type;
            }
            setCombo(stateRef.current.combo);

            // Audio feedback
            if (soundEnabled) {
              soundEngine.playCatchSound(b.type);
            }

            // Spawn floating text
            const comboText = stateRef.current.combo > 1 ? `+1 (x${stateRef.current.combo}!)` : '+1';
            stateRef.current.floatingTexts.push({
              x: b.x,
              y: basketY - 10,
              text: comboText,
              color: b.color,
              life: 1.0
            });

            // Trigger particles explosion
            for (let p = 0; p < 14; p++) {
              stateRef.current.particles.push({
                x: b.x,
                y: b.y,
                vx: (Math.random() - 0.5) * 7,
                vy: (Math.random() - 0.8) * 7,
                color: b.color,
                life: 1.0
              });
            }

            stateRef.current.blocks.splice(i, 1);
            continue;
          }

          // Off-screen remove
          if (b.y > canvas.height + 40) {
            stateRef.current.blocks.splice(i, 1);
            // Missed block resets combo
            stateRef.current.combo = 0;
            setCombo(0);
          }
        }

        // Render Particles
        for (let i = stateRef.current.particles.length - 1; i >= 0; i--) {
          const p = stateRef.current.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.035;

          if (p.life <= 0) {
            stateRef.current.particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }

        // Render Floating Texts
        for (let i = stateRef.current.floatingTexts.length - 1; i >= 0; i--) {
          const ft = stateRef.current.floatingTexts[i];
          ft.y -= 1.2;
          ft.life -= 0.025;

          if (ft.life <= 0) {
            stateRef.current.floatingTexts.splice(i, 1);
            continue;
          }

          ctx.fillStyle = ft.color;
          ctx.font = 'bold 13px monospace';
          ctx.textAlign = 'center';
          ctx.globalAlpha = Math.max(0, ft.life);
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.globalAlpha = 1.0;
        }
      } else if (stateRef.current.isPaused) {
        // Paused overlay text
        ctx.fillStyle = 'rgba(7, 7, 12, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00f3ff';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED // SYSTEM ON STANDBY', canvas.width / 2, canvas.height / 2);
        ctx.font = '12px monospace';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('Click Resume or Press SPACE to continue', canvas.width / 2, canvas.height / 2 + 28);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      resizeObserver?.disconnect();
    };
  }, [soundEnabled]);

  // Touch & pointer handling
  const handlePointer = (clientX: number) => {
    if (!canvasRef.current || !stateRef.current.isPlaying || stateRef.current.isPaused) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.max(6, Math.min(94, (relativeX / rect.width) * 100));
    stateRef.current.basketTargetPos = percentage;
  };

  const totalCollected = Object.values(gameScores).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* HEADER HUD */}
      <div className="bg-[#0f0f1a] border border-cyan-500/30 rounded-2xl p-4 md:p-6 shadow-[0_0_25px_rgba(0,243,255,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Phase 1 // Skill Affinity Assessment</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide font-display">
            60-SECOND NEON BLOCK CATCHER
          </h2>
          <p className="text-xs text-gray-400 font-sans max-w-xl">
            Catch falling specialization blocks. Your velocity vector & discipline biases map directly to your engineering destiny.
          </p>
        </div>

        {/* HUD STATS CAPSULE */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          {/* HIGH SCORE */}
          <div className="bg-black/60 px-4 py-2.5 rounded-xl border border-gray-800 flex items-center space-x-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase">HIGH SCORE</div>
              <div className="text-lg font-mono font-bold text-amber-300">{Math.max(highScore, totalCollected)}</div>
            </div>
          </div>

          {/* TIMER */}
          <div className="bg-black/70 px-4 py-2.5 rounded-xl border border-cyan-500/30 flex items-center space-x-3">
            <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase">TIME REMAINING</div>
              <div className={`text-xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-300'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* PAUSE / PLAY */}
          <button
            onClick={togglePause}
            className="p-3 bg-black/60 hover:bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-cyan-300 transition-colors"
            title={isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* CANVAS CONTAINER */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#090914] shadow-[0_0_35px_rgba(0,0,0,0.85)]">
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches && e.touches[0]) {
              handlePointer(e.touches[0].clientX);
            }
          }}
          className="w-full cursor-crosshair touch-none select-none"
        />

        {/* TIME BAR PROGRESS */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-900">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-400 transition-all duration-1000"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>

        {/* CONTROLS OVERLAY INSTRUCTION */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/20 text-cyan-300 flex items-center space-x-2">
            <span>Arrow Keys, A/D or Drag Cursor to Move</span>
          </div>

          {combo > 1 && (
            <div className="bg-purple-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-purple-500 text-purple-300 animate-bounce flex items-center space-x-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>COMBO x{combo}!</span>
            </div>
          )}
        </div>
      </div>

      {/* LIVE SCORES BREAKDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BLOCK_TYPES.map((bt) => {
          const score = gameScores[bt.type];
          return (
            <div 
              key={bt.type} 
              className="bg-[#0f0f1a] border p-3.5 rounded-xl flex items-center justify-between transition-all hover:scale-[1.02]"
              style={{ borderColor: `${bt.color}40`, backgroundColor: `${bt.color}08` }}
            >
              <div className="flex items-center space-x-2.5">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: bt.color }} />
                <div>
                  <div className="text-xs font-mono font-bold text-gray-200">{bt.symbol}</div>
                  <div className="text-[10px] text-gray-400">{bt.name}</div>
                </div>
              </div>
              <span className="text-xl font-mono font-black" style={{ color: bt.color }}>
                {score}
              </span>
            </div>
          );
        })}
      </div>

      {/* ACTION BAR & FAST FORWARD BUTTONS */}
      <div className="bg-[#0f0f1a] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-gray-400">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Need rapid evaluation? Bypass assessment directly to:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onBypass('cs')}
            className="px-2.5 py-1 rounded border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/60 transition-colors"
          >
            AI / Software Hub
          </button>
          <button
            onClick={() => onBypass('mech')}
            className="px-2.5 py-1 rounded border border-amber-500/40 text-amber-300 hover:bg-amber-950/60 transition-colors"
          >
            Robotics Hub
          </button>
          <button
            onClick={() => onBypass('elec')}
            className="px-2.5 py-1 rounded border border-purple-500/40 text-purple-300 hover:bg-purple-950/60 transition-colors"
          >
            Electrical Hub
          </button>
          <button
            onClick={() => onBypass('civil')}
            className="px-2.5 py-1 rounded border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60 transition-colors"
          >
            Civil Hub
          </button>
        </div>
      </div>
    </div>
  );
}
