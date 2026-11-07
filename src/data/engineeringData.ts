import { FieldConfig, CommunityProject, EngineeringSquad } from '../types';

export const FIELD_CONFIGS: Record<string, FieldConfig> = {
  cs: {
    id: 'cs',
    title: 'Computer Science & AI',
    subtitle: 'Neural Networks, Distributed Systems & Cybernetics',
    icon: 'Cpu',
    primaryColor: '#00f3ff', // Cyan
    secondaryColor: '#b026ff',
    bgGlow: 'rgba(0, 243, 255, 0.15)',
    personaTitle: 'Neural Systems Architect',
    traitDescription: 'High algorithmic velocity bias with intuitive pattern recognition in massive distributed networks and AI pipelines.',
    description: 'Master software engineering, machine learning pipelines, decentralized protocols, and edge AI system architecture aligned with Malaysian IPTA & EAC standards.',
    notes: [
      {
        id: 'cs_wix1001',
        title: 'WIX1001: Computing Mathematics I (Discrete Math & Logic)',
        category: 'Discrete Mathematics',
        difficulty: 'Beginner',
        time: '12 mins read',
        downloads: 3120,
        year: 1,
        semester: 1,
        courseCode: 'WIX1001',
        iptaCurriculumNote: 'Year 1 Foundation: Mandatory Malaysian IPTA (UM/UTM/UKM) curriculum aligned with EAC WA1 (Engineering Knowledge).',
        eacOutcome: 'WA1: Complex Mathematical Formulations & Discrete Logic',
        overview: 'Core discrete mathematical structures for computer science and software engineering: Propositional and Predicate Logic, Truth Tables, Set Operations, Mathematical Induction, Relations, Functions, and Boolean Algebra.',
        keyFormulas: [
          'De Morgan’s Laws: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q ; ¬(P ∨ Q) ≡ ¬P ∧ ¬Q',
          'Conditional Equivalence: P → Q ≡ ¬P ∨ Q',
          'Mathematical Induction: Prove Base P(1), Assume P(k) is True, Deduce P(k+1)',
          'Eigenvalue Characteristic Equation: det(A - λI) = 0'
        ],
        coreConcepts: [
          'Formal mathematical induction and proof by contradiction techniques',
          'Equivalence relations, partial orderings, and Hasse diagrams',
          'Recurrence relations and closed-form solutions for algorithm runtimes'
        ],
        codeSnippet: {
          lang: 'python',
          code: `# WIX1001 Truth Table Generator in Python\ndef generate_truth_table():\n    print("P\\tQ\\tP -> Q\\t¬P v Q")\n    print("-" * 32)\n    for P in [True, False]:\n        for Q in [True, False]:\n            implies = (not P) or Q\n            equiv = (not P) or Q\n            print(f"{P}\\t{Q}\\t{implies}\\t{equiv}")\n\ngenerate_truth_table()`
        }
      },
      {
        id: 'cs_wix1002',
        title: 'WIX1002: Fundamentals of Programming (C++ & Memory Architecture)',
        category: 'Programming Fundamentals',
        difficulty: 'Beginner',
        time: '15 mins read',
        downloads: 2890,
        year: 1,
        semester: 2,
        courseCode: 'WIX1002',
        iptaCurriculumNote: 'Year 1 Foundation: Core programming techniques, pointer manipulation, and procedural/modular problem solving.',
        eacOutcome: 'WA1: Algorithmic Thinking & Low-Level Code Optimization',
        overview: 'Master low-level dynamic memory allocation (malloc/free, new/delete), pointer arithmetic, pass-by-reference mechanics, recursion, and struct memory alignment in C and C++.',
        keyFormulas: [
          'Pointer Address Offset: Address(ptr + i) = Base_Address + (i * sizeof(*ptr))',
          'Bitwise Masking: clear_bit = val & ~(1 << bit_pos); set_bit = val | (1 << bit_pos)',
          'Two\'s Complement: -x = ~x + 1'
        ],
        coreConcepts: [
          'Stack frame lifecycle, buffer overflows, and memory leakage prevention',
          'Pass-by-value vs pass-by-reference mechanics in multi-threaded runtimes',
          'Dynamic memory allocation and smart pointers (std::unique_ptr, std::shared_ptr)'
        ],
        codeSnippet: {
          lang: 'cpp',
          code: `#include <iostream>\n#include <memory>\n\n// WIX1002: Dynamic buffer management for sensor stream\nvoid processTelemetryBuffer(int size) {\n    std::unique_ptr<float[]> sensorStream(new float[size]);\n    for (int i = 0; i < size; ++i) {\n        *(sensorStream.get() + i) = i * 1.414f;\n    }\n    std::cout << "Buffer allocated at: " << sensorStream.get() << std::endl;\n}`
        }
      },
      {
        id: 'cs_wia2001',
        title: 'WIA2001: Database Systems (Relational Design & SQL Normalization)',
        category: 'Database Systems',
        difficulty: 'Intermediate',
        time: '16 mins read',
        downloads: 2640,
        year: 2,
        semester: 1,
        courseCode: 'WIA2001',
        iptaCurriculumNote: 'Year 2 Core Discipline: Mandatory EAC WA2 (Problem Analysis) course across all Malaysian IPTA computing degrees.',
        eacOutcome: 'WA2: Relational Data Modeling & Functional Dependency Analysis',
        overview: 'Relational database schema modeling, Entity-Relationship (ER) diagrams with Crow\'s Foot notation, functional dependency derivation, normalization up to Boyce-Codd Normal Form (BCNF), and ACID transaction management.',
        keyFormulas: [
          'Relational Algebra Projection: π_{attributes}(Relation)',
          'Relational Algebra Selection: σ_{condition}(Relation)',
          'Natural Join: R ⋈_{R.id = S.id} S',
          '3NF Condition: For X → A, either X is superkey or A is prime attribute'
        ],
        coreConcepts: [
          '1NF (atomicity), 2NF (eliminate partial keys), 3NF (eliminate transitive dependencies)',
          'Indexing strategies (B+ Trees, Hash indexes) and query execution plans',
          'ACID properties (Atomicity, Consistency, Isolation, Durability) and 2-Phase Locking'
        ],
        codeSnippet: {
          lang: 'sql',
          code: `-- WIA2001: Advanced Analytical Aggregation & Subquery\nSELECT s.student_id, s.name, AVG(e.grade_point) AS gpa\nFROM students s\nJOIN enrollments e ON s.student_id = e.student_id\nWHERE e.academic_year = '2025/2026'\nGROUP BY s.student_id, s.name\nHAVING AVG(e.grade_point) >= 3.75\nORDER BY gpa DESC;`
        }
      },
      {
        id: 'cs_wia2005',
        title: 'WIA2005: Algorithm Design & Analysis (Complexity & Dynamic Programming)',
        category: 'Algorithms & Complexity',
        difficulty: 'Intermediate',
        time: '18 mins read',
        downloads: 2410,
        year: 2,
        semester: 2,
        courseCode: 'WIA2005',
        iptaCurriculumNote: 'Year 2 Core Discipline: High-yield EAC WA2 analytical problem solving course on asymptotic runtimes.',
        eacOutcome: 'WA2: Asymptotic Optimization & Dynamic Programming',
        overview: 'Comprehensive study of Big-O, Big-Omega, Big-Theta asymptotic bounds, recurrence relations (Master Theorem), divide-and-conquer, greedy optimization, dynamic programming, and NP-completeness.',
        keyFormulas: [
          'Master Theorem: T(n) = a*T(n/b) + f(n)',
          'A* Search Heuristic: f(n) = g(n) + h(n)',
          'Hash Collision Load Factor: α = n / k (maintained under 0.75)'
        ],
        coreConcepts: [
          'Adjacency lists vs compressed sparse row (CSR) graph representations',
          'Dynamic programming memoization vs bottom-up tabulation tradeoffs',
          'Dijkstra\'s shortest path and Kruskal\'s Minimum Spanning Tree'
        ],
        codeSnippet: {
          lang: 'cpp',
          code: `#include <vector>\n#include <queue>\n\n// WIA2005: Optimized Dijkstra with priority queue\nusing Node = std::pair<int, int>; // {cost, vertex}\n\nstd::vector<int> dijkstra(int start, int n, const std::vector<std::vector<Node>>& adj) {\n    std::vector<int> dist(n, 1e9);\n    std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;\n    dist[start] = 0;\n    pq.push({0, start});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto& [w, v] : adj[u]) {\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}`
        }
      },
      {
        id: 'cs_wia3001',
        title: 'WIA3001: Artificial Intelligence (Search, Neural Networks & Machine Learning)',
        category: 'Artificial Intelligence',
        difficulty: 'Advanced',
        time: '20 mins read',
        downloads: 2150,
        year: 3,
        semester: 1,
        courseCode: 'WIA3001',
        iptaCurriculumNote: 'Year 3 Specialization: Aligned with Malaysian National AI Roadmap and EAC WA3 (Complex Solutions Design).',
        eacOutcome: 'WA3: Design/Development of Deep Learning Solutions',
        overview: 'Heuristic search algorithms, Alpha-Beta pruning in adversarial games, multi-layer perceptrons, backpropagation mathematics, loss functions, and modern attention-based neural networks.',
        keyFormulas: [
          'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
          'Rotary Positional Embedding (RoPE): R_Θ,m * x_m',
          'Loss Cross-Entropy: L = -∑ y_i * log(p_i)',
          'Backpropagation Chain Rule: ∂L/∂w = (∂L/∂y) * (∂y/∂z) * (∂z/∂w)'
        ],
        coreConcepts: [
          'Linear chunked attention vs quadratic full matrix attention complexity',
          'Key-Value (KV) cache memory bandwidth optimization for multi-turn inference',
          'Kernel fusion with PyTorch and CUDA for ultra-fast GPU tensor contraction'
        ],
        codeSnippet: {
          lang: 'python',
          code: `import torch\nimport torch.nn as nn\nimport math\n\n# WIA3001: Scaled Dot-Product Attention Module\nclass CyberAttention(nn.Module):\n    def __init__(self, d_k: int):\n        super().__init__()\n        self.d_k = d_k\n        \n    def forward(self, q, k, v, mask=None):\n        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.d_k)\n        if mask is not None:\n            scores = scores.masked_fill(mask == 0, -1e9)\n        p_attn = torch.softmax(scores, dim=-1)\n        return torch.matmul(p_attn, v), p_attn`
        }
      },
      {
        id: 'cs_wix4001_4002',
        title: 'WIX4001 & WIX4002: Final Year Project I & II (Capstone Engineering Thesis)',
        category: 'Capstone & FYP Thesis',
        difficulty: 'Advanced',
        time: '25 mins read',
        downloads: 1850,
        year: 4,
        semester: 1,
        courseCode: 'WIX4001 / WIX4002',
        iptaCurriculumNote: 'Year 4 Capstone & Final Year Project: Mandatory degree requirement satisfying EAC WA3, WA4, WA5, WA7 & BEM Ethics.',
        eacOutcome: 'WA5 & WA7: Modern Engineering Tools, Complex Investigation & Societal Impact',
        overview: 'Comprehensive guide for conducting high-impact undergraduate research and capstone engineering implementations: problem formulation, empirical validation, IEEE format report writing, and Viva Voce defense strategies.',
        keyFormulas: [
          'Precision = TP / (TP + FP) ; Recall = TP / (TP + FN)',
          'F1-Score = 2 * (Precision * Recall) / (Precision + Recall)',
          'Amdahl’s Law Speedup: S_latency(s) = 1 / ((1 - p) + (p / s))',
          'Bilinear Pairing Map: e(aP, bQ) = e(P, Q)^(ab)'
        ],
        coreConcepts: [
          'Formulating measurable problem statements and research objectives',
          'Synthesis matrix for systematic literature reviews (Q1/Q2 journal standards)',
          'Conducting reproducible experiments, ablation studies, and Viva Voce defense tactics'
        ],
        codeSnippet: {
          lang: 'python',
          code: `# WIX4001/4002: Model Evaluation Pipeline for FYP Empirical Validation\nfrom sklearn.metrics import classification_report, confusion_matrix\n\ndef evaluate_fyp_model(y_true, y_pred):\n    print("=== FINAL YEAR PROJECT EVALUATION METRICS ===")\n    print(classification_report(y_true, y_pred, digits=4))\n    cm = confusion_matrix(y_true, y_pred)\n    print("Confusion Matrix:\\n", cm)`
        }
      }
    ],
    videos: [
      {
        id: 'v_cs1',
        title: 'Building LLMs from Scratch in C++ (Inference Engine)',
        creator: 'Andrej Cybernetics',
        duration: '42:10',
        views: '148K',
        url: 'https://youtube.com',
        year: 3,
        labType: 'Virtual Lab',
        topics: ['Tensor Memory Allocation', 'SIMD AVX-512 Matrix Mult', 'Quantization (int4/fp8)'],
        description: 'Complete hands-on lab constructing a zero-dependency GPT-style neural network inference engine running bare-metal on CPU.'
      },
      {
        id: 'v_cs2',
        title: 'UTM / UM EAC Lab: C++ Memory & OS Virtual Memory Paging',
        creator: 'Malaysian Computer Science Guild',
        duration: '31:25',
        views: '45K',
        url: 'https://youtube.com',
        year: 1,
        labType: 'Lecture',
        topics: ['Virtual Memory', 'Page Tables', 'Pointers in C++', 'EAC WA1 Assessment'],
        description: 'Structured university lecture walking through Year 1 & 2 pointer arithmetic, memory fragmentation, and kernel memory address translations.'
      },
      {
        id: 'v_cs3',
        title: 'Quantum Computing Operating Systems Visualized',
        creator: 'TechQuantum Labs',
        duration: '28:45',
        views: '98K',
        url: 'https://youtube.com',
        year: 4,
        labType: 'FYP / Capstone',
        topics: ['Qubit Gates & Bloch Sphere', 'Shor & Grover Speedups', 'Quantum Error Correction'],
        description: 'Interactive graphical breakdown of quantum gates, superposition coherence times, and how quantum compilers map to physical superconducting transmon qubits.'
      },
      {
        id: 'v_cs4',
        title: 'Distributed Systems: Raft Consensus Algorithm Step-by-Step',
        creator: 'Distributed Systems Academy',
        duration: '36:12',
        views: '112K',
        url: 'https://youtube.com',
        year: 2,
        labType: 'Design Workshop',
        topics: ['Leader Election', 'Log Replication', 'Network Partitions', 'Heartbeat Timers'],
        description: 'Visual animation and code walkthrough of election timeouts, candidate votes, split-brain mitigation, and state machine commits.'
      }
    ],
    industryProjects: [
      {
        id: 'ip_cs1',
        title: 'Autonomous Drone Swarm Mesh (Cyberjaya Testbed)',
        organization: 'CyberDyn Dynamics & Aerodyne Malaysia',
        budget: 'RM 18.5M',
        status: 'In Production',
        malaysianContext: 'Field-tested across Cyberjaya Autonomous Vehicle Zone & Malaysian palm oil plantations.',
        impact: 'Real-time multi-agent search and rescue operations via edge neural processing with zero cloud telemetry dependency.',
        timeline: 'Q1 2025 - Q4 2026',
        keyMilestones: [
          'Sub-5ms decentralized obstacle consensus among 120 drones',
          'Ultra-low power edge NPU integration (0.8 TOPS/Watt)',
          'Simulated 10,000 unit city swarm clearance with 99.98% mission success'
        ],
        techStack: ['C++', 'Rust', 'ROS2', 'PyTorch TensorRT', 'Sub-GHz LoRa Mesh']
      },
      {
        id: 'ip_cs2',
        title: 'Sub-Millisecond Quantum Trading Mesh',
        organization: 'Nexus Financial AI (KL Eco City Fintech Hub)',
        budget: 'RM 45M',
        status: 'Testing Phase',
        malaysianContext: 'Connecting Bursa Malaysia with Singapore SGX high-frequency fiber corridors.',
        impact: 'Predictive liquidity routing using quantum superposition state vectors across global exchange fiber backbones.',
        timeline: 'Q3 2024 - Q2 2027',
        keyMilestones: [
          'FPGA kernel routing latency reduced to 340 nanoseconds',
          'Quantum annealing arbitrage simulation over 50,000 pairs',
          'Hardware-in-the-loop stress testing during simulated flash crashes'
        ],
        techStack: ['VHDL', 'Chisel', 'Qiskit', 'Kernel Bypass C (DPDK)']
      }
    ],
    diyProjects: [
      {
        id: 'diy_cs_y1',
        title: 'High-Performance Matrix Math Engine in C++',
        level: 'Beginner',
        targetYear: 'Year 1 Mini Project',
        iptaAlignment: 'Aligned with IPTA Programming Techniques & Engineering Mathematics Coursework.',
        estHours: '10 hrs',
        stack: ['C++17', 'CMake', 'SIMD Intrinsics', 'GoogleTest'],
        description: 'Build a memory-efficient matrix algebra library supporting transposition, inversion, and cache-friendly block multiplication.',
        components: [
          'Modern C++ Compiler (GCC / Clang)',
          'GoogleTest Unit Testing Framework',
          'Valgrind Memory Leak Checker'
        ],
        assemblyPhases: [
          'Phase 1: Implement 1D flat array memory representation with row-major indexing',
          'Phase 2: Implement cache-blocking matrix multiplication to optimize L1/L2 cache hits',
          'Phase 3: Write comprehensive unit test suites checking edge cases and singularity matrices'
        ]
      },
      {
        id: 'diy_cs1',
        title: 'AI-Powered Cyberpunk HUD Overlay',
        level: 'Intermediate',
        targetYear: 'Year 3 IDP (Integrated Design)',
        iptaAlignment: 'Meets EAC WA3 requirements for Computer Vision & Real-time Graphical User Interfaces.',
        estHours: '15 hrs',
        stack: ['React', 'OpenCV.js', 'TailwindCSS', 'WebRTC'],
        description: 'Build a browser-based webcam facial mesh visualizer with live augmented reality telemetry, eye-gaze tracking, and tactical cyberpunk stats.',
        components: [
          'Standard HD Webcam / USB Camera',
          'Modern Web Browser with WebGL 2.0',
          'MediaPipe FaceMesh Model Weights'
        ],
        assemblyPhases: [
          'Phase 1: Setup WebRTC video capture stream with 60 FPS requestAnimationFrame canvas loop',
          'Phase 2: Load lightweight 468-point 3D face mesh landmark detector',
          'Phase 3: Render tactical cyberpunk reticles, iris tracking calipers, and neon bounding boxes',
          'Phase 4: Overlay real-time CPU telemetry and synthetic biometric heart-rate estimator'
        ],
        sampleCode: {
          filename: 'HudOverlay.tsx',
          code: `import React, { useRef, useEffect } from 'react';\n\nexport function CyberHUD({ videoRef }: { videoRef: HTMLVideoElement }) {\n  const canvasRef = useRef<HTMLCanvasElement>(null);\n  // Render holographic targeting brackets\n  const drawTargetRing = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {\n    ctx.strokeStyle = '#00f3ff';\n    ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.arc(x, y, r, 0, Math.PI * 1.5);\n    ctx.stroke();\n  };\n  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;\n}`
        }
      },
      {
        id: 'diy_cs2',
        title: 'Rust-Based Micro-Kernel Engine (Final Year Project Prototype)',
        level: 'Advanced',
        targetYear: 'Year 4 Capstone / FYP',
        iptaAlignment: 'Compliant with UTM/UM Projek Sarjana Muda (PSM) Operating Systems & Systems Engineering criteria.',
        estHours: '40 hrs',
        stack: ['Rust', 'WebAssembly', 'LLVM', 'x86_64'],
        description: 'Construct a lightweight sandbox container runtime optimized for real-time edge processing and zero-cost memory safety.',
        components: [
          'Rust Toolchain (nightly-x86_64)',
          'QEMU Machine Emulator',
          'Bootloader v0.9 crate'
        ],
        assemblyPhases: [
          'Phase 1: Bare-metal no_std environment initialization with VGA buffer output',
          'Phase 2: Global Descriptor Table (GDT) and Interrupt Descriptor Table (IDT) configuration',
          'Phase 3: Paging and physical frame allocator with bitmap tracking',
          'Phase 4: Preemptive priority task scheduler and syscall dispatch pipeline'
        ]
      }
    ]
  },
  mech: {
    id: 'mech',
    title: 'Mechanical & Robotics',
    subtitle: 'Kinematics, Mechatronics & Aerodynamics',
    icon: 'Wrench',
    primaryColor: '#ffaa00', // Amber
    secondaryColor: '#ff3300',
    bgGlow: 'rgba(255, 170, 0, 0.15)',
    personaTitle: 'Mechatronics Vanguard',
    traitDescription: 'High spatial kinematic dexterity with deep mastery over structural stress tolerances, dynamic torque, and thermodynamic cycles.',
    description: 'Engineer advanced mechatronic systems, high-speed propulsion, dynamic robotics, and CAD stress simulations aligned with Malaysian EAC engineering criteria.',
    notes: [
      {
        id: 'm_kmea1112',
        title: 'KMEA1112: Mechanics of Materials & Statics of Rigid Bodies',
        category: 'Engineering Mechanics',
        difficulty: 'Beginner',
        time: '15 mins read',
        downloads: 2400,
        year: 1,
        semester: 1,
        courseCode: 'KMEA1112',
        iptaCurriculumNote: 'Year 1 Foundation: Core EAC WA1 module taught across Malaysian Engineering Faculties (UM/UTM/UKM/USM).',
        eacOutcome: 'WA1: Application of Fundamental Mechanics',
        overview: 'Fundamental force vectors, moments about a point, free-body diagrams (FBD), equilibrium equations, method of joints for 2D/3D trusses, and friction cone limits.',
        keyFormulas: [
          'Equilibrium: ∑ F_x = 0, ∑ F_y = 0, ∑ M_z = 0',
          'Moment Vector: M = r × F = det([i, j, k; r_x, r_y, r_z; F_x, F_y, F_z])',
          'Static Friction Limit: F_max = μ_s * N'
        ],
        coreConcepts: [
          'Rigid body support reaction determinacy (roller, pin, fixed cantilever)',
          'Zero-force members identification in bridge trusses',
          'Centroids and moments of inertia for structural I-beam cross sections'
        ]
      },
      {
        id: 'm_kmea2114',
        title: 'KMEA2114: Thermodynamics & Fluid Mechanics (Navier-Stokes Cycles)',
        category: 'Thermal-Fluids Science',
        difficulty: 'Intermediate',
        time: '18 mins read',
        downloads: 1950,
        year: 2,
        semester: 1,
        courseCode: 'KMEA2114',
        iptaCurriculumNote: 'Year 2 Core Discipline: EAC WA2 analytical problem solving covering Brayton, Rankine, and compressible fluid flow.',
        eacOutcome: 'WA2: Thermal-Fluid Modeling & Conservation Laws',
        overview: 'First and Second Laws of Thermodynamics, entropy generation, ideal gas cycles, Bernoulli streamline equation, laminar-turbulent pipe friction (Darcy-Weisbach).',
        keyFormulas: [
          'First Law Open System: Q_dot - W_dot = ∑ m_dot_out * (h + V^2/2 + gz) - ∑ m_dot_in * (h + V^2/2 + gz)',
          'Bernoulli Equation: P + 0.5 * ρ * v^2 + ρ * g * z = Constant',
          'Darcy Head Loss: h_f = f * (L / D) * (v^2 / (2g))'
        ],
        coreConcepts: [
          'Carnot efficiency limits and exergy destruction analysis',
          'Moody chart relative roughness Reynolds number transitions',
          'Mach cones and supersonic normal shockwave pressure discontinuities'
        ]
      },
      {
        id: 'm_kmea3115',
        title: 'KMEA3115: Mechatronics & Control Systems (6-DOF Robotic Kinematics)',
        category: 'Robotics & Mechatronics',
        difficulty: 'Intermediate',
        time: '18 mins read',
        downloads: 1850,
        year: 3,
        semester: 1,
        courseCode: 'KMEA3115',
        iptaCurriculumNote: 'Year 3 Specialization: Mechatronics stream following BEM Robotics & Automation laboratory guidelines.',
        eacOutcome: 'WA3: Complex Robotic Systems Design',
        overview: 'Denavit-Hartenberg (DH) parameter conventions, forward & inverse kinematics, geometric Jacobian velocity mapping, and singularity avoidance algorithms.',
        keyFormulas: [
          'DH Homogeneous Transformation: T_i = Rot_z(θ) * Trans_z(d) * Trans_x(a) * Rot_x(α)',
          'Jacobian Velocity Map: v = J(θ) * dθ/dt',
          'Damped Least Squares (DLS): J* = J^T * (J * J^T + λ^2 * I)^(-1)'
        ],
        coreConcepts: [
          'Wrist center spherical joint decoupling for analytical 6-DOF solving',
          'Singularity boundaries (wrist, shoulder, and elbow alignment)',
          'Torque ripple compensation in harmonic drive gearboxes'
        ]
      },
      {
        id: 'm_kmea4116',
        title: 'KMEA4116: Finite Element Analysis (FEA) & Capstone Mechanical Design',
        category: 'Capstone Materials & Simulation',
        difficulty: 'Advanced',
        time: '24 mins read',
        downloads: 1320,
        year: 4,
        semester: 1,
        courseCode: 'KMEA4116',
        iptaCurriculumNote: 'Year 4 Integrated Design Project (IDP) & Final Year Thesis (FYP): EAC WA3, WA4 & WA6 compliance.',
        eacOutcome: 'WA3 & WA6: Advanced Structural Integrity & Environmental Safety',
        overview: 'Finite Element Analysis (FEA) for high-temperature superalloys under 40,000 RPM centrifugal loads, thermal cycling, and Larson-Miller creep rupture life estimation.',
        keyFormulas: [
          'Von Mises Yield Criterion: σ_v = sqrt(0.5 * ((σ1-σ2)^2 + (σ2-σ3)^2 + (σ3-σ1)^2))',
          'Larson-Miller Parameter: LMP = T * (C + log10(t_r))',
          'Centrifugal Stress: σ_c = ρ * ω^2 * r^2 / 2'
        ],
        coreConcepts: [
          'Tetrahedral vs Hexahedral mesh element quality metrics (Jacobian ratio, aspect ratio)',
          'Thermal-structural coupled field analysis in high-pressure turbine blades',
          'Active film cooling aerodynamics to prevent thermal barrier coating (TBC) spallation'
        ]
      }
    ],
    videos: [
      {
        id: 'v_m1',
        title: 'Designing a 10,000 RPM Brushless Actuator',
        creator: 'MechForge Labs',
        duration: '35:20',
        views: '210K',
        url: 'https://youtube.com',
        year: 3,
        labType: 'Design Workshop',
        topics: ['Neodymium Magnet Arrays', 'Stator Lamination Stacks', 'Field Oriented Control'],
        description: 'Step-by-step CAD modeling, winding calculations, and dyno bench testing of a compact high-torque drone actuator.'
      },
      {
        id: 'v_m2',
        title: 'Malaysian IPTA Lab: Tensile Stress-Strain & Charpy Impact Test',
        creator: 'UTM / UM Mechanical Laboratories',
        duration: '24:15',
        views: '38K',
        url: 'https://youtube.com',
        year: 2,
        labType: 'Virtual Lab',
        topics: ['Universal Testing Machine (UTM)', 'Young\'s Modulus', 'Ductile-to-Brittle Transition', 'EAC Lab Rubrics'],
        description: 'Practical lab session recording ASTM E8 tensile bar necking, yield strength calculation, and fracture surface examination.'
      },
      {
        id: 'v_m3',
        title: 'Titanium 3D Printing in Aerospace Structures',
        creator: 'Material Dynamics',
        duration: '19:12',
        views: '84K',
        url: 'https://youtube.com',
        year: 4,
        labType: 'FYP / Capstone',
        topics: ['Selective Laser Melting (SLM)', 'Lattice Topology Optimization', 'Residual Stress Annealing'],
        description: 'How generative algorithms design lightweight rocket bracket components printed in Ti-6Al-4V alloy.'
      },
      {
        id: 'v_m4',
        title: 'Engineering Statics: 3D Equilibrium & Truss Analysis Walkthrough',
        creator: 'Prof. Engineering Mechanics',
        duration: '40:05',
        views: '165K',
        url: 'https://youtube.com',
        year: 1,
        labType: 'Lecture',
        topics: ['Vector Cross Products', 'Method of Sections', 'Space Trusses', 'Support Reactions'],
        description: 'Comprehensive Year 1 university tutorial walking through 3D free-body equilibrium problems step-by-step.'
      }
    ],
    industryProjects: [
      {
        id: 'ip_m1',
        title: 'Exoskeleton Power Assist for Orbital Mechanics',
        organization: 'AeroForge Space & Malaysian Space Agency (MYSA)',
        budget: 'RM 38M',
        status: 'Prototyping',
        malaysianContext: 'Tested with Langkawi Aerospace & Maritime Exhibition (LIMA) aerospace prototypes.',
        impact: 'Multiplies operator load force by 8x while preserving fine tactile haptic feedback in hazardous inspection zones.',
        timeline: 'Q2 2024 - Q3 2027',
        keyMilestones: [
          'Harmonic drive knee actuator with 180 Nm peak torque',
          'Myoelectric EMG sensor cuff responding in under 8ms',
          'Tested in neutral buoyancy simulation with 100% telemetry success'
        ],
        techStack: ['SolidWorks', 'ANSYS Mechanical', 'Carbon Fiber Prepreg', 'CANopen Bus']
      },
      {
        id: 'ip_m2',
        title: 'PETRONAS Floating LNG Cryogenic Expansion Turbines',
        organization: 'PETRONAS Gas & CryoForge Global',
        budget: 'RM 120M',
        status: 'Active Commissioning',
        malaysianContext: 'Installed aboard PFLNG SATU & PFLNG DUA offshore Sabah/Sarawak fields.',
        impact: 'Expands natural gas to -162°C using multi-stage radial inflow cryo-turbines generating 14 MW of recovered electrical power.',
        timeline: 'Q1 2023 - Q4 2026',
        keyMilestones: [
          'Sub-zero cryogenic seal reliability tested to 25,000 continuous hours',
          'Titanium impellers dynamic balance achieved ISO 1940 Grade G1.0',
          'Zero-methane boil-off recovery loop validated'
        ],
        techStack: ['Cryogenic Inconel 625', 'Computational Fluid Dynamics (CFD)', 'Honeywell DCS Control']
      }
    ],
    diyProjects: [
      {
        id: 'diy_m_y1',
        title: 'CAD 3D Modeling & Laser-Cut Kinetic Mechanism',
        level: 'Beginner',
        targetYear: 'Year 1 Mini Project',
        iptaAlignment: 'Meets EAC WA1 & WA5 standards for Engineering Drawing and Computer-Aided Design (CAD).',
        estHours: '8 hrs',
        stack: ['SolidWorks / Onshape', 'Laser Cutting', 'DXF Export', 'Kinematic Simulation'],
        description: 'Model a multi-bar Geneva stop mechanism or planetary gear train in CAD, run motion simulation, and laser-cut physical prototype.',
        components: [
          'CAD Software (SolidWorks / Fusion 360 / Onshape)',
          '3mm MDF / Acrylic Sheets',
          'M3 Machine Screws and Standoffs'
        ],
        assemblyPhases: [
          'Phase 1: Constrain 2D kinematic sketches and pitch diameters in CAD',
          'Phase 2: Perform interference detection and velocity motion study',
          'Phase 3: Fabricate laser-cut parts and assemble with miniature ball bearings'
        ]
      },
      {
        id: 'diy_m1',
        title: 'Bipedal Balance Robot using Gyroscope & PID Control',
        level: 'Intermediate',
        targetYear: 'Year 2 Design Lab',
        iptaAlignment: 'Standard Year 2 Mechatronics & Control Systems Lab Project across Malaysian IPTAs.',
        estHours: '14 hrs',
        stack: ['Arduino / ESP32', '3D Printing', 'PID Control', 'MPU6050'],
        description: '3D print and assemble a self-balancing two-wheeled robotic platform with closed-loop PID tilt correction.',
        components: [
          'Arduino Nano / ESP32 Dev Board',
          'MPU-6050 6-Axis Gyroscope & Accelerometer',
          '2x NEMA 17 Stepper Motors + A4988 Drivers',
          '3D Printed PLA Chassis Brackets (STL files included)',
          '3S 11.1V 1500mAh LiPo Battery'
        ],
        assemblyPhases: [
          'Phase 1: 3D print the dual-tier modular chassis plates and motor brackets',
          'Phase 2: Assemble stepper motors with rubber traction wheels',
          'Phase 3: Wire MPU6050 I2C bus and motor step/dir pins to microcontroller',
          'Phase 4: Calibrate Complementary Filter and tune Kp, Ki, Kd parameters'
        ],
        sampleCode: {
          filename: 'SelfBalancePID.ino',
          code: `// EngiForge Robotics Lab - Balance Loop\nfloat Kp = 18.5, Ki = 0.8, Kd = 2.4;\nfloat targetAngle = 0.0, currentAngle = 0.0;\nfloat error, lastError, integral = 0;\n\nvoid loop() {\n  currentAngle = readFilteredGyro();\n  error = targetAngle - currentAngle;\n  integral += error * dt;\n  float derivative = (error - lastError) / dt;\n  float motorOutput = (Kp * error) + (Ki * integral) + (Kd * derivative);\n  driveSteppers(motorOutput);\n  lastError = error;\n}`
        }
      },
      {
        id: 'diy_m2',
        title: 'Hydraulic Haptic Robotic Gripper (Year 4 Capstone/FYP)',
        level: 'Advanced',
        targetYear: 'Year 4 Capstone / FYP',
        iptaAlignment: 'Meets UTM/UM Projek Sarjana Muda (PSM) guidelines for Mechatronics & Fluid Power Systems.',
        estHours: '30 hrs',
        stack: ['CAD (Onshape)', 'Micro-Servos', 'Pressure Sensors', 'Tubing', 'Closed-Loop Control'],
        description: 'Design a micro-hydraulic fluid claw capable of picking up fragile glassware without crushing via tactile pressure feedback.',
        components: [
          'Miniature 5V Linear Actuators / Servos',
          'FSR402 Force Sensing Resistors',
          'Clear 4mm Polyurethane Fluid Tubing + Distilled Mineral Oil',
          'Laser-cut Acrylic Claw Linkages'
        ],
        assemblyPhases: [
          'Phase 1: Design 4-bar parallel motion linkage in CAD',
          'Phase 2: Assemble master-slave hydraulic cylinder syringes and bleed air bubbles',
          'Phase 3: Affix tactile force sensors to fingertip pads',
          'Phase 4: Program threshold clamping force cut-off logic'
        ]
      }
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
    personaTitle: 'Photonic Hardware Synth',
    traitDescription: 'Master of impedance harmonics, high-voltage switching transients, and signal propagation dynamics.',
    description: 'Design high-frequency PCBs, smart energy microgrids, photonic integrated circuits, and embedded firmware aligned with EAC/BEM accreditation.',
    notes: [
      {
        id: 'e_keea1111',
        title: 'KEEA1111: Electric Circuit Analysis I (Thévenin & AC Phasors)',
        category: 'Circuit Analysis',
        difficulty: 'Beginner',
        time: '15 mins read',
        downloads: 2750,
        year: 1,
        semester: 2,
        courseCode: 'KEEA1111',
        iptaCurriculumNote: 'Year 1 Foundation: Core EAC WA1 course required by all Electrical & Electronics engineering programs.',
        eacOutcome: 'WA1: Circuit Analysis & Nodal/Mesh Mathematics',
        overview: 'Kirchhoff’s Laws (KCL/KVL), Nodal and Mesh analysis, Thévenin and Norton equivalent source transformations, maximum power transfer theorem, and sinusoidal steady-state phasor impedances.',
        keyFormulas: [
          'Thévenin Voltage & Resistance: V_th = V_open_circuit, R_th = V_th / I_short_circuit',
          'Maximum Power Transfer: P_max = V_th^2 / (4 * R_th) (when R_L = R_th)',
          'Impedance: Z_R = R, Z_L = j*ω*L, Z_C = 1 / (j*ω*C)'
        ],
        coreConcepts: [
          'Superposition theorem in circuits with multiple DC and AC sources',
          'Power factor (pf = cos(θ)) and reactive power compensation with shunt capacitors',
          'Resonant frequency in series and parallel RLC tanks: ω_0 = 1 / sqrt(L * C)'
        ]
      },
      {
        id: 'e_keea2113',
        title: 'KEEA2113: Signals, Systems & Microcontroller Firmware in C',
        category: 'Digital Electronics',
        difficulty: 'Intermediate',
        time: '18 mins read',
        downloads: 2100,
        year: 2,
        semester: 1,
        courseCode: 'KEEA2113',
        iptaCurriculumNote: 'Year 2 Core Discipline: EAC WA2 analytical design of synchronous state machines, memory arrays, and timer interrupts.',
        eacOutcome: 'WA2 & WA5: Embedded Architecture & Microcontroller Interfacing',
        overview: 'Combinational logic minimization via Karnaugh Maps, flip-flop state registers, direct register manipulation in C, interrupt service routines (ISRs), and UART/SPI communication busses.',
        keyFormulas: [
          'Baud Rate Clock Divisor: UBRR = (f_osc / (16 * Baud)) - 1',
          'Timer Interrupt Frequency: f_int = f_cpu / (Prescaler * (OCR + 1))',
          'CMOS Dynamic Power: P_dyn = C_L * V_dd^2 * f_clk'
        ],
        coreConcepts: [
          'Hardware debouncing vs software state timer debounce',
          'Ring buffers for UART transmission without locking CPU execution',
          'Direct Memory Access (DMA) streaming for zero-CPU peripheral transfers'
        ]
      },
      {
        id: 'e_keea3114',
        title: 'KEEA3114: Microprocessor Systems & High-Frequency PCB Design',
        category: 'Hardware Engineering',
        difficulty: 'Advanced',
        time: '22 mins read',
        downloads: 1480,
        year: 3,
        semester: 1,
        courseCode: 'KEEA3114',
        iptaCurriculumNote: 'Year 3 Specialization: High-speed hardware design aligned with IPC standards and Malaysian semiconductor industries (Penang/Kulim).',
        eacOutcome: 'WA3: High-Frequency Hardware System Synthesis',
        overview: 'Microstrip and stripline transmission lines, controlled impedance matching for PCIe 5.0 and DDR5, return current loop inductance, and differential pair length tuning.',
        keyFormulas: [
          'Microstrip Impedance: Z_0 ≈ (87 / sqrt(ε_r + 1.41)) * ln(5.98 * h / (0.8 * w + t))',
          'Signal Propagation Delay: T_pd = sqrt(ε_eff) / c (approx 150 ps/inch in FR4)',
          'Skin Depth: δ = sqrt(ρ / (π * f * μ))'
        ],
        coreConcepts: [
          'Differential pair phase skew and intra-pair length serpentine tuning',
          'Ground plane split avoidance and return path displacement currents',
          'Decoupling capacitor resonant impedance profile across 10 MHz - 5 GHz'
        ]
      },
      {
        id: 'e_keea4115',
        title: 'KEEA4115: Power Systems, Smart Grids & Capstone Inverter Design',
        category: 'Power Electronics & Capstone',
        difficulty: 'Advanced',
        time: '26 mins read',
        downloads: 1250,
        year: 4,
        semester: 1,
        courseCode: 'KEEA4115',
        iptaCurriculumNote: 'Year 4 Capstone Integrated Design Project (IDP) & Final Year Project: EAC WA3, WA5 & WA7 (Sustainable Energy).',
        eacOutcome: 'WA3, WA5 & WA7: Sustainable Microgrid & Energy Storage Architecture',
        overview: 'Extended Kalman Filter (EKF) State-of-Charge (SoC) estimation, active inductive cell balancing, Silicon Carbide (SiC) 3-phase grid-tied inverter topologies, and CAN bus safety heartbeats.',
        keyFormulas: [
          'Coulomb Counting SoC: SoC(t) = SoC_0 - (1 / Q_n) * ∫ (I(t) * dt)',
          'Inverter Output RMS Voltage: V_LL_rms = (sqrt(3) / 2) * m_a * V_dc',
          'Switching Power Loss: P_sw = 0.5 * V_ds * I_d * (t_on + t_off) * f_sw'
        ],
        coreConcepts: [
          'Active inductive balancing vs passive resistor heat dissipation',
          'Galvanic isolation and common-mode transient immunity (CMTI > 100 kV/μs)',
          'Space Vector Pulse Width Modulation (SVPWM) harmonic minimization'
        ]
      }
    ],
    videos: [
      {
        id: 'v_e1',
        title: 'Designing 4-Layer High-Speed Impedance PCBs in KiCAD',
        creator: 'Circuit Wizard Pro',
        duration: '48:15',
        views: '320K',
        url: 'https://youtube.com',
        year: 3,
        labType: 'Design Workshop',
        topics: ['KiCAD 8 Workflow', 'Stackup Calculation (FR4 vs Rogers)', 'EMI Shielding Cans'],
        description: 'Complete walkthrough routing a Gigabit Ethernet PHY layout with differential 100-ohm impedance traces in KiCAD.'
      },
      {
        id: 'v_e2',
        title: 'Malaysian Semiconductor Lab: FPGA & Verilog Logic Synthesis',
        creator: 'Penang E&E Academic Forum (USM / UTM)',
        duration: '32:40',
        views: '42K',
        url: 'https://youtube.com',
        year: 2,
        labType: 'Virtual Lab',
        topics: ['Xilinx Vivado', 'Finite State Machines', 'Timing Constraints', 'EAC Rubric'],
        description: 'University hardware lab walking through Verilog HDL behavioral coding, RTL schematics, and flashing to an Artix-7 FPGA development board.'
      },
      {
        id: 'v_e3',
        title: 'FPGA Acceleration for Real-time Signal Filter',
        creator: 'Silicon Hardware Labs',
        duration: '22:05',
        views: '71K',
        url: 'https://youtube.com',
        year: 4,
        labType: 'FYP / Capstone',
        topics: ['Verilog Pipeline Registers', 'DSP Slice Optimization', 'SDR Radio Frequency Mixing'],
        description: 'Implementing an 8-channel digital down-converter (DDC) inside an FPGA processing 125 MSPS RF signals in real time.'
      },
      {
        id: 'v_e4',
        title: 'Electric Circuit Analysis: Thévenin & AC Phasor Masterclass',
        creator: 'Prof. Circuit Dynamics',
        duration: '45:10',
        views: '190K',
        url: 'https://youtube.com',
        year: 1,
        labType: 'Lecture',
        topics: ['Thévenin Equivalents', 'Phasor Domain', 'RLC Impedance', 'Power Factor Correction'],
        description: 'Comprehensive Year 1 university lecture solving complex AC steady-state circuits with sinusoidal sources.'
      }
    ],
    industryProjects: [
      {
        id: 'ip_e1',
        title: 'TNB Grid of the Future (Smart Solar Microgrid)',
        organization: 'Tenaga Nasional Berhad (TNB) & PlasmaGrid',
        budget: 'RM 85M',
        status: 'Commissioning',
        malaysianContext: 'Deployed across Selangor & Johor industrial corridors with rooftop solar integration.',
        impact: 'Converts pulsed photovoltaic solar and battery storage into ultra-stable 33kV distribution power with sub-cycle fault ride-through.',
        timeline: 'Q4 2023 - Q1 2027',
        keyMilestones: [
          'Silicon Carbide (SiC) smart power converters installed across 12 substations',
          'Sub-cycle islanding detection responding within 15 milliseconds',
          'Achieved 99.2% overall power conversion efficiency under peak tropical heat'
        ],
        techStack: ['SiC High-Power MOSFETs', 'DSP Control Core', 'IEC 61850 Protocol', 'Altium 365']
      },
      {
        id: 'ip_e2',
        title: 'Photonic Optical Transceiver Bus (Penang Tech Corridor)',
        organization: 'SubLight Nano Systems & SilTerra Malaysia',
        budget: 'RM 28M',
        status: 'Active Trial',
        malaysianContext: 'Fabricated at Kulim Hi-Tech Park wafer fabs for ASEAN cloud datacenters.',
        impact: 'Achieves 100 Terabits/sec interconnect speeds with sub-picojoule energy efficiency across server blade optical backplanes.',
        timeline: 'Q1 2024 - Q3 2026',
        keyMilestones: [
          'Silicon photonics wave-guide array with 32 multiplexed optical wavelengths',
          'Monolithic CMOS-photonic integration with zero wirebond parasitics',
          'Thermal drift locking maintaining wavelength alignment across 85°C'
        ],
        techStack: ['Cadence Virtuoso', 'Lumerical FDTD', 'Indium Phosphide Lasers']
      }
    ],
    diyProjects: [
      {
        id: 'diy_e_y1',
        title: '5V Regulated Linear Power Supply with Dual Rails',
        level: 'Beginner',
        targetYear: 'Year 1 Mini Project',
        iptaAlignment: 'Standard Year 1 Electrical Workshop Practice in Malaysian Engineering Universities.',
        estHours: '8 hrs',
        stack: ['Linear Regulators (LM7805/LM7905)', 'Full-Bridge Rectifier', 'PCB Etching'],
        description: 'Step-down 240VAC transformer to dual ±5V and ±12V smoothed DC power supplies with short-circuit protection.',
        components: [
          'Step-Down Center-Tapped Transformer (12V-0-12V)',
          '1N4007 Diode Bridge Rectifier',
          'Electrolytic Filter Capacitors (2200μF)',
          'LM7805 and LM7905 Voltage Regulators'
        ],
        assemblyPhases: [
          'Phase 1: Calculate capacitor ripple voltage: V_ripple = I / (2 * f * C)',
          'Phase 2: Hand-solder components onto single-layer copper clad board',
          'Phase 3: Inspect voltage waveform on oscilloscope under resistive load'
        ]
      },
      {
        id: 'diy_e1',
        title: 'Custom ESP32 Cyber-Deck Terminal with WiFi & BLE',
        level: 'Intermediate',
        targetYear: 'Year 2 Design Lab',
        iptaAlignment: 'Meets EAC WA2 & WA5 criteria for Microprocessor & Embedded Systems lab courses.',
        estHours: '18 hrs',
        stack: ['ESP32-S3', 'KiCAD', 'SPI TFT Display', 'QWERTY Matrix'],
        description: 'Layout a custom PCB motherboard for an ultra-portable wrist-mounted cyberdeck terminal with WiFi monitoring and serial terminal.',
        components: [
          'ESP32-S3 WROOM-1 Module (16MB Flash, 8MB PSRAM)',
          '2.8" SPI IPS Display (ST7789 Driver)',
          'Custom Printed PCB from Gerber files',
          'Cherry MX or Low-Profile Mechanical Kailh Switches',
          '18650 Li-ion Cell + TP4056 USB-C Charging Board'
        ],
        assemblyPhases: [
          'Phase 1: Fabricate PCB using KiCad Gerber outputs',
          'Phase 2: SMD soldering of power regulators, bypass caps, and ESP32',
          'Phase 3: Wire keyboard matrix diodes and SPI display ribbon',
          'Phase 4: Flash custom FreeRTOS firmware with cyber terminal CLI'
        ]
      },
      {
        id: 'diy_e2',
        title: 'Wireless Inductive Power Transfer Pad (Year 4 Capstone/FYP)',
        level: 'Advanced',
        targetYear: 'Year 4 Capstone / FYP',
        iptaAlignment: 'Meets UTM/UM Projek Sarjana Muda (PSM) guidelines for Power Electronics & Electromagnetic Energy.',
        estHours: '30 hrs',
        stack: ['Inductive Coils', 'MOSFET Inverter', 'PWM', 'Resonance'],
        description: 'Build an inductive resonant wireless charging landing pad that recharges autonomous reconnaissance drones upon touchdown.',
        components: [
          'Litz Wire Multi-Strand Flat Spiral Coils',
          'Dual IRFZ44N N-Channel Power MOSFETs',
          'High-Current Resonant Polypropylene Capacitors (WIMA MKP)',
          'Schottky Fast-Recovery Rectifier Bridge'
        ],
        assemblyPhases: [
          'Phase 1: Calculate LC resonant tank circuit for 100 kHz tuning',
          'Phase 2: Construct zero-voltage switching (ZVS) Royer oscillator inverter',
          'Phase 3: Fabricate drone receiver coil and buck regulator receiver module',
          'Phase 4: Bench test power transfer efficiency across 20mm air gap'
        ]
      }
    ]
  },
  civil: {
    id: 'civil',
    title: 'Civil & Smart Infrastructure',
    subtitle: 'Megastructures, Geo-Tech & Cyber-Cities',
    icon: 'Building',
    primaryColor: '#00ff66', // Cyber Emerald
    secondaryColor: '#00f3ff',
    bgGlow: 'rgba(0, 255, 102, 0.15)',
    personaTitle: 'Mega-Structure Planner',
    traitDescription: 'High macroscopic spatial foresight with deep mastery over geo-structural loads, seismic damping, and sustainable flow.',
    description: 'Construct resilient climate-defying skyscrapers, automated traffic grids, carbon-negative concrete, and mega-bridges aligned with EAC/BEM standards.',
    notes: [
      {
        id: 'c_kcea1111',
        title: 'KCEA1111: Engineering Mechanics & Land Surveying BIM',
        category: 'Surveying & Graphics',
        difficulty: 'Beginner',
        time: '14 mins read',
        downloads: 2300,
        year: 1,
        semester: 1,
        courseCode: 'KCEA1111',
        iptaCurriculumNote: 'Year 1 Foundation: Mandatory EAC WA1 course across Malaysian civil engineering faculties (UM/UTM/UKM).',
        eacOutcome: 'WA1: Spatial Surveying & Engineering Documentation',
        overview: 'Total station electronic distance measurement (EDM), leveling differential loops, coordinate contour leveling, GPS geodetic systems, and Building Information Modeling (BIM) architectural drafting.',
        keyFormulas: [
          'Elevation by Leveling: RL_curr = HI - FS (where HI = RL_bm + BS)',
          'Coordinate Latitude & Departure: Lat = L * cos(θ), Dep = L * sin(θ)',
          'Bowditch Traverse Correction: Cor_Lat = - (Total_Error_Lat / Perimeter) * L_leg'
        ],
        coreConcepts: [
          'Allowable closing error tolerances in closed polygon loop traverses',
          'Earthwork cut and fill volume calculations via Simpson’s and End Area rules',
          'National grid projection (RSO Malaya & Cassini-Soldner)'
        ]
      },
      {
        id: 'c_kcea2112',
        title: 'KCEA2112: Fluid Mechanics & Open Channel Hydraulics (SMART Tunnel)',
        category: 'Hydraulics & Water Resources',
        difficulty: 'Intermediate',
        time: '18 mins read',
        downloads: 1820,
        year: 2,
        semester: 2,
        courseCode: 'KCEA2112',
        iptaCurriculumNote: 'Year 2 Core Discipline: EAC WA2 analytical problem solving covering flood mitigation and hydraulic jumps.',
        eacOutcome: 'WA2: Open Channel Fluid Dynamics & Flood Routing',
        overview: 'Manning’s formula for open channel uniform flow, hydraulic radius, specific energy diagrams, critical flow depth, and hydraulic jump energy dissipation modeled on the Kuala Lumpur SMART Tunnel.',
        keyFormulas: [
          'Manning Equation: Q = (1 / n) * A * R^(2/3) * S_0^(1/2)',
          'Froude Number: Fr = v / sqrt(g * y_h) (Fr > 1: Supercritical, Fr < 1: Subcritical)',
          'Hydraulic Jump Conjugate Depth: y2 / y1 = 0.5 * (sqrt(1 + 8*Fr1^2) - 1)'
        ],
        coreConcepts: [
          'Dual-purpose stormwater storage and highway transit tunnel routing',
          'Spillway stilling basins and energy dissipation baffles',
          'Urban drainage design using MSMA (Manual Saliran Mesra Alam 2nd Ed.)'
        ]
      },
      {
        id: 'c_kcea3113',
        title: 'KCEA3113: Reinforced Concrete Design to Eurocode 2 (MS EN 1992)',
        category: 'Structural Engineering',
        difficulty: 'Intermediate',
        time: '22 mins read',
        downloads: 1650,
        year: 3,
        semester: 1,
        courseCode: 'KCEA3113',
        iptaCurriculumNote: 'Year 3 Core Discipline: Mandatory EAC WA3 curriculum aligned with Malaysian Standard Eurocode 2.',
        eacOutcome: 'WA3: Structural Element Design & Safety Factor Enforcements',
        overview: 'Ultimate Limit State (ULS) bending, shear links design, Serviceability Limit State (SLS) crack width and deflection checks, and column axial-moment interaction charts.',
        keyFormulas: [
          'Design Ultimate Moment: M_Ed <= M_Rd = F_cd * z = (0.567 * f_ck * b * d_eff * (1 - 0.4*s)) * z',
          'Tensile Steel Area: A_s = M_Ed / (0.87 * f_yk * z)',
          'Shear Capacity: V_Rd,c = [C_Rd,c * k * (100 * ρ_l * f_ck)^(1/3)] * b_w * d'
        ],
        coreConcepts: [
          'Stress block parameters for concrete grades C25/30 up to C50/60',
          'Shear reinforcement link spacing and curtailment anchorage length',
          'Durability exposure classes (XC, XD, XS) and minimum concrete cover requirements'
        ]
      },
      {
        id: 'c_kcea4114',
        title: 'KCEA4114: Seismic Structural Damping & Green Geopolymer Capstone',
        category: 'Capstone Structural Systems',
        difficulty: 'Advanced',
        time: '26 mins read',
        downloads: 1200,
        year: 4,
        semester: 1,
        courseCode: 'KCEA4114',
        iptaCurriculumNote: 'Year 4 Capstone Integrated Design Project (IDP) & Final Year Project: EAC WA3, WA6, WA7 & BEM Code of Ethics.',
        eacOutcome: 'WA3, WA6 & WA7: Sustainable Supertall Structural Engineering & Ethics',
        overview: 'Tuned mass dampers (TMD), base isolation lead-rubber bearings, wind tunnel aeroelastic damping, and CO2 mineralization in green geopolymer concrete for carbon-neutral skyscrapers.',
        keyFormulas: [
          'Natural Frequency: f_n = (1 / 2π) * sqrt(k / m)',
          'Damping Ratio: ζ = c / (2 * sqrt(k * m))',
          'Carbonation Reaction: Ca(OH)2 + CO2 -> CaCO3 + H2O'
        ],
        coreConcepts: [
          'Pendulum tuned mass damper frequency tuning matching the building modal period',
          'Supplementary cementitious materials (palm oil fuel ash - POFA, GGBS, biochar)',
          'Life Cycle Assessment (LCA) cradle-to-gate embodied carbon reductions'
        ]
      }
    ],
    videos: [
      {
        id: 'v_c1',
        title: 'How Tuned Mass Dampers Stop Supertall Skyscrapers Swaying',
        creator: 'Civil Engineering Pulse',
        duration: '18:40',
        views: '540K',
        url: 'https://youtube.com',
        year: 4,
        labType: 'FYP / Capstone',
        topics: ['Merdeka 118 Dampers', 'Harmonic Resonance', 'Wind Tunnel Boundary Simulation'],
        description: 'Visualized physics breakdown of the pendulum dampers and outrigger trusses stabilizing megatall structures.'
      },
      {
        id: 'v_c2',
        title: 'Malaysian EAC Lab: Reinforced Concrete Slump & Compressive Test',
        creator: 'UTM / UiTM Civil Engineering Labs',
        duration: '26:15',
        views: '52K',
        url: 'https://youtube.com',
        year: 2,
        labType: 'Virtual Lab',
        topics: ['Concrete Batching', '7-Day & 28-Day Curing', 'Compression Machine Test', 'MS EN 12390'],
        description: 'Complete EAC standard university concrete lab testing slump height, cube crushing strength, and failure crack patterns.'
      },
      {
        id: 'v_c3',
        title: 'Kuala Lumpur SMART Tunnel: Stormwater Diverting Engineering',
        creator: 'MegaInfrastructures Documentary',
        duration: '31:10',
        views: '215K',
        url: 'https://youtube.com',
        year: 3,
        labType: 'Lecture',
        topics: ['Hydraulic Gates', 'Mode 1-4 Operations', 'Underground Stormwater Basins'],
        description: 'Deep engineering breakdown of Malaysia\'s dual-purpose SMART tunnel redirecting 3 million cubic meters of floodwater.'
      },
      {
        id: 'v_c4',
        title: 'Eurocode 2 Beam Design: Step-by-Step Ultimate Limit State (ULS)',
        creator: 'Structural Eurocode Academy',
        duration: '42:30',
        views: '110K',
        url: 'https://youtube.com',
        year: 3,
        labType: 'Design Workshop',
        topics: ['Bending Moment Diagram', 'Neutral Axis Depth', 'Steel Area Calculation', 'Shear Links'],
        description: 'Full design calculation example sizing singly and doubly reinforced rectangular beams to MS EN 1992.'
      }
    ],
    industryProjects: [
      {
        id: 'ip_c1',
        title: 'ECRL Mega Viaducts & Continuous Bridge Dynamics',
        organization: 'Malaysia Rail Link (MRL) & ECRL Consortium',
        budget: 'RM 74.9B',
        status: 'Under Construction',
        malaysianContext: 'Connecting Port Klang (Selangor) through Bentong and Kuantan to Kota Bharu (Kelantan).',
        impact: 'Constructing over 120km of elevated prestressed box-girder viaducts designed to withstand tropical flash floods and high-speed dynamic train braking loads.',
        timeline: 'Q1 2021 - Q4 2027',
        keyMilestones: [
          'Genteng Tunnel (16.39km) dual-bore TBM breakthrough achieved',
          'Longest railway viaduct spanning over 13km completed ahead of schedule',
          'Dynamic load proof tests completed with 100-ton simulated axle trains'
        ],
        techStack: ['Prestressed Box Girders', 'MIDAS Civil FEA', 'BIM Level 2', 'Geotechnical Soil Nailing']
      },
      {
        id: 'ip_c2',
        title: 'Vertical Forest Sky Tower with Smart Greywater Recycling',
        organization: 'EcoArc Global & TRX City Masterplan (Kuala Lumpur)',
        budget: 'RM 145M',
        status: 'Under Construction',
        malaysianContext: 'Integrated into Tun Razak Exchange (TRX) sustainable precinct.',
        impact: 'Absorbs 450 metric tons of carbon annually while filtering urban heat islands and collecting rainwater runoff for zero-potable irrigation.',
        timeline: 'Q2 2023 - Q4 2026',
        keyMilestones: [
          'Cantilevered balconies with integrated root barriers and drainage channels',
          'Smart misting sensors automating greywater supply based on humidity sensors',
          'Achieved GBI (Green Building Index) Platinum certification rating'
        ],
        techStack: ['Tekla Structures', 'Rhino Grasshopper', 'IoT Soil Telemetry', 'UHPC Concrete']
      }
    ],
    diyProjects: [
      {
        id: 'diy_c_y1',
        title: 'Balsa Wood Truss Bridge Load Capacity Competition',
        level: 'Beginner',
        targetYear: 'Year 1 Mini Project',
        iptaAlignment: 'Standard Year 1 Civil Engineering Society Bridge Competition in UTM, UM, USM & UiTM.',
        estHours: '10 hrs',
        stack: ['Balsa Wood', 'Cyanoacrylate Glue', 'Truss CAD', 'Strength-to-Weight Optimization'],
        description: 'Design and build a 500mm span Pratt or Warren truss bridge under 50g total weight capable of sustaining >25kg downward center load.',
        components: [
          '3mm x 3mm Balsa Wood Strips',
          'CA Adhesive + Accelerator Spray',
          'Hanging Bucket and Loading Weights',
          'Precision Digital Scale'
        ],
        assemblyPhases: [
          'Phase 1: Calculate member forces using method of joints to locate tension vs compression struts',
          'Phase 2: Pin members onto 1:1 scale blueprint template and bond gusset plates',
          'Phase 3: Conduct destructive load testing and calculate structural efficiency ratio'
        ]
      },
      {
        id: 'diy_c1',
        title: 'Smart Structural Strain Monitoring Node',
        level: 'Beginner',
        targetYear: 'Year 2 Design Lab',
        iptaAlignment: 'Meets EAC WA2 requirements for Structural Instrumentation & Sensory Diagnostics.',
        estHours: '12 hrs',
        stack: ['Strain Gauges', 'Arduino Nano', 'HX711 ADC', 'MQTT Dashboard'],
        description: 'Attach foil strain sensors to bridge chord models to log real-time micro-strain deformation during incremental loading.',
        components: [
          '120 Ohm Resistance Foil Strain Gauges (BF350)',
          'HX711 24-Bit ADC Wheatstone Bridge Amplifier Module',
          'Arduino Nano or Raspberry Pi Pico',
          'Calibrated Test Weights (1kg - 10kg)'
        ],
        assemblyPhases: [
          'Phase 1: Bond foil strain gauge to lower chord using cyanoacrylate adhesive',
          'Phase 2: Wire quarter-bridge Wheatstone configuration with precision balance resistors',
          'Phase 3: Calibrate zero-load baseline in microcontroller firmware',
          'Phase 4: Incrementally apply test loads and plot stress-strain hysteresis curve'
        ]
      },
      {
        id: 'diy_c2',
        title: 'Generative Parametric Space Truss in Grasshopper (Year 4 Capstone/FYP)',
        level: 'Advanced',
        targetYear: 'Year 4 Capstone / FYP',
        iptaAlignment: 'Aligned with Universiti Malaya (UM) & UTM Final Year Project (PSM) Computational Design Track.',
        estHours: '25 hrs',
        stack: ['Rhino 3D', 'Grasshopper', 'Karamba3D FEA Plugin', 'Galapagos Optimizer'],
        description: 'Script parametric algorithmic structural space trusses that minimize material weight while maximizing load-bearing capacity and seismic damping.',
        components: [
          'Rhinoceros 3D (v7 or v8)',
          'Grasshopper Visual Scripting Canvas',
          'Karamba3D Structural Finite Element Analysis plugin'
        ],
        assemblyPhases: [
          'Phase 1: Define boundary surfaces and support anchor nodes in Rhino',
          'Phase 2: Build parametric space truss wireframe generator in Grasshopper',
          'Phase 3: Apply point loads and cross-section material profiles in Karamba3D',
          'Phase 4: Run genetic algorithm (Galapagos) optimization to minimize mass and deflection'
        ]
      }
    ]
  }
};

export const INITIAL_COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: 'p1',
    title: 'NeonPulse - Wearable ECG Haptic Feedback Rig',
    author: 'Alex Chen (UTM Skudai Alumni)',
    field: 'elec',
    fieldTitle: 'Electrical & Photonic',
    likes: 42,
    techStack: ['KiCAD', 'ESP32', 'BLE', 'FastLED', 'FreeRTOS'],
    description: 'An open-source biometric sleeve developed for university medical mechatronics that translates real-time pulse rate into dynamic neon LED pulses and micro-vibration haptics.',
    repoUrl: 'https://github.com/alexchen/neonpulse-ecg',
    seekingMembers: true,
    lookingFor: 'C++ Firmware Dev & 3D Enclosure Designer',
    bookmarked: false
  },
  {
    id: 'p2',
    title: 'AeroGlide Self-Navigating Tilt-Rotor Drone',
    author: 'Sarah Jenkins & Team Robocon Malaysia',
    field: 'mech',
    fieldTitle: 'Mechanical & Robotics',
    likes: 68,
    techStack: ['PX4 Autopilot', 'Carbon Fiber', 'ROS2', 'SolidWorks', 'LiDAR'],
    description: 'A quadcopter platform with tilt-rotor forward transition capable of 45-minute continuous flight, 3D LiDAR collision avoidance, and autonomous battery swap designed for rural medical delivery in Sabah.',
    repoUrl: 'https://github.com/jenkins-aero/aeroglide-px4',
    seekingMembers: false,
    lookingFor: null,
    bookmarked: true
  },
  {
    id: 'p3',
    title: 'NeuralArchitect - AI Structural CAD Optimizer',
    author: 'Devon Vance (UM Computer Science)',
    field: 'cs',
    fieldTitle: 'Computer Science & AI',
    likes: 115,
    techStack: ['Python', 'PyTorch', 'Three.js', 'FastAPI', 'WASM'],
    description: 'Web application that takes 2D room blueprints and generates fully compliant 3D structural beam skeletons optimized for 3D concrete printing with finite element validation.',
    repoUrl: 'https://github.com/devonvance/neural-architect',
    seekingMembers: true,
    lookingFor: 'Frontend React/Three.js Engineer',
    bookmarked: false
  },
  {
    id: 'p4',
    title: 'GeoGrid Seismic Telemetry Mesh (Penang Bridge)',
    author: 'Amina Diallo (USM Engineering Campus)',
    field: 'civil',
    fieldTitle: 'Civil & Smart Infrastructure',
    likes: 54,
    techStack: ['LoRaWAN', 'MEMS Accelerometer', 'MQTT', 'InfluxDB', 'Grafana'],
    description: 'Low-cost distributed vibration nodes placed across bridge abutments to detect micro-cracks and structural resonance shifts prior to visible failure.',
    repoUrl: 'https://github.com/aminadiallo/geogrid-mesh',
    seekingMembers: true,
    lookingFor: 'Embedded C Dev & Structural Data Analyst',
    bookmarked: false
  },
  {
    id: 'p5',
    title: 'BEM-Compliant Automatic Beam Sizing Engine to EC2',
    author: 'Hafiz Radzi (UiTM Shah Alam)',
    field: 'civil',
    fieldTitle: 'Civil & Smart Infrastructure',
    likes: 76,
    techStack: ['Python', 'Streamlit', 'Eurocode 2', 'NumPy'],
    description: 'Generates calculation reports for singly and doubly reinforced concrete beams strictly following MS EN 1992 for Malaysian Board of Engineers endorsement.',
    repoUrl: 'https://github.com/hafizradzi/ec2-beam-calc',
    seekingMembers: true,
    lookingFor: 'Full-Stack React Developer',
    bookmarked: false
  }
];

export const INITIAL_SQUADS: EngineeringSquad[] = [
  {
    id: 's1',
    title: 'Project Cyber-Rover: Autonomous Mars Simulation Vehicle',
    lead: 'Dr. Marcus Vance (UTM Mechatronics)',
    field: 'mech',
    membersNeeded: ['Computer Vision Specialist', 'Motor Driver Electronics Eng', 'Telemetry UI Dev'],
    description: 'We are assembling a cross-university Malaysian team to build a 1/4 scale planetary rover with rocker-bogie suspension for the upcoming International RoboChallenge.',
    spotsLeft: 2,
    contactEmail: 'm.vance@planetary-forge.org'
  },
  {
    id: 's2',
    title: 'Bio-Grid Energy Monitoring Firmware for Malaysian Green Campuses',
    lead: 'Elena Rostova & UKM Green Energy Group',
    field: 'elec',
    membersNeeded: ['Rust/Embedded Firmware Dev', 'UI/UX Visualizer'],
    description: 'Designing an ultra-low power wireless mesh network node to track urban solar microgrid efficiency and phase synchronization in university campuses.',
    spotsLeft: 1,
    contactEmail: 'elena@biogrid.io'
  },
  {
    id: 's3',
    title: 'Generative Carbon-Bust Tower Design for ASEAN Climates',
    lead: 'Tariq Al-Mansoor (UM Architectural Civil)',
    field: 'civil',
    membersNeeded: ['Grasshopper/Parametric Specialist', 'Environmental Structural Eng'],
    description: 'Developing open parametric models for modular skyscraper facades that maximize airflow velocity for integrated micro-wind turbines in humid tropical climates.',
    spotsLeft: 3,
    contactEmail: 'tariq@skyforge.arch'
  },
  {
    id: 's4',
    title: 'Quantum-Sim: Malaysian IPTA Browser-Based Transmon Emulator',
    lead: 'Dr. Kaiya Sato (USM Physics & CS)',
    field: 'cs',
    membersNeeded: ['WebAssembly Engineer', 'Mathematical Physics Reviewer'],
    description: 'Building an interactive open-source educational simulator displaying multi-qubit Bloch spheres and phase interference in real-time WebGL for undergraduate students.',
    spotsLeft: 2,
    contactEmail: 'kaiya@quantumsim.dev'
  }
];
