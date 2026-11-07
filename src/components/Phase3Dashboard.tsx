import React, { useState } from 'react';
import { 
  BookOpen, Youtube, Rocket, Wrench, Share2, Users, PlusCircle, 
  Search, Filter, ExternalLink, ThumbsUp, Heart, Bookmark, 
  Sparkles, UserPlus, Eye, Clock, CheckCircle2, ChevronRight,
  TrendingUp, Compass, Cpu, Zap, Building 
} from 'lucide-react';
import { 
  FieldKey, StudyNote, CuratedVideo, IndustryProject, DIYProject, 
  CommunityProject, EngineeringSquad 
} from '../types';
import { FIELD_CONFIGS } from '../data/engineeringData';
import { 
  StudyNoteReaderModal, VideoLabModal, IndustrySpecModal, 
  DIYSpecModal, SubmitProjectModal, JoinSquadModal, CreateSquadModal 
} from './Modals';
import { soundEngine } from '../utils/audio';

interface Phase3DashboardProps {
  currentField: FieldKey;
  setCurrentField: (field: FieldKey) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  communityProjects: CommunityProject[];
  setCommunityProjects: React.Dispatch<React.SetStateAction<CommunityProject[]>>;
  squads: EngineeringSquad[];
  setSquads: React.Dispatch<React.SetStateAction<EngineeringSquad[]>>;
}

export function Phase3Dashboard({
  currentField,
  setCurrentField,
  activeTab,
  setActiveTab,
  communityProjects,
  setCommunityProjects,
  squads,
  setSquads
}: Phase3DashboardProps) {
  const field = FIELD_CONFIGS[currentField];

  // Modals state
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<CuratedVideo | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryProject | null>(null);
  const [selectedDIY, setSelectedDIY] = useState<DIYProject | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<EngineeringSquad | null>(null);
  const [showCreateSquadModal, setShowCreateSquadModal] = useState(false);

  // Filters & Search
  const [notesDifficulty, setNotesDifficulty] = useState<string>('all');
  const [noteYearFilter, setNoteYearFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [notesSearch, setNotesSearch] = useState('');
  const [videoYearFilter, setVideoYearFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [videoLabTypeFilter, setVideoLabTypeFilter] = useState<string>('all');
  const [diyTargetYearFilter, setDiyTargetYearFilter] = useState<string>('all');
  const [communityFilter, setCommunityFilter] = useState<string>('all');
  const [communitySearch, setCommunitySearch] = useState('');
  const [onlyRecruiting, setOnlyRecruiting] = useState(false);

  const handleTabChange = (tabId: string) => {
    soundEngine.playClick();
    setActiveTab(tabId);
  };

  const handleFieldChange = (newField: FieldKey) => {
    soundEngine.playWarp();
    setCurrentField(newField);
  };

  const toggleBookmark = (projId: string) => {
    soundEngine.playClick();
    setCommunityProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const toggleLike = (projId: string) => {
    soundEngine.playCatchSound(currentField);
    setCommunityProjects((prev) =>
      prev.map((p) => (p.id === projId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  // Filtered Notes by Year, Difficulty and Search (including courseCode / EAC attributes)
  const filteredNotes = field.notes.filter((note) => {
    const matchesYear = noteYearFilter === 'all' || note.year === noteYearFilter;
    const matchesDiff = notesDifficulty === 'all' || note.difficulty.toLowerCase() === notesDifficulty.toLowerCase();
    const matchesSearch = note.title.toLowerCase().includes(notesSearch.toLowerCase()) || 
                          note.category.toLowerCase().includes(notesSearch.toLowerCase()) ||
                          (note.courseCode && note.courseCode.toLowerCase().includes(notesSearch.toLowerCase())) ||
                          (note.eacOutcome && note.eacOutcome.toLowerCase().includes(notesSearch.toLowerCase()));
    return matchesYear && matchesDiff && matchesSearch;
  });

  // Filtered Curated Videos
  const filteredVideos = field.videos.filter((vid) => {
    const matchesYear = videoYearFilter === 'all' || vid.year === videoYearFilter || vid.year === 'All';
    const matchesLabType = videoLabTypeFilter === 'all' || vid.labType === videoLabTypeFilter;
    return matchesYear && matchesLabType;
  });

  // Filtered DIY Projects
  const filteredDIY = field.diyProjects.filter((diy) => {
    if (diyTargetYearFilter === 'all') return true;
    return diy.targetYear && diy.targetYear.toLowerCase().includes(diyTargetYearFilter.toLowerCase());
  });

  // Filtered Community Projects
  const filteredCommunity = communityProjects.filter((proj) => {
    const matchesField = communityFilter === 'all' || proj.field === communityFilter;
    const matchesRecruiting = !onlyRecruiting || proj.seekingMembers;
    const matchesSearch = proj.title.toLowerCase().includes(communitySearch.toLowerCase()) ||
                          proj.description.toLowerCase().includes(communitySearch.toLowerCase()) ||
                          proj.techStack.some((t) => t.toLowerCase().includes(communitySearch.toLowerCase()));
    return matchesField && matchesRecruiting && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. SECTOR HERO BANNER */}
      <div 
        className="relative rounded-2xl p-6 md:p-8 border overflow-hidden transition-all duration-500 shadow-2xl"
        style={{ 
          backgroundColor: '#0c0c17',
          borderColor: `${field.primaryColor}50`,
          boxShadow: `0 0 50px ${field.primaryColor}15`
        }}
      >
        {/* Ambient colored orb */}
        <div 
          className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full blur-[110px] pointer-events-none opacity-25"
          style={{ backgroundColor: field.primaryColor }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-black flex items-center space-x-1"
                style={{ backgroundColor: field.primaryColor }}
              >
                <span>SECTOR HUB:</span>
                <span>{field.id.toUpperCase()}</span>
              </span>
              <span className="text-xs font-mono text-gray-400">{field.subtitle}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide font-display">
              {field.title}
            </h2>

            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              {field.description}
            </p>
          </div>

          {/* Quick Hub Switcher Capsule */}
          <div className="bg-black/60 border border-gray-800 p-3 rounded-2xl flex flex-col space-y-2 w-full md:w-auto shrink-0 shadow-inner">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">WARP SECTOR:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:flex gap-1.5">
              {(['cs', 'mech', 'elec', 'civil'] as FieldKey[]).map((k) => {
                const isSelected = currentField === k;
                const fInfo = FIELD_CONFIGS[k];
                return (
                  <button
                    key={k}
                    onClick={() => handleFieldChange(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-center space-x-1.5 ${
                      isSelected 
                        ? 'bg-white/10 text-white font-bold border' 
                        : 'text-gray-400 hover:bg-black/40 hover:text-gray-200'
                    }`}
                    style={{ borderColor: isSelected ? fInfo.primaryColor : 'transparent' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fInfo.primaryColor }} />
                    <span>{fInfo.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="border-b border-gray-800 flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-3">
        {[
          { id: 'notes', label: 'Study Notes & Guides', icon: BookOpen, count: field.notes.length },
          { id: 'videos', label: 'YouTube Curated Labs', icon: Youtube, count: field.videos.length },
          { id: 'industry', label: 'Ongoing Industry Specs', icon: Rocket, count: field.industryProjects.length },
          { id: 'diy', label: 'DIY Portfolio Blueprints', icon: Wrench, count: field.diyProjects.length },
          { id: 'community', label: 'Community Showcase', icon: Share2, count: communityProjects.length },
          { id: 'squads', label: 'Find a Squad (Team Up)', icon: Users, count: squads.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-3.5 sm:px-4 rounded-t-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
                isActive 
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20 font-bold' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-gray-800 text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT VIEWS */}
      <div className="min-h-[460px]">
        {/* ==================================================== */}
        {/* TAB 1: STUDY NOTES & GUIDES (MALAYSIAN IPTA YEAR 1 - 4) */}
        {/* ==================================================== */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Malaysian IPTA EAC-BEM Standard Header Banner */}
            <div className="bg-gradient-to-r from-blue-950/40 via-[#0f0f1b] to-purple-950/30 border border-blue-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,120,255,0.15)]">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇲🇾</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-display flex items-center space-x-2">
                    <span>Malaysian Higher Education (IPTA) EAC Engineering Syllabus</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                      Outcome-Based Education (OBE)
                    </span>
                  </h4>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    Curriculum mapped across Universiti Malaya (UM), Universiti Teknologi Malaysia (UTM), USM, UKM, UiTM & UTHM following Washington Accord (WA1 - WA12) graduate attributes.
                  </p>
                </div>
              </div>
            </div>

            {/* Year Selection Filter Pills (Year 1 to Year 4) */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
              {[
                { id: 'all', label: 'All Years (1 - 4)', sub: 'Complete B.Eng / B.Comp' },
                { id: 1, label: 'Year 1: Foundation', sub: 'Eng Math, Statics & Circuits' },
                { id: 2, label: 'Year 2: Core Discipline', sub: 'Thermo, Signals & Data Structures' },
                { id: 3, label: 'Year 3: Specialization', sub: 'Control Systems, FEA & Eurocode' },
                { id: 4, label: 'Year 4: Capstone & FYP', sub: 'IDP, PSM Thesis & BEM Ethics' }
              ].map((yr) => {
                const isSelected = noteYearFilter === yr.id;
                return (
                  <button
                    key={yr.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setNoteYearFilter(yr.id as typeof noteYearFilter);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-left font-mono transition-all shrink-0 border ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'bg-black/50 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-300">{yr.label}</div>
                    <div className="text-[10px] text-gray-400">{yr.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Search and Difficulty Filter Bar */}
            <div className="bg-[#0f0f1b] border border-gray-800 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notes, course codes (e.g. SECP, SKMM, SKEE)..."
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  className="w-full bg-black/60 border border-gray-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end text-xs font-mono">
                <span className="text-gray-400">Difficulty:</span>
                <select
                  value={notesDifficulty}
                  onChange={(e) => setNotesDifficulty(e.target.value)}
                  className="bg-black/80 border border-gray-800 rounded px-2.5 py-1 text-cyan-300 focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner (Yr 1)</option>
                  <option value="intermediate">Intermediate (Yr 2-3)</option>
                  <option value="advanced">Advanced (Yr 3-4)</option>
                </select>
              </div>
            </div>

            {/* Notes Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="bg-[#0f0f1b] border border-cyan-500/25 rounded-2xl p-5 hover:border-cyan-400/70 transition-all group flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(0,243,255,0.18)]"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                          Year {note.year} {note.semester ? `(Sem ${note.semester})` : ''}
                        </span>
                        {note.courseCode && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-200 border border-purple-500/30">
                            🇲🇾 {note.courseCode}
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-gray-300 border border-gray-800">
                          {note.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400 font-bold">{note.difficulty}</span>
                    </div>

                    <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors font-display">
                      {note.title}
                    </h3>

                    {note.eacOutcome && (
                      <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        <strong>EAC/BEM:</strong> {note.eacOutcome}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 line-clamp-3 font-sans leading-relaxed">
                      {note.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono mt-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{note.time}</span>
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedNote(note);
                      }}
                      className="text-cyan-400 hover:text-cyan-200 flex items-center space-x-1 font-bold"
                    >
                      <span>Read Hologram Note</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-mono text-xs">
                No engineering notes match the selected Year ({noteYearFilter}) and difficulty filters.
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: YOUTUBE CURATED LABS */}
        {/* ==================================================== */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* Video Filters Bar */}
            <div className="bg-[#0f0f1b] border border-gray-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Curriculum Year:</span>
                <div className="flex space-x-1">
                  {(['all', 1, 2, 3, 4] as const).map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        soundEngine.playClick();
                        setVideoYearFilter(yr);
                      }}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        videoYearFilter === yr
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-black/60 text-gray-400 hover:text-white'
                      }`}
                    >
                      {yr === 'all' ? 'All Years' : `Yr ${yr}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <span className="text-gray-400">Lab Format:</span>
                <select
                  value={videoLabTypeFilter}
                  onChange={(e) => setVideoLabTypeFilter(e.target.value)}
                  className="bg-black border border-purple-500/30 rounded px-2.5 py-1 text-purple-300 focus:outline-none"
                >
                  <option value="all">All Lab Formats</option>
                  <option value="Virtual Lab">Virtual Lab / Practical</option>
                  <option value="Lecture">University Lecture</option>
                  <option value="Design Workshop">Design Workshop</option>
                  <option value="FYP / Capstone">FYP / Capstone Project</option>
                </select>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((vid) => (
                <div 
                  key={vid.id} 
                  className="bg-[#0f0f1b] border border-purple-500/25 rounded-2xl p-5 hover:border-purple-400 transition-all space-y-4 shadow-lg hover:shadow-[0_0_25px_rgba(176,38,255,0.2)]"
                >
                  <div 
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedVideo(vid);
                    }}
                    className="relative aspect-video bg-black/90 rounded-xl flex items-center justify-center border border-gray-800 group cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                    <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-500/60 flex items-center justify-center group-hover:scale-110 transition-transform relative z-10 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                      <Youtube className="w-8 h-8 text-red-500" />
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 bg-black/90 px-2 py-0.5 rounded text-[10px] font-mono text-gray-300 border border-gray-700">
                      {vid.duration}
                    </span>
                    {vid.year && (
                      <span className="absolute top-2.5 left-2.5 bg-purple-950/90 border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-mono text-purple-200">
                        {vid.year === 'All' ? 'All Years' : `Year ${vid.year}`}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedVideo(vid);
                        }}
                        className="font-bold text-white text-base hover:text-purple-300 cursor-pointer font-display"
                      >
                        {vid.title}
                      </h3>
                      {vid.labType && (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-black/80 border border-purple-500/30 text-purple-300 rounded shrink-0">
                          {vid.labType}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 font-mono">
                      <span className="text-purple-300">{vid.creator}</span>
                      <span>{vid.views} views</span>
                    </div>

                    <p className="text-xs text-gray-400 font-sans line-clamp-2">
                      {vid.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {vid.topics.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-black/60 text-gray-300 border border-gray-800 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-mono text-xs">
                No engineering videos match the selected filters.
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: ONGOING INDUSTRY SPECS */}
        {/* ==================================================== */}
        {activeTab === 'industry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {field.industryProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="bg-[#0f0f1b] border border-emerald-500/25 rounded-2xl p-6 hover:border-emerald-400 transition-all space-y-4 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,102,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">{proj.organization}</span>
                      <h3 className="text-lg font-bold text-white font-display mt-0.5">{proj.title}</h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded font-bold">
                      {proj.status}
                    </span>
                  </div>

                  {proj.malaysianContext && (
                    <div className="p-2.5 bg-blue-950/30 border border-blue-500/30 rounded-lg text-xs font-mono text-cyan-200 flex items-start space-x-2">
                      <span className="text-sm">🇲🇾</span>
                      <span><strong>Malaysia Context:</strong> {proj.malaysianContext}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">{proj.impact}</p>

                  <div className="space-y-1 text-xs font-mono">
                    <span className="text-[10px] text-gray-400 uppercase">Key Milestones:</span>
                    <ul className="space-y-1">
                      {proj.keyMilestones.slice(0, 2).map((m, idx) => (
                        <li key={idx} className="text-[11px] text-gray-300 flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-purple-300">EST. BUDGET: {proj.budget}</span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedIndustry(proj);
                    }}
                    className="text-emerald-400 hover:text-emerald-200 flex items-center space-x-1 font-bold"
                  >
                    <span>Inspect Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: DIY PORTFOLIO BLUEPRINTS */}
        {/* ==================================================== */}
        {activeTab === 'diy' && (
          <div className="space-y-6">
            {/* Target Year Filter */}
            <div className="bg-[#0f0f1b] border border-gray-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs font-mono">
              <span className="text-gray-400">Target Academic Level:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'Year 1', label: 'Year 1 Mini Project' },
                  { id: 'Year 2', label: 'Year 2 Design Lab' },
                  { id: 'Year 3', label: 'Year 3 IDP (Integrated)' },
                  { id: 'Year 4', label: 'Year 4 Capstone / FYP' }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setDiyTargetYearFilter(lvl.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      diyTargetYearFilter === lvl.id
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-black/60 text-gray-400 hover:text-white'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDIY.map((diy) => (
                <div 
                  key={diy.id} 
                  className="bg-[#0f0f1b] border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400 transition-all space-y-4 flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(0,243,255,0.2)]"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-between items-center text-xs font-mono gap-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-cyan-400 font-bold px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/30 rounded">
                          {diy.level}
                        </span>
                        {diy.targetYear && (
                          <span className="text-purple-300 px-2 py-0.5 bg-purple-950/60 border border-purple-500/30 rounded text-[10px]">
                            {diy.targetYear}
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span>{diy.estHours}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">{diy.title}</h3>

                    {diy.iptaAlignment && (
                      <div className="text-[11px] font-mono text-blue-300 bg-blue-950/30 border border-blue-500/20 p-2 rounded-lg">
                        <strong>🇲🇾 IPTA Alignment:</strong> {diy.iptaAlignment}
                      </div>
                    )}

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{diy.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {diy.stack.map((st) => (
                        <span key={st} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-purple-300 border border-purple-500/30">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedDIY(diy);
                    }}
                    className="w-full mt-4 py-2.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>LOAD STEP-BY-STEP SPEC</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: COMMUNITY SHOWCASE PLATFORM */}
        {/* ==================================================== */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            {/* Filter & Action Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0f0f1b] p-4 rounded-xl border border-gray-800">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={communitySearch}
                    onChange={(e) => setCommunitySearch(e.target.value)}
                    className="w-full bg-black/70 border border-gray-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-200 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <Filter className="w-3.5 h-3.5 text-cyan-400" />
                  <select 
                    value={communityFilter} 
                    onChange={(e) => setCommunityFilter(e.target.value)}
                    className="bg-black border border-cyan-500/30 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 focus:outline-none"
                  >
                    <option value="all">All Fields</option>
                    <option value="cs">Computer Science & AI</option>
                    <option value="mech">Mechanical & Robotics</option>
                    <option value="elec">Electrical & Photonic</option>
                    <option value="civil">Civil Infrastructure</option>
                  </select>
                </div>

                <label className="flex items-center space-x-1.5 text-xs font-mono text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyRecruiting}
                    onChange={(e) => setOnlyRecruiting(e.target.checked)}
                    className="accent-purple-500"
                  />
                  <span>Recruiting Only</span>
                </label>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowSubmitModal(true);
                }}
                className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold rounded-lg text-xs hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] flex items-center justify-center space-x-2 shrink-0 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>SHOWCASE YOUR PROJECT</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCommunity.map((proj) => (
                <div 
                  key={proj.id} 
                  className="bg-[#0f0f1b] border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_25px_rgba(176,38,255,0.15)]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">{proj.fieldTitle}</span>
                        <h3 className="text-lg font-bold text-white font-display mt-0.5">{proj.title}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => toggleBookmark(proj.id)}
                          className={`p-1.5 rounded-lg border text-xs ${
                            proj.bookmarked
                              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                              : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                          }`}
                          title="Bookmark project"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button 
                          onClick={() => toggleLike(proj.id)}
                          className="flex items-center space-x-1.5 bg-black/50 border border-purple-500/40 px-2.5 py-1 rounded-full text-xs font-mono text-purple-300 hover:bg-purple-900/40 transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
                          <span>{proj.likes}</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-black/60 text-cyan-300 border border-cyan-500/30 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {proj.seekingMembers && proj.lookingFor && (
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300 flex items-center space-x-2">
                        <UserPlus className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Recruiting: <strong>{proj.lookingFor}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">By: {proj.author}</span>
                    {proj.repoUrl && (
                      <a 
                        href={proj.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center space-x-1"
                      >
                        <span>Inspect Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredCommunity.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-mono text-xs">
                No engineering projects match the active filters.
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: FIND A SQUAD (TEAM UP BOARD) */}
        {/* ==================================================== */}
        {activeTab === 'squads' && (
          <div className="space-y-6">
            <div className="bg-[#0f0f1b] border border-cyan-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white font-display">Engineering Team-Up Board</h3>
                <p className="text-xs text-gray-400 font-sans mt-1">Connect with engineers building cross-disciplinary hardware/software projects.</p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowCreateSquadModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold rounded-lg text-xs hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center space-x-1.5 shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>RECRUIT NEW SQUAD</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {squads.map((squad) => {
                const sField = FIELD_CONFIGS[squad.field] || FIELD_CONFIGS.cs;
                return (
                  <div 
                    key={squad.id} 
                    className="bg-[#0f0f1b] border border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                          {sField.title.split(' ')[0]}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30 rounded">
                          {squad.spotsLeft} SPOTS LEFT
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-base font-display">{squad.title}</h4>
                      
                      <div className="text-[11px] font-mono text-gray-400">
                        Lead: <strong className="text-cyan-300">{squad.lead}</strong>
                      </div>

                      <p className="text-xs text-gray-300 font-sans leading-relaxed">{squad.description}</p>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Roles Needed:</span>
                        <div className="flex flex-wrap gap-1">
                          {squad.membersNeeded.map((role) => (
                            <span key={role} className="text-[10px] font-mono px-2 py-0.5 bg-black/60 text-cyan-300 border border-cyan-500/30 rounded">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedSquad(squad);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold rounded-lg text-xs hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] flex items-center justify-center space-x-1.5 transition-all"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>JOIN SQUAD</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* MODAL POPUPS */}
      {selectedNote && (
        <StudyNoteReaderModal
          note={selectedNote}
          fieldKey={currentField}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {selectedVideo && (
        <VideoLabModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {selectedIndustry && (
        <IndustrySpecModal
          project={selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
        />
      )}

      {selectedDIY && (
        <DIYSpecModal
          project={selectedDIY}
          onClose={() => setSelectedDIY(null)}
        />
      )}

      {showSubmitModal && (
        <SubmitProjectModal
          onClose={() => setShowSubmitModal(false)}
          onSubmit={(pData) => {
            const added: CommunityProject = {
              id: `p_${Date.now()}`,
              title: pData.title,
              author: 'You (Forge Engineer)',
              field: pData.field,
              fieldTitle: FIELD_CONFIGS[pData.field].title,
              likes: 1,
              techStack: pData.techStack.split(',').map((s) => s.trim()),
              description: pData.description,
              repoUrl: pData.repoUrl || 'https://github.com',
              seekingMembers: pData.seekingMembers,
              lookingFor: pData.lookingFor || null,
              bookmarked: false
            };
            setCommunityProjects([added, ...communityProjects]);
            setShowSubmitModal(false);
          }}
        />
      )}

      {selectedSquad && (
        <JoinSquadModal
          squad={selectedSquad}
          onClose={() => setSelectedSquad(null)}
        />
      )}

      {showCreateSquadModal && (
        <CreateSquadModal
          onClose={() => setShowCreateSquadModal(false)}
          onSubmit={(newSquad) => {
            setSquads([newSquad, ...squads]);
          }}
        />
      )}
    </div>
  );
}
