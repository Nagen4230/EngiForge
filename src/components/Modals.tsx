import React, { useState } from 'react';
import { 
  X, CheckCircle2, Copy, Download, ExternalLink, Play, 
  Sparkles, Wrench, FileCode, Check, ShieldCheck, Rocket, 
  Users, Share2, Terminal, BookOpen, Layers
} from 'lucide-react';
import { StudyNote, CuratedVideo, IndustryProject, DIYProject, FieldKey, CommunityProject, EngineeringSquad } from '../types';
import { FIELD_CONFIGS } from '../data/engineeringData';
import { soundEngine } from '../utils/audio';

// ==========================================
// 1. STUDY NOTE READER MODAL
// ==========================================
interface StudyNoteReaderProps {
  note: StudyNote;
  fieldKey: FieldKey;
  onClose: () => void;
}

export function StudyNoteReaderModal({ note, fieldKey, onClose }: StudyNoteReaderProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const field = FIELD_CONFIGS[fieldKey];

  const handleDownload = () => {
    soundEngine.playSuccess();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopyCode = () => {
    if (note.codeSnippet) {
      navigator.clipboard.writeText(note.codeSnippet.code);
      soundEngine.playClick();
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-[#0f0f1b] border rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden"
        style={{ borderColor: `${field.primaryColor}60` }}
      >
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-gray-800 flex items-start justify-between bg-black/40">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                Year {note.year} {note.semester ? `(Sem ${note.semester})` : ''}
              </span>
              {note.courseCode && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-500/30">
                  🇲🇾 IPTA: {note.courseCode}
                </span>
              )}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black border text-cyan-300 border-cyan-500/30">
                {note.category}
              </span>
              <span className="text-[10px] font-mono text-purple-400 font-bold">{note.difficulty}</span>
              <span className="text-[10px] font-mono text-gray-400">• {note.time}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display mt-1">
              {note.title}
            </h3>
            {note.eacOutcome && (
              <div className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>EAC/BEM Washington Accord: <strong>{note.eacOutcome}</strong></span>
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 text-sm text-gray-200">
          {/* Malaysian IPTA Curriculum Note */}
          {note.iptaCurriculumNote && (
            <div className="p-3.5 bg-gradient-to-r from-blue-950/40 to-purple-950/30 border border-blue-500/30 rounded-xl text-xs font-mono text-blue-200 flex items-start space-x-2.5">
              <span className="text-base">🇲🇾</span>
              <div>
                <strong className="text-white block mb-0.5">Malaysian Public Higher Education (IPTA) EAC Guideline:</strong>
                <span className="text-blue-300/90">{note.iptaCurriculumNote}</span>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Technical Summary & Architectural Context</span>
            </h4>
            <p className="leading-relaxed bg-black/40 border border-gray-800/80 p-4 rounded-xl text-gray-300 font-sans">
              {note.overview}
            </p>
          </div>

          {/* Key Equations / Mathematical Foundations */}
          {note.keyFormulas && note.keyFormulas.length > 0 && (
            <div>
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>Governing Equations & Mathematical Laws</span>
              </h4>
              <div className="space-y-2">
                {note.keyFormulas.map((eq, idx) => (
                  <div key={idx} className="bg-black/70 border border-amber-500/30 p-3 rounded-lg font-mono text-xs text-amber-200 overflow-x-auto">
                    <code>{eq}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Concepts */}
          <div>
            <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Core Engineering Pillars</span>
            </h4>
            <ul className="space-y-2">
              {note.coreConcepts.map((concept, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs font-mono bg-purple-950/20 border border-purple-500/20 p-2.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet if applicable */}
          {note.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                  <FileCode className="w-4 h-4" />
                  <span>Reference Implementation ({note.codeSnippet.lang})</span>
                </h4>
                <button
                  onClick={handleCopyCode}
                  className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-[#070710] border border-emerald-500/30 rounded-xl overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
                <code>{note.codeSnippet.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between bg-black/50">
          <div className="text-[11px] font-mono text-gray-400">
            Downloaded by {note.downloads + (downloaded ? 1 : 0)} engineers
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-cyan-950/70 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 font-mono text-xs flex items-center space-x-2 transition-all"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>HOLOGRAPHIC SPEC SAVED</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>EXPORT SPEC SHEET (.PDF)</span>
                </>
              )}
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-700 rounded-lg text-xs font-mono text-gray-300 hover:bg-gray-800"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CURATED VIDEO LAB MODAL
// ==========================================
interface VideoLabProps {
  video: CuratedVideo;
  onClose: () => void;
}

export function VideoLabModal({ video, onClose }: VideoLabProps) {
  const [isPlayingSim, setIsPlayingSim] = useState(true);
  const [progress, setProgress] = useState(35);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1b] border border-purple-500/40 rounded-2xl max-w-2xl w-full flex flex-col shadow-[0_0_40px_rgba(176,38,255,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/40">
          <div>
            <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Curated Engineering Lab</div>
            <h3 className="text-lg font-bold text-white font-display">{video.title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Cyber Video Display */}
        <div className="relative aspect-video bg-black flex flex-col items-center justify-center border-y border-purple-500/20 overflow-hidden group">
          {/* Cyber scanlines overlay */}
          <div className="absolute inset-0 cyber-scanlines pointer-events-none opacity-40" />

          {/* Hologram visualizer graphics */}
          <div className="text-center space-y-3 z-10 p-6">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(176,38,255,0.6)] cursor-pointer" onClick={() => setIsPlayingSim(!isPlayingSim)}>
              {isPlayingSim ? (
                <div className="flex space-x-1 items-center">
                  <span className="w-2 h-6 bg-cyan-300 animate-pulse" />
                  <span className="w-2 h-6 bg-cyan-300 animate-pulse delay-75" />
                </div>
              ) : (
                <Play className="w-8 h-8 text-cyan-300 ml-1" />
              )}
            </div>
            <p className="text-xs font-mono text-cyan-300">
              {isPlayingSim ? 'LAB FEED BROADCASTING // 1080P 60FPS' : 'FEED PAUSED'}
            </p>
          </div>

          {/* Timeline Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center space-x-3 z-20">
            <button onClick={() => setIsPlayingSim(!isPlayingSim)} className="text-white hover:text-cyan-400">
              {isPlayingSim ? <span className="font-mono text-xs">PAUSE</span> : <span className="font-mono text-xs">PLAY</span>}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-gray-700 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-gray-400">{video.duration}</span>
          </div>
        </div>

        {/* Video Info Details */}
        <div className="p-5 space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-3">
            <span>Instructor: <strong className="text-white">{video.creator}</strong></span>
            <span>Audience: <strong className="text-purple-300">{video.views} Views</strong></span>
          </div>

          <p className="text-gray-300 font-sans text-xs leading-relaxed">{video.description}</p>

          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">Lab Topics Covered:</span>
            <div className="flex flex-wrap gap-1.5">
              {video.topics.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-purple-950/50 border border-purple-500/30 rounded text-purple-200">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg font-bold flex items-center space-x-2 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all"
            >
              <span>OPEN FULL LAB ON YOUTUBE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. INDUSTRY PROJECT SPEC MODAL
// ==========================================
interface IndustrySpecProps {
  project: IndustryProject;
  onClose: () => void;
}

export function IndustrySpecModal({ project, onClose }: IndustrySpecProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1b] border border-emerald-500/40 rounded-2xl max-w-2xl w-full flex flex-col shadow-[0_0_40px_rgba(0,255,102,0.2)] overflow-hidden">
        <div className="p-5 border-b border-gray-800 flex items-start justify-between bg-black/40">
          <div>
            <span className="text-[10px] font-mono text-emerald-400">{project.organization}</span>
            <h3 className="text-xl font-bold text-white font-display mt-0.5">{project.title}</h3>
            <div className="flex items-center space-x-3 mt-1 text-[11px] font-mono text-gray-400">
              <span>Status: <strong className="text-emerald-300">{project.status}</strong></span>
              <span>•</span>
              <span>Timeline: {project.timeline}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs font-mono overflow-y-auto max-h-[75vh]">
          {/* Malaysian National Infrastructure Context */}
          {project.malaysianContext && (
            <div className="p-3 bg-gradient-to-r from-blue-950/60 to-emerald-950/40 border border-blue-500/40 rounded-xl text-xs font-mono text-cyan-200 flex items-start space-x-2.5">
              <span className="text-base shrink-0">🇲🇾</span>
              <div>
                <strong className="text-white block mb-0.5">Malaysian Mega-Engineering Sector Context:</strong>
                <span className="text-gray-300 font-sans text-xs">{project.malaysianContext}</span>
              </div>
            </div>
          )}

          {/* Impact Statement */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">Impact & Mission Scope:</span>
            <p className="text-gray-300 font-sans text-xs leading-relaxed">{project.impact}</p>
          </div>

          {/* Budget */}
          <div className="bg-black/40 border border-gray-800 p-3 rounded-lg flex items-center justify-between">
            <span className="text-gray-400">Capital Expenditure Allocation:</span>
            <span className="font-bold text-base text-cyan-300">{project.budget}</span>
          </div>

          {/* Key Milestones */}
          <div>
            <span className="text-[10px] text-purple-400 uppercase tracking-wider block mb-2">Key Engineering Milestones:</span>
            <div className="space-y-2">
              {project.keyMilestones.map((m, idx) => (
                <div key={idx} className="p-2.5 bg-black/50 border border-purple-500/20 rounded-lg flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-2">System Stack:</span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-black/60 border border-cyan-500/30 text-cyan-300 rounded text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 flex justify-end bg-black/40">
          <button onClick={onClose} className="px-5 py-2 bg-emerald-900/40 border border-emerald-500/50 hover:bg-emerald-900 text-emerald-300 font-mono text-xs rounded-lg">
            ACKNOWLEDGE SPEC
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. DIY PORTFOLIO BLUEPRINT MODAL
// ==========================================
interface DIYSpecProps {
  project: DIYProject;
  onClose: () => void;
}

export function DIYSpecModal({ project, onClose }: DIYSpecProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (idx: number) => {
    soundEngine.playClick();
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f0f1b] border border-cyan-500/40 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(0,243,255,0.25)] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-start justify-between bg-black/40">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                {project.level} BLUEPRINT
              </span>
              {project.targetYear && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-500/30 font-bold">
                  {project.targetYear}
                </span>
              )}
              <span className="text-[10px] font-mono text-gray-400">Est. Time: {project.estHours}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-display mt-1">{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 text-xs font-mono">
          {/* IPTA Alignment Callout */}
          {project.iptaAlignment && (
            <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-200 flex items-start space-x-2.5">
              <span className="text-base">🇲🇾</span>
              <div>
                <strong className="text-white block mb-0.5">Malaysian IPTA Accreditation Mapping:</strong>
                <span className="text-purple-300/90">{project.iptaAlignment}</span>
              </div>
            </div>
          )}

          <p className="text-sm font-sans text-gray-300 leading-relaxed bg-black/40 border border-gray-800 p-4 rounded-xl">
            {project.description}
          </p>

          {/* Bill of Materials (BOM) */}
          <div>
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Bill of Materials (BOM Hardware Components)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.components.map((comp, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 p-2.5 rounded-lg text-gray-300 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assembly Phases with Checkboxes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                <Rocket className="w-4 h-4" />
                <span>Step-by-Step Construction Phases</span>
              </h4>
              <span className="text-[10px] text-gray-400">
                {completedSteps.length} of {project.assemblyPhases.length} Completed
              </span>
            </div>

            <div className="space-y-2">
              {project.assemblyPhases.map((phase, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-black/50 border-gray-800 text-gray-300 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                      isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-gray-600 bg-black'
                    }`}>
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs ${isDone ? 'line-through text-gray-400' : ''}`}>
                      {phase}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample Firmware Code */}
          {project.sampleCode && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-purple-400 uppercase tracking-wider">
                  Firmware Sketch: {project.sampleCode.filename}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(project.sampleCode!.code);
                    soundEngine.playClick();
                  }}
                  className="text-[10px] text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </button>
              </div>
              <pre className="p-3 bg-black border border-purple-500/30 rounded-lg text-purple-300 overflow-x-auto text-[11px]">
                <code>{project.sampleCode.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between bg-black/40">
          <span className="text-[11px] text-gray-400">Ready to build into your physical portfolio</span>
          <button onClick={onClose} className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold font-mono text-xs rounded-lg">
            DONE REVIEWING
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SUBMIT PROJECT MODAL COMPONENT
// ==========================================
interface SubmitProjectModalProps {
  onClose: () => void;
  onSubmit: (projectData: {
    title: string;
    field: FieldKey;
    techStack: string;
    description: string;
    repoUrl: string;
    seekingMembers: boolean;
    lookingFor: string;
  }) => void;
}

export function SubmitProjectModal({ onClose, onSubmit }: SubmitProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    field: 'cs' as FieldKey,
    techStack: '',
    description: '',
    repoUrl: '',
    seekingMembers: false,
    lookingFor: ''
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1b] border border-purple-500/40 rounded-2xl p-6 max-w-lg w-full relative shadow-[0_0_35px_rgba(176,38,255,0.25)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-purple-400 font-display">Showcase Your Project</h3>
            <p className="text-xs text-gray-400 font-mono">Publish your engineering build to the community index</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            soundEngine.playSuccess();
            onSubmit(formData);
          }}
          className="space-y-4 text-xs font-mono"
        >
          <div>
            <label className="block text-gray-300 mb-1">Project Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Haptic Drone Flight Controller"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/70 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1">Discipline Sector</label>
              <select
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value as FieldKey })}
                className="w-full bg-black/70 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
              >
                <option value="cs">Computer Science & AI</option>
                <option value="mech">Mechanical & Robotics</option>
                <option value="elec">Electrical & Photonic</option>
                <option value="civil">Civil & Smart Infra</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Repository / Source URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.repoUrl}
                onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                className="w-full bg-black/70 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Tech Stack (comma separated)</label>
            <input
              required
              type="text"
              placeholder="e.g. ROS2, Python, C++, STM32, CAN bus"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full bg-black/70 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Project Description</label>
            <textarea
              required
              rows={3}
              placeholder="Explain the engineering specifications, design tradeoffs, and hardware/software integration..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/70 border border-purple-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="bg-purple-950/30 border border-purple-500/30 p-3 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="seeking"
                checked={formData.seekingMembers}
                onChange={(e) => setFormData({ ...formData, seekingMembers: e.target.checked })}
                className="accent-purple-500"
              />
              <label htmlFor="seeking" className="text-gray-200 font-bold">
                Actively Recruiting Squad Collaborators
              </label>
            </div>
            {formData.seekingMembers && (
              <input
                type="text"
                placeholder="Role needed (e.g. Embedded Firmware Engineer)"
                value={formData.lookingFor}
                onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                className="w-full bg-black/80 border border-purple-500/40 rounded px-2.5 py-1.5 text-xs text-purple-200 focus:outline-none"
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] transition-all"
            >
              TRANSMIT PROJECT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 6. JOIN SQUAD MODAL COMPONENT
// ==========================================
interface JoinSquadModalProps {
  squad: EngineeringSquad;
  onClose: () => void;
}

export function JoinSquadModal({ squad, onClose }: JoinSquadModalProps) {
  const [success, setSuccess] = useState(false);
  const [applicantRole, setApplicantRole] = useState(squad.membersNeeded[0] || 'Engineer');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1b] border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full relative shadow-[0_0_35px_rgba(0,243,255,0.2)]">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 font-display">Join Engineering Squad</h3>
            <p className="text-xs text-gray-300 font-mono mt-0.5">{squad.title}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-black/50 border border-gray-800 p-3 rounded-xl mb-4 space-y-1.5 text-xs font-mono text-gray-300">
          <div><span className="text-purple-400">Squad Lead:</span> {squad.lead}</div>
          <div><span className="text-emerald-400">Spots Left:</span> {squad.spotsLeft} remaining</div>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-mono flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">Application Transmitted!</div>
              <div className="text-[11px] text-emerald-200/80">Squad lead notified via encrypted dispatch. You will hear back shortly.</div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              soundEngine.playSuccess();
              setSuccess(true);
              setTimeout(() => {
                onClose();
              }, 2200);
            }}
            className="space-y-4 text-xs font-mono"
          >
            <div>
              <label className="block text-gray-300 mb-1">Applying for Role</label>
              <select
                value={applicantRole}
                onChange={(e) => setApplicantRole(e.target.value)}
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
              >
                {squad.membersNeeded.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Your Portfolio / GitHub URL</label>
              <input
                required
                type="url"
                placeholder="https://github.com/..."
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Brief Pitch & Relevant Experience</label>
              <textarea
                required
                rows={3}
                placeholder="Briefly state your technical skills and how you will accelerate this squad's mission..."
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] transition-all"
              >
                TRANSMIT APPLICATION
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. CREATE SQUAD RECRUITMENT MODAL
// ==========================================
interface CreateSquadModalProps {
  onClose: () => void;
  onSubmit: (squad: EngineeringSquad) => void;
}

export function CreateSquadModal({ onClose, onSubmit }: CreateSquadModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    lead: '',
    field: 'cs' as FieldKey,
    membersNeeded: '',
    description: '',
    spotsLeft: 2,
    contactEmail: ''
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1b] border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full relative shadow-[0_0_35px_rgba(0,243,255,0.25)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 font-display">Recruit a New Squad</h3>
            <p className="text-xs text-gray-400 font-mono">Assemble your cross-disciplinary engineering taskforce</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            soundEngine.playSuccess();
            onSubmit({
              id: `s_${Date.now()}`,
              title: formData.title,
              lead: formData.lead || 'You (Squad Commander)',
              field: formData.field,
              membersNeeded: formData.membersNeeded.split(',').map((s) => s.trim()),
              description: formData.description,
              spotsLeft: Number(formData.spotsLeft),
              contactEmail: formData.contactEmail
            });
            onClose();
          }}
          className="space-y-4 text-xs font-mono"
        >
          <div>
            <label className="block text-gray-300 mb-1">Squad Mission Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Project Hyper-Sat: CubeSat Low-Earth Imaging"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1">Squad Lead Name / Handle</label>
              <input
                required
                type="text"
                placeholder="e.g. Sarah J. / AeroForge"
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Primary Discipline</label>
              <select
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value as FieldKey })}
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-300 focus:outline-none"
              >
                <option value="cs">Computer Science & AI</option>
                <option value="mech">Mechanical & Robotics</option>
                <option value="elec">Electrical & Photonic</option>
                <option value="civil">Civil Infrastructure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Roles Needed (comma separated)</label>
            <input
              required
              type="text"
              placeholder="e.g. Embedded C Programmer, Flight Dynamics Specialist, PCB Layout Eng"
              value={formData.membersNeeded}
              onChange={(e) => setFormData({ ...formData, membersNeeded: e.target.value })}
              className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 mb-1">Open Spots</label>
              <input
                required
                type="number"
                min="1"
                max="10"
                value={formData.spotsLeft}
                onChange={(e) => setFormData({ ...formData, spotsLeft: Number(e.target.value) })}
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Contact Email / Discord</label>
              <input
                type="text"
                placeholder="squad@domain.io"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Project Mission Statement</label>
            <textarea
              required
              rows={3}
              placeholder="Describe your goals, timeline, and what hardware/software you will construct..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/70 border border-cyan-500/30 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-lg hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] transition-all"
            >
              POST SQUAD RECRUITMENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
