import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Engy System Persona Prompt
const ENGY_SYSTEM_PROMPT = `
You are "Engy", an expert Cybernetic AI Engineering Assistant and Mentor specifically designed for engineering and computer science students following the Malaysian IPTA (Public University) curriculum (e.g., Universiti Malaya - UM, UTM, UKM, USM, UPM, UTHM, etc.) and Engineering Accreditation Council (EAC/BEM) standards.

Personality:
- Sharp, highly encouraging, cyberpunk-themed engineering companion ("Engy // Tactical Knowledge Node").
- Technically rigorous yet accessible: clear explanations, step-by-step mathematical proofs, formula breakdowns, and practical code snippets (C++, Python, MATLAB, Verilog, SQL).
- Deeply familiar with Malaysian IPTA course codes and structures:
  * Year 1: WIX1001 (Computing Mathematics I), WIX1002 (Fundamentals of Programming), KMEA1112 (Mechanics of Materials / Statics), KEEA1111 (Circuit Analysis I), KCEA1111 (Fluid Mechanics I)
  * Year 2: WIA2001 (Database Systems), WIA2005 (Algorithm Design & Analysis), KMEA2114 (Engineering Thermodynamics), KEEA2113 (Signals & Systems), KCEA2112 (Structural Analysis)
  * Year 3: WIA3001 (Artificial Intelligence & Machine Learning), KMEA3115 (Control Systems Engineering), KEEA3114 (Microprocessor & Embedded Systems), KCEA3113 (Geotechnical & Soil Mechanics), Industrial Training / Internship
  * Year 4: WIX4001 (Final Year Project I), WIX4002 (Final Year Project II / Capstone Design), KMEA4116 (Finite Element Analysis & CAD/CAM), KEEA4115 (Power Systems & Smart Grids), KCEA4114 (Environmental & Hydraulic Engineering)
- Understands Malaysian student culture (e.g., Final Year Projects / Capstone Design, EAC PO/CO outcomes, past year papers, lab reports, IEEE format, Viva Voce preparations).
- Always format answers with markdown headers, bullet points, clean code/math blocks, and practical IPTA study tips.
`;

// Fallback response generator if Gemini key is missing or encounters quota limits
function generateOfflineEngyResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();
  
  if (query.includes('wix1001') || query.includes('computing math') || query.includes('discrete')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: WIX1001 COMPUTING MATHEMATICS I]
**Course Focus:** Discrete Mathematics, Set Theory, Logic & Truth Tables, Combinatorics, and Matrix Algebra.

1. **Core Pillars:**
   - **Propositional & Predicate Logic:** Master conditional statements ($P \\rightarrow Q \\equiv \\neg P \\vee Q$), truth tables, and quantifiers ($\\forall, \\exists$).
   - **Set Theory & Relations:** Equivalence relations, partial orders (Posets, Hasse Diagrams), injections/surjections.
   - **Proof Techniques:** Mathematical Induction ($P(1) \\rightarrow P(k) \\rightarrow P(k+1)$), proof by contradiction, contrapositive proofs.
   - **Graph Theory & Trees:** Euler paths, Hamiltonian cycles, adjacency matrices, Minimum Spanning Trees (Kruskal/Prim).

2. **Tactical IPTA Exam Advice:**
   - Induction questions appear in 90% of finals; write formal base cases and inductive hypotheses cleanly.
   - For matrices, practice finding eigenvalues ($\\det(A - \\lambda I) = 0$) and Gaussian elimination quickly without arithmetic slips.`;
  }

  if (query.includes('wia2001') || query.includes('database') || query.includes('sql')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: WIA2001 DATABASE SYSTEMS]
**Course Focus:** Relational Database Design, ER Modeling, Normalization (1NF, 2NF, 3NF, BCNF), and SQL Querying.

1. **Normalization Drilldown:**
   - **1NF:** Eliminate repeating groups; ensure all attributes are atomic.
   - **2NF:** Must be 1NF + eliminate partial functional dependencies (every non-key attribute fully dependent on primary key).
   - **3NF:** Must be 2NF + eliminate transitive dependencies ($X \\rightarrow Y, Y \\rightarrow Z$).
   - **BCNF:** For every non-trivial functional dependency $X \\rightarrow Y$, $X$ must be a superkey.

2. **High-Yield SQL Pattern:**
\`\`\`sql
-- IPTA Exam Favorite: Aggregations with HAVING & Correlated Subqueries
SELECT s.student_id, s.name, AVG(e.grade_point) AS gpa
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE e.semester = '2025/2026-1'
GROUP BY s.student_id, s.name
HAVING AVG(e.grade_point) >= 3.75;
\`\`\`
*Pro-tip for Viva/Lab Assessment:* Always prepare your ERD with Crow's Foot notation and know how to justify 3NF decomposition without loss of functional dependencies!`;
  }

  if (query.includes('wia2005') || query.includes('algorithm') || query.includes('complexity') || query.includes('big o')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: WIA2005 ALGORITHM DESIGN & ANALYSIS]
**Course Focus:** Time & Space Complexity, Asymptotic Notations ($O, \\Omega, \\Theta$), Divide-and-Conquer, Dynamic Programming, Greedy Algorithms, and NP-Completeness.

1. **Master Theorem Reference Formula:**
   For $T(n) = aT(n/b) + f(n)$:
   - If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
   - If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
   - If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, $T(n) = \\Theta(f(n))$.

2. **Crucial DP Problem Patterns in IPTA:**
   - 0/1 Knapsack & Unbounded Knapsack
   - Longest Common Subsequence (LCS)
   - Matrix Chain Multiplication (MCM)`;
  }

  if (query.includes('wia3001') || query.includes('ai') || query.includes('machine learning')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: WIA3001 ARTIFICIAL INTELLIGENCE]
**Course Focus:** Search Strategies (Uninformed vs Informed $A^*$), Knowledge Representation, Supervised & Unsupervised Learning, Neural Networks.

1. **Key Search Formulation:**
   - $f(n) = g(n) + h(n)$ where $g(n)$ is actual cost and $h(n)$ is an admissible & consistent heuristic.
   - Minimax with $\\alpha$-$\\beta$ pruning: Prune when $\\alpha \\ge \\beta$.

2. **Backpropagation Core Equation:**
   $$\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_{ij}}$$
   *IPTA Lab Project Tip:* Use PyTorch or Scikit-learn with clean cross-validation (Stratified K-Fold) and plot confusion matrices + ROC-AUC curves for maximum marks in EAC Course Outcome 3.`;
  }

  if (query.includes('fyp') || query.includes('wix4001') || query.includes('wix4002') || query.includes('capstone') || query.includes('project')) {
    return `### [ENGY // TACTICAL GUIDANCE: WIX4001/WIX4002 FINAL YEAR PROJECT]
**EAC & IPTA Evaluation Benchmarks (Viva Voce & Technical Report):**

1. **High-Impact FYP Topics in Demand:**
   - **IoT + Edge AI:** LoRaWAN-enabled Smart Agriculture / Flood Monitoring System with TinyML anomaly detection.
   - **Clean Energy:** Dual-Axis Solar Tracker with Maximum Power Point Tracking (MPPT) & predictive irradiance modeling.
   - **Bio-Robotics:** EMG-controlled 3D printed prosthetic bionic arm with haptic feedback.
   - **Civil/Structural:** Vision-based bridge crack inspection using UAV telemetry and YOLOv11 segmentation.

2. **Report Structure Protocol (IEEE / Universiti Malaya Guidelines):**
   - Chapter 1: Problem Statement, Research Questions, Measurable Objectives, Scope & Limitations.
   - Chapter 2: Literature Review with comparative synthesis matrix of at least 15-20 peer-reviewed journal papers (Q1/Q2 preferred).
   - Chapter 3: Methodology, System Architecture, Engineering Design Calculations & Hardware/Software Specifications.
   - Chapter 4: Implementation, Data Collection & Empirical Results with Statistical Validation.
   - Chapter 5: Conclusion, EAC Complex Engineering Problem (WP1-WP7) reflection, and future work.`;
  }

  if (query.includes('ohm') || query.includes('circuit') || query.includes('keea1111')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: KEEA1111 CIRCUIT ANALYSIS]
**Fundamental Circuit Laws:**

1. **Ohm's Law & Power:**
   - $V = I \\times R$, $P = V \\times I = I^2 R = \\frac{V^2}{R}$
2. **Kirchhoff's Laws:**
   - **KCL (Nodes):** $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$
   - **KVL (Loops):** $\\sum V_{\\text{drops}} = 0$
3. **Thevenin & Norton Equivalent Circuits:**
   - $V_{\\text{th}} = V_{\\text{open circuit}}$
   - $R_{\\text{th}} = \\frac{V_{\\text{th}}}{I_{\\text{short circuit}}}$ (with all independent sources deactivated: voltage source $\\rightarrow$ short, current source $\\rightarrow$ open).`;
  }

  if (query.includes('beam') || query.includes('kmea1112') || query.includes('mechanics') || query.includes('statics')) {
    return `### [ENGY // SYLLABUS DIRECTIVE: KMEA1112 MECHANICS OF MATERIALS]
**Beam Bending & Deflection Calculations:**

1. **Flexure Formula:**
   $$\\sigma = -\\frac{M \\cdot y}{I}$$
   Where $M$ is bending moment, $y$ is distance from neutral axis, and $I$ is second moment of area (for rectangle: $I = \\frac{b h^3}{12}$).

2. **Standard Simply Supported Beam with Point Load $P$ at Midspan:**
   - Maximum Bending Moment: $M_{\\max} = \\frac{P L}{4}$
   - Maximum Deflection at Center:
     $$\\delta_{\\max} = \\frac{P L^3}{48 E I}$$
   Where $E$ is Young's Modulus and $L$ is length of the span.`;
  }

  // General default answer
  return `### [ENGY // MALAYSIAN IPTA ENGINEERING ADVISOR]
System online. I am Engy, your dedicated engineering copilot for Malaysian IPTA degree programs (UM, UTM, UKM, USM, UPM, etc.) and EAC-accredited standards.

**What would you like to explore?**
- **Course Deep Dive:** Ask about \`WIX1001\` (Math), \`WIX1002\` (Programming), \`WIA2001\` (Database), \`WIA2005\` (Algorithms), \`WIA3001\` (AI), or Year 1-4 core engineering courses (\`KMEA\`, \`KEEA\`, \`KCEA\`).
- **Formulas & Computations:** Bending moments, circuit analysis (Thevenin/Norton), Big-O proofs, thermodynamics cycles, or matrix transformations.
- **FYP & Capstone (\`WIX4001\`/\`WIX4002\`):** Project topic formulation, proposal write-ups, methodology design, and Viva Voce defense strategies.
- **Exam Prep:** Past year question breakdowns, high-frequency exam traps, and EAC PO/CO criteria.

Type any course code or engineering question below!`;
}

// AI Chat Endpoint for Engy
app.post('/api/engy/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  // If Gemini API is available, query gemini-3.8-flash
  if (aiClient) {
    try {
      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-8)) {
          if (item && item.role && item.text) {
            contents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: String(item.text) }]
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: ENGY_SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const replyText = response.text || generateOfflineEngyResponse(message);
      return res.json({ reply: replyText, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local Engy engine:', err?.message || err);
      const fallbackReply = generateOfflineEngyResponse(message);
      return res.json({ reply: fallbackReply, source: 'engy-knowledge-base' });
    }
  }

  // If no Gemini client, use high-fidelity Malaysian IPTA knowledge base
  const fallbackReply = generateOfflineEngyResponse(message);
  return res.json({ reply: fallbackReply, source: 'engy-knowledge-base' });
});

// Setup Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EngiForge] Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start EngiForge server:', err);
  process.exit(1);
});
