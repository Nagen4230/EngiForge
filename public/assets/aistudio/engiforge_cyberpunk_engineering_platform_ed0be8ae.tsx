import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, FastForward, Cpu, Zap, Settings, Shield, 
  Terminal, BookOpen, Youtube, Rocket, Wrench, Users, PlusCircle, 
  Search, ExternalLink, Heart, MessageSquare, ThumbsUp, Filter, 
  ChevronRight, Sparkles, CheckCircle2, UserPlus, Layers, Building,
  Activity, ArrowRight, Share2, Award, Clock
} from 'lucide-react';

// ==========================================
// MOCK DATA FOR ENGINEERING FIELDS & CONTENT
// ==========================================

const FIELD_CONFIGS = {
  cs: {
    id: 'cs',
    title: 'Computer Science & AI',
    subtitle: 'Neural Networks, Quantum Computing & Cybernetics',
    icon: 'Cpu',
    primaryColor: '#00f3ff', // Cyan
    secondaryColor: '#b026ff',
    bgGlow: 'rgba(0, 243, 255, 0.15)',
    description: 'Master software engineering, machine learning pipelines, decentralized protocols, and AI system architecture.',
    notes: [
      { id: 'cs1', title: 'Deep Learning Architectures & Transformer Math', category: 'Artificial Intelligence', difficulty: 'Advanced', time: '18 mins read', downloads: 1420 },
      { id: 'cs2', title: 'Distributed Systems & Microservices Blueprint', category: 'Backend Systems', difficulty: 'Intermediate', time: '12 mins read', downloads: 980 },
      { id: 'cs3', title: 'Zero-Knowledge Proofs in Cryptography', category: 'Security', difficulty: 'Advanced', time: '25 mins read', downloads: 650 }
    ],
    videos: [
      { id: 'v_cs1', title: 'Building LLMs from Scratch in C++', creator: 'Andrej Cybernetics', duration: '42:10', views: '128K', url: 'https://youtube.com' },
      { id: 'v_cs2', title: 'Quantum Computing Operating Systems Visualized', creator: 'TechQuantum', duration: '28:45', views: '95K', url: 'https://youtube.com' }
    ],
    industryProjects: [
      { id: 'ip_cs1', title: 'Autonomous Neural Drone Swarm', organization: 'CyberDyn Dynamics', budget: '$4.2M', status: 'In Production', impact: 'Real-time search and rescue operations via edge neural processing.' },
      { id: 'ip_cs2', title: 'Sub-Millisecond Quantum Trading Mesh', organization: 'Nexus Financial AI', budget: '$12M', status: 'Testing Phase', impact: 'Predictive liquidity routing using quantum superposition algorithms.' }
    ],
    diyProjects: [
      { id: 'diy_cs1', title: 'AI-Powered Cyberpunk HUD Overlay', level: 'Intermediate', estHours: '15 hrs', stack: ['React', 'OpenCV', 'TailwindCSS'], description: 'Build a web-cam based face-mesh visualizer with live augmented reality stats overlay.' },
      { id: 'diy_cs2', title: 'Rust-Based Micro-Kernel Engine', level: 'Advanced', estHours: '40 hrs', stack: ['Rust', 'WebAssembly', 'LLVM'], description: 'Construct a lightweight sandbox container runtime optimized for real-time edge processing.' }
    ]
  },
  mech: {
    id: 'mech',
    title: 'Mechanical & Robotics',
    subtitle: 'Kinematics, Mechatronics & Aerodynamics',
    icon: 'Wrench',
    primaryColor: '#ffaa00', // Amber / Gold
    secondaryColor: '#ff3300',
    bgGlow: 'rgba(255, 170, 0, 0.15)',
    description: 'Engineer advanced mechatronic systems, high-speed propulsion, dynamic robotics, and CAD stress simulations.',
    notes: [
      { id: 'm1', title: 'FEA Stress Analysis on Aerospace Turbines', category: 'Materials', difficulty: 'Advanced', time: '20 mins read', downloads: 1100 },
      { id: 'm2', title: 'Inverse Kinematics for 6-DOF Robotic Arms', category: 'Robotics', difficulty: 'Intermediate', time: '15 mins read', downloads: 1850 },
      { id: 'm3', title: 'Fluid Dynamics in High-Speed Hyperloops', category: 'Thermodynamics', difficulty: 'Intermediate', time: '14 mins read', downloads: 890 }
    ],
    videos: [
      { id: 'v_m1', title: 'Designing a 10,000 RPM Brushless Actuator', creator: 'MechForge Labs', duration: '35:20', views: '210K', url: 'https://youtube.com' },
      { id: 'v_m2', title: 'Titanium 3D Printing in Aerospace Structures', creator: 'Material Dynamics', duration: '19:12', views: '78K', url: 'https://youtube.com' }
    ],
    industryProjects: [
      { id: 'ip_m1', title: 'Exoskeleton Power Assist for Orbital Mechanics', organization: 'AeroForge Space', budget: '$18M', status: 'Prototyping', impact: 'Multiplies astronaut load force by 8x while keeping haptic responsiveness.' },
      { id: 'ip_m2', title: 'Hyper-Sonic Scramjet Engine Chamber', organization: 'Apex Propulsion', budget: '$35M', status: 'Wind-Tunnel Phase', impact: 'Mach 7 continuous ignition using regenerative cooling jackets.' }
    ],
    diyProjects: [
      { id: 'diy_m1', title: 'Bipedal Balance Robot using Gyroscope', level: 'Beginner', estHours: '12 hrs', stack: ['Arduino', '3D Printing', 'PID Control'], description: '3D print and program a self-balancing two-wheeled robot with feedback loop stabilization.' },
      { id: 'diy_m2', title: 'Hydraulic Robotic Gripper with Haptics', level: 'Intermediate', estHours: '25 hrs', stack: ['CAD (Onshape)', 'Servos', 'Pressure Sensors'], description: 'Design a micro-hydraulic claw capable of picking up fragile items without crushing.' }
    ]
  },
  elec: {
    id: 'elec',
    title: 'Electrical & Photonic',
    subtitle: 'Embedded Systems, Power Grids & Nanotech',
    icon: 'Zap',
    primaryColor: '#b026ff', // Neon Purple
    secondaryColor: '#00f3ff',
    bgGlow: 'rgba(176, 38, 255, 0.15)',
    description: 'Design high-frequency PCBs, smart energy microgrids, photonic integrated circuits, and embedded firmware.',
    notes: [
      { id: 'e1', title: 'High-Frequency PCB Trace Waveguide Design', category: 'Hardware Engineering', difficulty: 'Advanced', time: '22 mins read', downloads: 1320 },
      { id: 'e2', title: 'Microcontroller Firmware Optimization in C', category: 'Embedded C', difficulty: 'Intermediate', time: '10 mins read', downloads: 2100 },
      { id: 'e3', title: 'Solid-State Battery Management Architecture', category: 'Power Systems', difficulty: 'Intermediate', time: '16 mins read', downloads: 950 }
    ],
    videos: [
      { id: 'v_e1', title: 'Designing 4-Layer High-Speed Impedance PCBs', creator: 'Circuit Wizard', duration: '48:15', views: '310K', url: 'https://youtube.com' },
      { id: 'v_e2', title: 'FPGA Acceleration for Real-time Signal Filter', creator: 'Silicon Hardware', duration: '22:05', views: '64K', url: 'https://youtube.com' }
    ],
    industryProjects: [
      { id: 'ip_e1', title: 'Gigawatt Fusion Reactor Power Inverter', organization: 'PlasmaGrid Corp', budget: '$50M', status: 'Commissioning', impact: 'Converts pulsed magnetohydrodynamic output directly to stable AC grid power.' },
      { id: 'ip_e2', title: 'Photonic Optical Transceiver Bus', organization: 'SubLight Nano', budget: '$8.5M', status: 'Active Trial', impact: 'Achieves 100 Terabits/sec interconnect speeds with sub-picojoule efficiency.' }
    ],
    diyProjects: [
      { id: 'diy_e1', title: 'Custom ESP32 Cyber-Deck Terminal', level: 'Intermediate', estHours: '18 hrs', stack: ['ESP32', 'KiCAD', 'SPI TFT Display'], description: 'Layout a custom PCB motherboard for an ultra-portable wrist-mounted cyberdeck.' },
      { id: 'diy_e2', title: 'Wireless Power Transfer Pad for Drones', level: 'Advanced', estHours: '30 hrs', stack: ['Inductive Coils', 'MOSFET Inverter', 'PWM'], description: 'Build an inductive resonant wireless charging pad that recharges landing drones autonomously.' }
    ]
  },
  civil: {
    id: 'civil',
    title: 'Civil & Smart Infrastructure',
    subtitle: 'Megastructures, Geo-Tech & Cyber-Cities',
    icon: 'Building',
    primaryColor: '#00ff66', // Emerald Green / Cyber Green
    secondaryColor: '#00f3ff',
    bgGlow: 'rgba(0, 255, 102, 0.15)',
    description: 'Construct resilient climate-defying skyscrapers, automated traffic grids, carbon-negative concrete, and mega-bridges.',
    notes: [
      { id: 'c1', title: 'Seismic Isolation Damping in 100-Story Structures', category: 'Structural', difficulty: 'Advanced', time: '25 mins read', downloads: 880 },
      { id: 'c2', title: 'Carbon Capture Concrete Formulations', category: 'Materials', difficulty: 'Intermediate', time: '14 mins read', downloads: 1400 },
      { id: 'c3', title: 'Autonomous Transit Routing in Smart Metropolises', category: 'Urban Design', difficulty: 'Beginner', time: '11 mins read', downloads: 1750 }
    ],
    videos: [
      { id: 'v_c1', title: 'How Tuned Mass Dampers Stop Skyscrapers from Swaying', creator: 'Civil Engineering Pulse', duration: '18:40', views: '540K', url: 'https://youtube.com' },
      { id: 'v_c2', title: 'Underground Floating Tunnel Logistics', creator: 'MegaInfrastructures', duration: '31:10', views: '112K', url: 'https://youtube.com' }
    ],
    industryProjects: [
      { id: 'ip_c1', title: 'Sub-Oceanic Habitat & Geo-Thermal Grid', organization: 'Oceanus Structural', budget: '$120M', status: 'Blueprint Phase', impact: 'Self-sustaining modular marine living hubs powered by seabed thermal vents.' },
      { id: 'ip_c2', title: 'Vertical Forest Sky Tower with Smart Irrigation', organization: 'EcoArc Global', budget: '$45M', status: 'Under Construction', impact: 'Absorbs 400 metric tons of carbon annually while filtering urban heat.' }
    ],
    diyProjects: [
      { id: 'diy_c1', title: 'Smart Structural Strain Monitoring Node', level: 'Beginner', estHours: '10 hrs', stack: ['Strain Gauges', 'Arduino', 'MQTT Dashboard'], description: 'Attach strain sensors to small bridge models to log deformation load stress live.' },
      { id: 'diy_c2', title: 'Generative Structural Design in Grasshopper/CAD', level: 'Intermediate', estHours: '20 hrs', stack: ['Rhino 3D', 'Grasshopper', 'FEA Plugin'], description: 'Script algorithmic structural trusses that minimize material weight while maximizing load capacity.' }
    ]
  }
};

const SAMPLE_COMMUNITY_PROJECTS = [
  {
    id: 'p1',
    title: 'NeonPulse - Wearable ECG Haptic Feedback Rig',
    author: 'Alex Chen',
    field: 'elec',
    fieldTitle: 'Electrical & Photonic',
    likes: 42,
    techStack: ['KiCAD', 'ESP32', 'BLE', 'FastLED'],
    description: 'An open-source biometric sleeve that translates real-time pulse rate into dynamic dynamic neon LED pulses and micro-vibration haptics.',
    repoUrl: 'https://github.com',
    seekingMembers: true,
    lookingFor: 'C++ Firmware Dev & 3D Enclosure Designer'
  },
  {
    id: 'p2',
    title: 'AeroGlide Self-Navigating Delivery Drone',
    author: 'Sarah Jenkins',
    field: 'mech',
    fieldTitle: 'Mechanical & Robotics',
    likes: 68,
    techStack: ['PX4 Autopilot', 'Carbon Fiber', 'ROS2', 'SolidWorks'],
    description: 'A quadcopter platform with tilt-rotor forward transition capable of 45-minute continuous flight and LIDAR collision avoidance.',
    repoUrl: 'https://github.com',
    seekingMembers: false,
    lookingFor: null
  },
  {
    id: 'p3',
    title: 'NeuralArchitect - AI Structural CAD Optimizer',
    author: 'Devon Vance',
    field: 'cs',
    fieldTitle: 'Computer Science & AI',
    likes: 115,
    techStack: ['Python', 'PyTorch', 'Three.js', 'FastAPI'],
    description: 'Web application that takes 2D room layouts and generates fully compliant 3D structural beam skeletons optimized for 3D concrete printing.',
    repoUrl: 'https://github.com',
    seekingMembers: true,
    lookingFor: 'Frontend React/Three.js Engineer'
  }
];

const INITIAL_SQUADS = [
  {
    id: 's1',
    title: 'Project Cyber-Rover: Autonomous Mars Simulation Vehicle',
    lead: 'Dr. Marcus Vance',
    field: 'mech',
    membersNeeded: ['Computer Vision Specialist', 'Motor Driver Electronics Eng'],
    description: 'We are assembling a remote team to build a 1/4 scale planetary rover with rocker-bogie suspension for the upcoming RoboChallenge.',
    spotsLeft: 2
  },
  {
    id: 's2',
    title: 'Bio-Grid Energy Monitoring Firmware',
    lead: 'Elena Rostova',
    field: 'elec',
    membersNeeded: ['Rust/Embedded Firmware Dev', 'UI/UX Visualizer'],
    description: 'Designing an ultra-low power wireless mesh network node to track urban solar grid efficiency in micro-neighborhoods.',
    spotsLeft: 1
  },
  {
    id: 's3',
    title: 'Generative Carbon-Bust Tower Design',
    lead: 'Tariq Al-Mansoor',
    field: 'civil',
    membersNeeded: ['Grasshopper/Parametric Specialist', 'Environmental Structural Eng'],
    description: 'Developing open parametric models for modular skyscraper facades that maximize airflow velocity for integrated micro-turbines.',
    spotsLeft: 3
  }
];

export default function App() {
  // App Phase State: 1 = MiniGame, 2 = HUD Analysis, 3 = Main Hub Engine
  const [phase, setPhase] = useState(1);
  
  // Game Scores and Timer
  const [scores, setScores] = useState({ cs: 0, mech: 0, elec: 0, civil: 0 });
  const [dominantField, setDominantField] = useState('cs');
  
  // Active Selected Field for Main Hub (defaulted to dominant field after analysis)
  const [currentField, setCurrentField] = useState('cs');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'videos', 'industry', 'diy', 'community', 'squads'
  
  // Community Projects State
  const [communityProjects, setCommunityProjects] = useState(SAMPLE_COMMUNITY_PROJECTS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', field: 'cs', techStack: '', description: '', repoUrl: '', seekingMembers: false, lookingFor: '' });
  const [filterField, setFilterField] = useState('all');
  
  // Squads State
  const [squads, setSquads] = useState(INITIAL_SQUADS);
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinSuccessMsg, setJoinSuccessMsg] = useState('');

  // Audio simulation state toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Quick helper to jump straight to field hub for rapid user testing
  const quickBypassGame = (fieldKey = 'cs') => {
    setScores({ cs: 15, mech: 8, elec: 10, civil: 5 });
    setDominantField(fieldKey);
    setCurrentField(fieldKey);
    setPhase(3);
  };

  return (
    <div className="min-h-screen bg-[#07070c] text-gray-100 font-sans selection:bg-[#00f3ff] selection:text-black relative overflow-x-hidden">
      {/* BACKGROUND NEON GRID & GLOW EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#00f3ff 1px, transparent 1px), radial-gradient(#b026ff 1px, #07070c 1px)`,
            backgroundSize: `40px 40px`,
            backgroundPosition: `0 0, 20px 20px`
          }}
        />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f3ff] rounded-full blur-[140px] opacity-15"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#b026ff] rounded-full blur-[160px] opacity-15"></div>
      </div>

      {/* TOP CYBER NAVIGATION BAR */}
      <header className="relative z-20 border-b border-cyan-500/20 bg-[#0a0a12]/80 backdrop-blur-md sticky top-0 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPhase(1)}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
            <Terminal className="w-6 h-6 text-black font-bold" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              ENGI<span className="text-white font-mono">FORGE</span>
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase">Cybernetic Engineering Portal</p>
          </div>
        </div>

        {/* FIELD SELECTOR CAPSULES (Only active in Phase 3) */}
        {phase === 3 && (
          <div className="hidden md:flex items-center space-x-2 bg-black/40 border border-cyan-500/30 p-1 rounded-full">
            {Object.keys(FIELD_CONFIGS).map((key) => {
              const field = FIELD_CONFIGS[key];
              const isSelected = currentField === key;
              return (
                <button
                  key={key}
                  onClick={() => setCurrentField(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 flex items-center space-x-1.5 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black shadow-[0_0_12px_rgba(0,243,255,0.5)] font-bold' 
                      : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-950/40'
                  }`}
                >
                  <span>{field.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg border border-cyan-500/30 bg-black/40 hover:border-cyan-400 text-cyan-400 transition-colors text-xs font-mono flex items-center space-x-1"
            title="Toggle Cyber Sound Synth"
          >
            <Activity className={`w-4 h-4 ${soundEnabled ? 'text-cyan-400 animate-pulse' : 'text-gray-600'}`} />
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {phase !== 1 && (
            <button
              onClick={() => setPhase(1)}
              className="px-3 py-1.5 rounded-lg border border-purple-500/50 bg-purple-950/30 hover:bg-purple-900/50 text-purple-300 text-xs font-mono flex items-center space-x-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPLAY GAME</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER CONTENT SWITCHER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {phase === 1 && (
          <Phase1Game 
            onGameComplete={(finalScores, winnerField) => {
              setScores(finalScores);
              setDominantField(winnerField);
              setCurrentField(winnerField);
              setPhase(2);
            }} 
            onBypass={quickBypassGame}
          />
        )}

        {phase === 2 && (
          <Phase2Analysis 
            scores={scores} 
            dominantField={dominantField} 
            onProceed={() => setPhase(3)} 
          />
        )}

        {phase === 3 && (
          <Phase3Dashboard 
            currentField={currentField}
            setCurrentField={setCurrentField}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            communityProjects={communityProjects}
            setCommunityProjects={setCommunityProjects}
            setShowSubmitModal={setShowSubmitModal}
            filterField={filterField}
            setFilterField={setFilterField}
            squads={squads}
            setSelectedSquad={setSelectedSquad}
            setJoinModalOpen={setJoinModalOpen}
          />
        )}
      </main>

      {/* SUBMIT PROJECT MODAL */}
      {showSubmitModal && (
        <SubmitProjectModal 
          onClose={() => setShowSubmitModal(false)}
          onSubmit={(projectData) => {
            setCommunityProjects([
              {
                id: `p_${Date.now()}`,
                title: projectData.title,
                author: 'You (Forge Engineer)',
                field: projectData.field,
                fieldTitle: FIELD_CONFIGS[projectData.field].title,
                likes: 1,
                techStack: projectData.techStack.split(',').map(s => s.trim()),
                description: projectData.description,
                repoUrl: projectData.repoUrl || 'https://github.com',
                seekingMembers: projectData.seekingMembers,
                lookingFor: projectData.lookingFor
              },
              ...communityProjects
            ]);
            setShowSubmitModal(false);
          }}
        />
      )}

      {/* JOIN SQUAD MODAL */}
      {joinModalOpen && selectedSquad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f0f1a] border border-cyan-500/40 rounded-xl p-6 max-w-lg w-full relative shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            <h3 className="text-xl font-bold text-cyan-400 font-mono mb-2">Join Engineering Squad</h3>
            <p className="text-sm text-gray-300 font-sans mb-4">{selectedSquad.title}</p>
            
            <div className="bg-black/40 border border-gray-800 p-3 rounded-lg mb-4 space-y-2 text-xs font-mono text-gray-300">
              <div><span className="text-purple-400">Squad Lead:</span> {selectedSquad.lead}</div>
              <div><span className="text-purple-400">Open Roles Needed:</span> {selectedSquad.membersNeeded.join(', ')}</div>
            </div>

            {joinSuccessMsg ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-300 rounded-lg text-sm font-mono flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{joinSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setJoinSuccessMsg('Application Transmitted! Squad Lead notified.');
                setTimeout(() => {
                  setJoinSuccessMsg('');
                  setJoinModalOpen(false);
                }, 2000);
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1">Your Portfolio / GitHub Link</label>
                  <input required type="url" placeholder="https://github.com/yourhandle" className="w-full bg-black/60 border border-cyan-500/30 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1">Brief Pitch / Relevant Skills</label>
                  <textarea required rows={3} placeholder="Explain how your expertise matches this project..." className="w-full bg-black/60 border border-cyan-500/30 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-400"></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setJoinModalOpen(false)} className="px-4 py-2 border border-gray-700 rounded text-xs font-mono text-gray-400 hover:text-white">CANCEL</button>
                  <button type="submit" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold font-mono rounded text-xs hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">TRANSMIT REQUEST</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// PHASE 1: 60-SECOND BLOCK CATCHER CANVAS GAME
// ==========================================

function Phase1Game({ onGameComplete, onBypass }) {
  const canvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameScores, setGameScores] = useState({ cs: 0, mech: 0, elec: 0, civil: 0 });
  const [basketX, setBasketX] = useState(50); // percentage 0-100

  const stateRef = useRef({
    scores: { cs: 0, mech: 0, elec: 0, civil: 0 },
    blocks: [],
    particles: [],
    basketPos: 50,
    isPlaying: false,
    timeLeft: 60
  });

  // Block definitions with cyberpunk aesthetics
  const BLOCK_TYPES = [
    { type: 'cs', color: '#00f3ff', symbol: 'AI', name: 'Computer Science' },
    { type: 'mech', color: '#ffaa00', symbol: 'GEAR', name: 'Mechanical' },
    { type: 'elec', color: '#b026ff', symbol: 'ZAP', name: 'Electrical' },
    { type: 'civil', color: '#00ff66', symbol: 'GRID', name: 'Civil Eng' }
  ];

  // Start mini game automatically
  const startGame = () => {
    stateRef.current.scores = { cs: 0, mech: 0, elec: 0, civil: 0 };
    stateRef.current.blocks = [];
    stateRef.current.particles = [];
    stateRef.current.timeLeft = 60;
    stateRef.current.isPlaying = true;
    
    setGameScores({ cs: 0, mech: 0, elec: 0, civil: 0 });
    setTimeLeft(60);
    setIsPlaying(true);
  };

  useEffect(() => {
    startGame();
    const timerInterval = setInterval(() => {
      if (stateRef.current.isPlaying) {
        stateRef.current.timeLeft -= 1;
        setTimeLeft(stateRef.current.timeLeft);

        if (stateRef.current.timeLeft <= 0) {
          stateRef.current.isPlaying = false;
          setIsPlaying(false);
          clearInterval(timerInterval);

          // Calculate winner
          const s = stateRef.current.scores;
          let winner = 'cs';
          let maxVal = -1;
          Object.keys(s).forEach(k => {
            if (s[k] > maxVal) {
              maxVal = s[k];
              winner = k;
            }
          });

          onGameComplete(s, winner);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!stateRef.current.isPlaying) return;
      if (e.key === 'ArrowLeft') {
        stateRef.current.basketPos = Math.max(5, stateRef.current.basketPos - 7);
        setBasketX(stateRef.current.basketPos);
      } else if (e.key === 'ArrowRight') {
        stateRef.current.basketPos = Math.min(95, stateRef.current.basketPos + 7);
        setBasketX(stateRef.current.basketPos);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Canvas Game Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 420;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastSpawn = 0;

    const render = (time) => {
      if (canvas.width === 0) return;
      
      // Clear background
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render cyberpunk baseline grid
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      if (stateRef.current.isPlaying) {
        // Spawn falling blocks periodically
        if (time - lastSpawn > 500) {
          const randomType = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
          stateRef.current.blocks.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: -30,
            size: 32,
            speed: 2.5 + Math.random() * 2.5,
            ...randomType
          });
          lastSpawn = time;
        }

        // Draw Basket Catcher
        const basketW = 90;
        const basketH = 16;
        const basketPixelX = (stateRef.current.basketPos / 100) * canvas.width - basketW / 2;
        const basketY = canvas.height - 35;

        // Glow effect for basket
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f3ff';
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(basketPixelX, basketY, basketW, basketH);
        
        // Neon top border line
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(basketPixelX - 5, basketY - 2, basketW + 10, 4);
        ctx.shadowBlur = 0; // Reset glow

        // Update and draw blocks
        for (let i = stateRef.current.blocks.length - 1; i >= 0; i--) {
          const b = stateRef.current.blocks[i];
          b.y += b.speed;

          // Draw neon block
          ctx.shadowBlur = 12;
          ctx.shadowColor = b.color;
          ctx.fillStyle = '#0f0f1d';
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 2;
          ctx.fillRect(b.x - b.size / 2, b.y - b.size / 2, b.size, b.size);
          ctx.strokeRect(b.x - b.size / 2, b.y - b.size / 2, b.size, b.size);

          // Draw symbol inside block
          ctx.fillStyle = b.color;
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(b.symbol, b.x, b.y);
          ctx.shadowBlur = 0;

          // Collision detection with basket
          if (
            b.y + b.size / 2 >= basketY &&
            b.y - b.size / 2 <= basketY + basketH &&
            b.x >= basketPixelX - 10 &&
            b.x <= basketPixelX + basketW + 10
          ) {
            // Collision!
            stateRef.current.scores[b.type] += 1;
            setGameScores({ ...stateRef.current.scores });

            // Trigger particles explosion
            for (let p = 0; p < 12; p++) {
              stateRef.current.particles.push({
                x: b.x,
                y: b.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.8) * 6,
                color: b.color,
                life: 1.0
              });
            }

            // Remove block
            stateRef.current.blocks.splice(i, 1);
            continue;
          }

          // Remove off-screen blocks
          if (b.y > canvas.height + 40) {
            stateRef.current.blocks.splice(i, 1);
          }
        }

        // Render Particles
        for (let i = stateRef.current.particles.length - 1; i >= 0; i--) {
          const p = stateRef.current.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.04;

          if (p.life <= 0) {
            stateRef.current.particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Handle touch / mouse movement over canvas
  const handlePointerMove = (e) => {
    if (!canvasRef.current || !stateRef.current.isPlaying) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (relativeX / rect.width) * 100));
    stateRef.current.basketPos = percentage;
    setBasketX(percentage);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER BAR */}
      <div className="bg-[#0f0f1a] border border-cyan-500/30 rounded-2xl p-4 md:p-6 shadow-[0_0_25px_rgba(0,243,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Phase 1 // Skill Affinity Assessment</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">60-SECOND NEON BLOCK CATCHER</h2>
          <p className="text-xs text-gray-400 mt-1">
            Collect falling energy matrix blocks. The system will analyze your velocity bias to auto-assign your engineering specialization.
          </p>
        </div>

        {/* TIMER HUD */}
        <div className="flex items-center space-x-4 bg-black/60 px-5 py-3 rounded-xl border border-purple-500/30">
          <Clock className="w-6 h-6 text-purple-400 animate-spin" />
          <div>
            <div className="text-[10px] font-mono text-gray-400">TIME REMAINING</div>
            <div className="text-2xl font-mono font-bold text-cyan-300">{timeLeft}s</div>
          </div>
        </div>
      </div>

      {/* CANVAS & INTERACTIVE HUD */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#0a0a14] shadow-[0_0_35px_rgba(0,0,0,0.8)]">
        <canvas
          ref={canvasRef}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          className="w-full cursor-crosshair touch-none"
        />

        {/* CONTROLS INSTRUCTION OVERLAY */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/20 text-[11px] font-mono text-cyan-300 flex items-center space-x-2">
          <span>Use ARROW KEYS or DRAG MOUSE to Move Catcher</span>
        </div>
      </div>

      {/* LIVE SCORES BREAKDOWN GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BLOCK_TYPES.map((bt) => (
          <div 
            key={bt.type} 
            className="bg-[#0f0f1a] border p-3 rounded-xl flex items-center justify-between transition-all"
            style={{ borderColor: `${bt.color}40` }}
          >
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: bt.color }}></span>
              <span className="text-xs font-mono font-bold text-gray-300">{bt.symbol}</span>
            </div>
            <span className="text-lg font-mono font-black" style={{ color: bt.color }}>
              {gameScores[bt.type]}
            </span>
          </div>
        ))}
      </div>

      {/* QUICK SKIP OPTION FOR DEMO/TESTING */}
      <div className="flex justify-between items-center text-xs font-mono text-gray-500 pt-2">
        <span>EngiForge Neural Scanner v3.1</span>
        <button
          onClick={() => onBypass('cs')}
          className="text-purple-400 hover:text-cyan-300 underline flex items-center space-x-1"
        >
          <span>Fast-forward analysis (Skip Game)</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// PHASE 2: AI FIELD ANALYSIS HUD & RADAR
// ==========================================

function Phase2Analysis({ scores, dominantField, onProceed }) {
  const fieldInfo = FIELD_CONFIGS[dominantField];
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const totalScore = Math.max(1, Object.values(scores).reduce((a, b) => a + b, 0));

  return (
    <div className="max-w-3xl mx-auto space-y-6 my-8">
      <div className="bg-[#0f0f1a] border border-cyan-500/50 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,243,255,0.2)]">
        
        {/* HUD TOP SCANNER LINE */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 animate-pulse"></div>

        {analyzing ? (
          <div className="py-16 text-center space-y-4">
            <Sparkles className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
            <h3 className="text-xl font-mono font-bold text-cyan-300">SYNTHESIZING NEURAL BLOCK DATA...</h3>
            <p className="text-xs font-mono text-gray-400">Mapping collection vector bias against engineering discipline matrix</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">ANALYSIS COMPLETE // AFFINITY MATCH FOUND</span>
                <h2 className="text-3xl font-black text-white mt-1" style={{ color: fieldInfo.primaryColor }}>
                  {fieldInfo.title}
                </h2>
              </div>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${fieldInfo.primaryColor}20`, border: `2px solid ${fieldInfo.primaryColor}` }}
              >
                <Cpu className="w-8 h-8" style={{ color: fieldInfo.primaryColor }} />
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              {fieldInfo.description}
            </p>

            {/* BAR CHART BREAKDOWN */}
            <div className="space-y-3 bg-black/40 border border-gray-800 p-4 rounded-xl font-mono">
              <span className="text-xs text-gray-400 uppercase">Affinity Distribution Metrics:</span>
              {Object.keys(FIELD_CONFIGS).map((key) => {
                const item = FIELD_CONFIGS[key];
                const score = scores[key] || 0;
                const percentage = Math.round((score / totalScore) * 100);
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{item.title}</span>
                      <span style={{ color: item.primaryColor }}>{score} pts ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.max(5, percentage)}%`,
                          backgroundColor: item.primaryColor
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ACTION PROMPT BUTTON */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={onProceed}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono font-bold text-black flex items-center justify-center space-x-2 transition-all shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: fieldInfo.primaryColor,
                  boxShadow: `0 0 20px ${fieldInfo.primaryColor}80`
                }}
              >
                <span>ENTER {fieldInfo.title.toUpperCase()} HUB</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// PHASE 3 & 4: MAIN FIELD DASHBOARD & COMMUNITY PLATFORM
// ==========================================

function Phase3Dashboard({ 
  currentField, 
  setCurrentField, 
  activeTab, 
  setActiveTab, 
  communityProjects, 
  setShowSubmitModal,
  filterField,
  setFilterField,
  squads,
  setSelectedSquad,
  setJoinModalOpen
}) {
  const field = FIELD_CONFIGS[currentField];

  return (
    <div className="space-y-8">
      {/* DYNAMIC FIELD HEADER BANNER */}
      <div 
        className="relative rounded-2xl p-6 md:p-8 border overflow-hidden transition-all duration-500 shadow-2xl"
        style={{ 
          backgroundColor: '#0d0d18',
          borderColor: `${field.primaryColor}40`,
          boxShadow: `0 0 40px ${field.primaryColor}15`
        }}
      >
        <div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: field.primaryColor }}
        ></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider text-black" style={{ backgroundColor: field.primaryColor }}>
                ACTIVE SECTOR
              </span>
              <span className="text-xs font-mono text-gray-400">{field.subtitle}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-wide">
              {field.title}
            </h2>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              {field.description}
            </p>
          </div>

          {/* QUICK FIELD SWITCH DROPDOWN FOR MOBILE/DESKTOP */}
          <div className="bg-black/50 border border-gray-800 p-3 rounded-xl flex flex-col space-y-2 w-full md:w-auto">
            <span className="text-[10px] font-mono text-gray-400">SWITCH SECTOR HUB:</span>
            <div className="grid grid-cols-2 md:flex gap-1.5">
              {Object.keys(FIELD_CONFIGS).map((k) => (
                <button
                  key={k}
                  onClick={() => setCurrentField(k)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    currentField === k 
                      ? 'bg-white/10 text-white font-bold border border-cyan-400' 
                      : 'text-gray-400 hover:bg-black/40'
                  }`}
                >
                  {FIELD_CONFIGS[k].title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="border-b border-gray-800 flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-4">
        {[
          { id: 'notes', label: 'Study Notes & Guides', icon: BookOpen },
          { id: 'videos', label: 'YouTube Curated Labs', icon: Youtube },
          { id: 'industry', label: 'Ongoing Industry Specs', icon: Rocket },
          { id: 'diy', label: 'DIY Portfolio Projects', icon: Wrench },
          { id: 'community', label: 'Community Showcase', icon: Share2 },
          { id: 'squads', label: 'Find a Squad (Team Up)', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 rounded-t-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
                isActive 
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' 
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div className="min-h-[400px]">
        {/* 1. STUDY NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {field.notes.map((note) => (
              <div key={note.id} className="bg-[#0f0f1a] border border-cyan-500/20 rounded-xl p-5 hover:border-cyan-400/50 transition-all group flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {note.category}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400">{note.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {note.title}
                  </h3>
                </div>
                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-mono mt-4">
                  <span>{note.time}</span>
                  <a href="#download" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:underline flex items-center space-x-1">
                    <span>View Note</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. YOUTUBE LABS TAB */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {field.videos.map((vid) => (
              <div key={vid.id} className="bg-[#0f0f1a] border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/50 transition-all space-y-4">
                <div className="relative aspect-video bg-black/80 rounded-lg flex items-center justify-center border border-gray-800 group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <Youtube className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-gray-300">
                    {vid.duration}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base">{vid.title}</h3>
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>{vid.creator}</span>
                    <span>{vid.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. ONGOING INDUSTRY SPECS TAB */}
        {activeTab === 'industry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {field.industryProjects.map((proj) => (
              <div key={proj.id} className="bg-[#0f0f1a] border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400">{proj.organization}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{proj.title}</h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded">
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{proj.impact}</p>
                <div className="text-xs font-mono text-purple-400 pt-2 border-t border-gray-800">
                  EST. BUDGET ALLOCATION: {proj.budget}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. DIY PORTFOLIO BLUEPRINTS TAB */}
        {activeTab === 'diy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {field.diyProjects.map((diy) => (
              <div key={diy.id} className="bg-[#0f0f1a] border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-cyan-400 font-bold">{diy.level} Blueprint</span>
                    <span className="text-gray-400">{diy.estHours}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{diy.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{diy.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {diy.stack.map((st) => (
                      <span key={st} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-purple-300 border border-purple-500/30">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Starting Portfolio Blueprint: ${diy.title}`)}
                  className="w-full mt-4 py-2 rounded.lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>LOAD STEP-BY-STEP SPEC</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 5. COMMUNITY SHOWCASE PLATFORM */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0f0f1a] p-4 rounded-xl border border-gray-800">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-gray-300">Filter Field:</span>
                <select 
                  value={filterField} 
                  onChange={(e) => setFilterField(e.target.value)}
                  className="bg-black border border-cyan-500/30 rounded px-2 py-1 text-xs font-mono text-cyan-300 focus:outline-none"
                >
                  <option value="all">All Engineering Fields</option>
                  <option value="cs">Computer Science & AI</option>
                  <option value="mech">Mechanical & Robotics</option>
                  <option value="elec">Electrical & Photonic</option>
                  <option value="civil">Civil Infrastructure</option>
                </select>
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold rounded-lg text-xs hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center space-x-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>SHOWCASE YOUR PROJECT</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityProjects
                .filter(p => filterField === 'all' || p.field === filterField)
                .map((proj) => (
                  <div key={proj.id} className="bg-[#0f0f1a] border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-purple-400">{proj.fieldTitle}</span>
                          <h3 className="text-lg font-bold text-white mt-0.5">{proj.title}</h3>
                        </div>
                        <button 
                          onClick={() => {
                            proj.likes += 1;
                            setCommunityProjects([...communityProjects]);
                          }}
                          className="flex items-center space-x-1 bg-black/50 border border-purple-500/40 px-2.5 py-1 rounded-full text-xs font-mono text-purple-300 hover:bg-purple-900/40"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
                          <span>{proj.likes}</span>
                        </button>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">{proj.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech) => (
                          <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-black/60 text-cyan-300 border border-cyan-500/30 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-400">By: {proj.author}</span>
                      {proj.seekingMembers && (
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded animate-pulse">
                          RECRUITING
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 6. FIND A SQUAD (TEAM UP BOARD) */}
        {activeTab === 'squads' && (
          <div className="space-y-6">
            <div className="bg-[#0f0f1a] border border-cyan-500/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Engineering Team-Up Board</h3>
                <p className="text-xs text-gray-400 mt-1">Connect with students & engineers building cross-disciplinary hardware/software projects.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {squads.map((squad) => (
                <div key={squad.id} className="bg-[#0f0f1a] border border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                        {FIELD_CONFIGS[squad.field].title.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{squad.spotsLeft} SPOTS LEFT</span>
                    </div>

                    <h4 className="font-bold text-white text-base">{squad.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{squad.description}</p>

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
                      setSelectedSquad(squad);
                      setJoinModalOpen(true);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-mono font-bold rounded text-xs hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center justify-center space-x-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>JOIN SQUAD</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// SUBMIT PROJECT MODAL COMPONENT
// ==========================================

function SubmitProjectModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    field: 'cs',
    techStack: '',
    description: '',
    repoUrl: '',
    seekingMembers: false,
    lookingFor: ''
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0f0f1a] border border-purple-500/40 rounded-xl p-6 max-w-lg w-full relative shadow-[0_0_35px_rgba(176,38,255,0.2)]">
        <h3 className="text-xl font-bold text-purple-400 font-mono mb-4">Showcase Your Project</h3>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }} 
          className="space-y-4 text-xs font-mono"
        >
          <div>
            <label className="block text-gray-300 mb-1">Project Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Haptic Drone Controller" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/30 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Engineering Field</label>
            <select 
              value={formData.field} 
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/30 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            >
              <option value="cs">Computer Science & AI</option>
              <option value="mech">Mechanical & Robotics</option>
              <option value="elec">Electrical & Photonic</option>
              <option value="civil">Civil Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Tech Stack (Comma Separated)</label>
            <input 
              required
              type="text" 
              placeholder="React, C++, ROS2, Arduino" 
              value={formData.techStack} 
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/30 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Project Description</label>
            <textarea 
              required
              rows={3} 
              placeholder="Describe the engineering goal and architecture..." 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black/60 border border-purple-500/30 rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="seeking"
              checked={formData.seekingMembers} 
              onChange={(e) => setFormData({ ...formData, seekingMembers: e.target.checked })}
              className="accent-purple-500"
            />
            <label htmlFor="seeking" className="text-gray-300">Actively Recruiting Team Members</label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border border-gray-700 rounded text-gray-400 hover:text-white"
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            >
              PUBLISH PROJECT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}