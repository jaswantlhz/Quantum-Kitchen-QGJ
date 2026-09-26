# 🍳 Quantum Kitchen: Cosmic Threads

> **An interactive non-Abelian Fibonacci Anyon Topological Quantum Simulator disguised as a fast-paced cosmic restaurant.**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Design System](https://img.shields.io/badge/Design-IBM_Qiskit_%26_Carbon-0f62fe)](https://carbondesignsystem.com/)

---

## 📖 Table of Contents
1. [Introduction & Physics Premise](#-introduction--physics-premise)
2. [How to Play (Kitchen Gameplay Mechanics)](#-how-to-play-kitchen-gameplay-mechanics)
3. [Architecture & Tech Stack](#-architecture--tech-stack)
4. [Project Structure](#-project-structure)
5. [Getting Started & Local Setup](#-getting-started--local-setup)
6. [Developer & Customization Guide](#-developer--customization-guide)
   - [How to Change / Add Music & Synthesizer Audio](#1-how-to-change--add-music--synthesizer-audio)
   - [How to Change / Add Sketched Ingredients & Art](#2-how-to-change--add-sketched-ingredients--art)
   - [How to Add New Recipes & Target Flavor Profiles](#3-how-to-add-new-recipes--target-flavor-profiles)
   - [How to Add New Appliances & Quantum Physics Transforms](#4-how-to-add-new-appliances--quantum-physics-transforms)
   - [How to Customize Bloub AI Sous-Chef Hints & Expressions](#5-how-to-customize-bloub-ai-sous-chef-hints--expressions)
7. [Scientist Admin Portal & Dataset Export](#-scientist-admin-portal--dataset-export)
8. [License](#-license)

---

## 🌌 Introduction & Physics Premise

In 2D topological quantum computing, quantum information is encoded not in local fragile states, but in the **global topological braiding history of quasiparticles called non-Abelian anyons**.

In **Quantum Kitchen**, ingredient strands behave as **Fibonacci Anyons ($\tau$)** with the universal fusion rule:
$$\tau \otimes \tau = 1 \oplus \tau$$

Where:
* **$1$ (Identity Channel)**: The strands annihilate into trivial quantum vacuum (burnt ash).
* **$\tau$ (Non-Trivial Channel)**: The strands preserve their non-Abelian quantum state (delicious composite dishes).
* **Golden Ratio ($\tau = \frac{\sqrt{5}-1}{2} \approx 0.618034$)**: The fundamental topological quantum invariant governing superposition and state transitions.

Braiding strands exchanges anyon positions in 2D space-time, generating unitary transformations in the **Braid Group $B_N$**:
* **Odd Lanes ($1, 3, 5\dots$)**: Apply the **$R$-Matrix** (diagonal phase rotation $e^{\pm i \phi}$).
* **Even Lanes ($2, 4, 6\dots$)**: Apply the **$F$-Matrix** (basis transformation mixing quantum states via the golden ratio).

---

## 🍳 How to Play (Kitchen Gameplay Mechanics)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUANTUM KITCHEN WORKFLOW                        │
│                                                                        │
│   [ Order Ticket ]  ──▶  [ Tactile Braid Loom ]  ──▶  [ Fusion Reactor]│
│   Target Flavors         Weave Strands & Stations      Plate 3-Star    │
│   (Sweet, Sour, Spicy)   Apply σᵢ & Mixer Merges       Dish or Burn!   │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. The Active Order Ticket
Each cosmic recipe specifies a target flavor vector:
* **Sweetness**: Driven by forward accumulated quantum phase $\phi$.
* **Sourness / Tartness**: Driven by rapid alternation between $R$ and $F$ transformation bases.
* **Spiciness / Heat**: Driven by single-lane twists and frying pan searing.
* **Umami**: Driven by balanced state superposition ($|\alpha| \approx |\beta|$) and boiling pot simmer.

### 2. Weaving on the Quantum Loom
* **Weave Over ($\sigma_i$)**: Weaves strand $i+1$ over strand $i$.
* **Weave Under ($\sigma_i^{-1}$)**: Weaves strand $i+1$ under strand $i$ (the topological inverse).
* **Identity Cancellation Warning**: Braiding $\sigma_i$ followed immediately by $\sigma_i^{-1}$ cancels out ($\sigma_i \cdot \sigma_i^{-1} = 1$) without altering the quantum phase.

### 3. Kitchen Stations & Appliances
Selecting a station before weaving transforms the underlying physics:
* 🔪 **Chop Board**: Accelerates phase rotation ($1.5\times$ phase multiplier $\to$ boosts Sweetness).
* 🌪️ **Blender**: Maximizes state superposition ($1.4\times$ boost $\to$ boosts Tartness).
* 🍳 **Sear Pan**: Applies thermal excitation (ramps up Spiciness).
* 💧 **Wash Basin**: Purifies decoherence glitches and thermal noise.
* 🍲 **Boil Pot**: Simmers balanced entanglement for deep Umami.

### 4. Mixer Merging ($\lightning$)
Activating **Mixer Merge** before a crossing fuses adjacent strands into a single composite thread (like layered sandwiches or cosmic ramen), drastically amplifying the final plated score.

### 5. The Umami Multiplier Ladder
Compound credit payouts by building long, coherent braids:
* **3 Crossings**: $1.2\times$ Multiplier
* **5 Crossings**: $1.5\times$ Multiplier
* **7 Crossings**: $2.0\times$ Multiplier
* **9+ Crossings**: $3.14\times$ ($\pi$) Transcendence

### 6. Thermal Noise & Cryo-Stabilizers
Complex braids with many strands accumulate thermal decoherence. If jitter exceeds tolerance, wave function collapse reduces dishes into *Burnt Quantum Ash*. Upgrade **Cryo-Stabilizers** in the Pantry to safeguard flavor fidelity.

---

## 🛠️ Architecture & Tech Stack

* **Framework**: Next.js 15+ (App Router, Turbopack, React 19)
* **Language**: TypeScript 5.0 (Strict mode, complete algebraic typing)
* **Styling**: Vanilla CSS + Tailwind CSS configured to the **IBM Qiskit & Carbon Design System** (Dark `#121212` / `#161616` and Light `#f4f4f4` palettes, clean 1px borders, zero neon glows)
* **Graphics**: Hardware-accelerated HTML5 Canvas with **High-DPI (`devicePixelRatio`) Buffer Scaling** for retina sharpness
* **Audio**: Zero external audio files — 100% procedurally synthesized in real time via the **Web Audio API**
* **Mascot**: Official animated SVG companion with 3D mouse cursor perspective tracking
* **Database**: MongoDB (via Mongoose) with automatic in-memory fallback for zero-setup local play

---

## 📂 Project Structure

```
qgj/
├── app/
│   ├── admin/page.tsx               # Scientist Admin Portal & Quantum Visualizers
│   ├── api/braids/                  # REST API for braid persistence & CSV/JSON exports
│   ├── globals.css                  # IBM Qiskit Carbon tokens & typography
│   ├── layout.tsx                   # Root HTML layout with theme providers
│   └── page.tsx                     # Main Quantum Kitchen vertical pipeline
├── components/
│   ├── admin/                       # Bloch Sphere, Unitary Matrix & Braid Word inspectors
│   ├── game/
│   │   ├── BloubBot.tsx             # Animated SVG mascot renderer with cursor tilt
│   │   ├── BraidCanvas.tsx          # High-DPI horizontal quantum wire loom canvas
│   │   ├── ChefCompanion.tsx        # Smart AI Sous-Chef dialogue bubble & ghost preview
│   │   ├── DishModal.tsx            # Post-cook fusion victory & Bloch angle inspection
│   │   ├── HowToPlayModal.tsx       # Rulebook with localStorage "Don't show again"
│   │   ├── MixingBowl.tsx           # Topological Fusion Reactor Chamber
│   │   ├── OrderTicket.tsx          # Recipe ticket rail & plain-English flavor gauges
│   │   └── StabilizerShop.tsx       # Cryo-Stabilizer Pantry upgrade deck
│   └── ui/                          # Carbon-spec buttons, dialogs, badges, tables
├── lib/
│   ├── audio/synthAudio.ts          # Pure Web Audio API synthesis engine
│   ├── db/mongodb.ts                # Database connector with in-memory fallback
│   ├── game/
│   │   ├── ingredientSketches.ts    # Procedural Canvas ingredient vector sketches
│   │   ├── recipes.ts               # Cosmic recipes & target flavor profiles
│   │   └── upgrades.ts              # Cryo-Stabilizer & Pantry progression tree
│   └── quantum/
│       ├── anyonEngine.ts           # N-Strand Fibonacci Anyon braid simulator
│       ├── bloubAdvisorEngine.ts    # 1-Step lookahead flavor solver & context arbiter
│       └── braidTypes.ts            # Type definitions for crossings, matrices, & outcomes
├── public/
│   └── bloub_svg/                   # 8 Official animated Bloub SVG expression files
└── LICENSE                          # MIT License
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **pnpm** / **yarn**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quantum-kitchen.git
   cd quantum-kitchen/qgj
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/quantum_kitchen
   ```
   *(Note: If `MONGODB_URI` is omitted, the app automatically runs in local memory mode with zero configuration!)*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Developer & Customization Guide

### 1. How to Change / Add Music & Synthesizer Audio
All sound effects in Quantum Kitchen are generated procedurally in [`lib/audio/synthAudio.ts`](file:///f:/my-files/QGJ/qgj/lib/audio/synthAudio.ts) using the Web Audio API (oscillators, biquad filters, and gain envelopes).

To add a new sound effect:
1. Open [`lib/audio/synthAudio.ts`](file:///f:/my-files/QGJ/qgj/lib/audio/synthAudio.ts).
2. Create a method on the `SynthAudioEngine` class:
   ```ts
   public playCustomSound(frequency: number = 440) {
     if (this.isMuted) return;
     const ctx = this.getAudioContext();
     const osc = ctx.createOscillator();
     const gain = ctx.createGain();

     osc.type = 'triangle'; // 'sine' | 'square' | 'sawtooth' | 'triangle'
     osc.frequency.setValueAtTime(frequency, ctx.currentTime);
     osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.3);

     gain.gain.setValueAtTime(0.15, ctx.currentTime);
     gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

     osc.connect(gain);
     gain.connect(ctx.destination);

     osc.start();
     osc.stop(ctx.currentTime + 0.3);
   }
   ```
3. Call `soundFx.playCustomSound()` from any component!

---

### 2. How to Change / Add Sketched Ingredients & Art
Ingredient icons drawn on the left loom dispenser are pure procedural Canvas vector sketches defined in [`lib/game/ingredientSketches.ts`](file:///f:/my-files/QGJ/qgj/lib/game/ingredientSketches.ts).

To register a new ingredient:
1. Open [`lib/game/ingredientSketches.ts`](file:///f:/my-files/QGJ/qgj/lib/game/ingredientSketches.ts).
2. Add your ingredient entry to `INGREDIENTS`:
   ```ts
   export const INGREDIENTS: Record<string, IngredientSketchInfo> = {
     // ... existing ingredients
     avocado: {
       name: 'Cosmic Avocado',
       naturalColor: '#70a040',
       draw: (ctx, x, y, r, isLight) => {
         // Draw your custom 2D Canvas vector paths here
         ctx.fillStyle = '#70a040';
         ctx.beginPath();
         ctx.arc(x, y, r, 0, Math.PI * 2);
         ctx.fill();
         // Seed center
         ctx.fillStyle = '#8a5020';
         ctx.beginPath();
         ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
         ctx.fill();
       },
     },
   };
   ```

---

### 3. How to Add New Recipes & Target Flavor Profiles
Recipes define the strand count, required ingredients, target flavor vectors, and reward credits in [`lib/game/recipes.ts`](file:///f:/my-files/QGJ/qgj/lib/game/recipes.ts).

To add a new ticket:
1. Open [`lib/game/recipes.ts`](file:///f:/my-files/QGJ/qgj/lib/game/recipes.ts).
2. Add a new object to the `COSMIC_RECIPES` array:
   ```ts
   {
     id: 'recipe-nebula-ramen',
     name: 'Nebula Miso Ramen',
     orderCode: 'RAM-06',
     strandCount: 4,
     ingredients: ['potato', 'carrot', 'radish', 'mushroom'],
     targetFlavor: { sweetness: 35, sourness: 20, spiciness: 65, umami: 90 },
     targetEnergy: 0.85,
     targetComplexity: 7,
     dishIcon: '🍜',
     flavorHint: 'Heavy boiled Umami with a searing spicy pan finish on Strands 2 & 3.',
     rewardCredits: 320,
   }
   ```

---

### 4. How to Add New Appliances & Quantum Physics Transforms
Appliances alter the mathematical transformations applied during a crossing.

1. Add the appliance ID to `ApplianceType` in [`lib/quantum/braidTypes.ts`](file:///f:/my-files/QGJ/qgj/lib/quantum/braidTypes.ts):
   ```ts
   export type ApplianceType = 'none' | 'chop' | 'blend' | 'pan' | 'wash' | 'boil' | 'smoke';
   ```
2. Define its physical effect in `applyBraidCrossing()` inside [`lib/quantum/anyonEngine.ts`](file:///f:/my-files/QGJ/qgj/lib/quantum/anyonEngine.ts):
   ```ts
   if (appliance === 'smoke') {
     phaseMultiplier = 2.0; // Smoking infuses high phase density
   }
   ```
3. Add the toolbar button in [`components/game/BraidCanvas.tsx`](file:///f:/my-files/QGJ/qgj/components/game/BraidCanvas.tsx).

---

### 5. How to Customize Bloub AI Sous-Chef Hints & Expressions
Bloub's intelligence is powered by [`lib/quantum/bloubAdvisorEngine.ts`](file:///f:/my-files/QGJ/qgj/lib/quantum/bloubAdvisorEngine.ts).

* **1-Step Lookahead Optimizer**: `findOptimalNextMove()` simulates permutations $(\text{lane}, \text{isOver})$ on a cloned virtual quantum engine to find the exact weave that maximizes flavor alignment.
* **Expression Mapping**: `BloubExpressionId` maps advice states to the animated SVGs in [`public/bloub_svg/`](file:///f:/my-files/QGJ/qgj/public/bloub_svg):
  * `attentif`: Optimal move preview / active concentration
  * `confus`: Identity cancel warning ($\sigma_i \cdot \sigma_i^{-1} = 1$)
  * `curieux`: Active reactor fusion
  * `excite`: 3-Star dish victory / high fidelity
  * `mefiant`: Untapped outer strand warning
  * `neutre`: Idle / ambient state
  * `surpris`: Thermal noise glitch alert
  * `timide`: Initial welcome / early moves

To add new custom advice rules, edit `generateBloubAdvice()` in [`lib/quantum/bloubAdvisorEngine.ts`](file:///f:/my-files/QGJ/qgj/lib/quantum/bloubAdvisorEngine.ts).

---

## 🔬 Scientist Admin Portal & Dataset Export

Navigate to `/admin` or click **Scientist Portal** in the top navigation bar to access advanced quantum diagnostic tools:

1. **Braid Word Generator**: View standard Artin knot theory notation (e.g. $\sigma_1 \cdot \sigma_2^{-1} \cdot \sigma_3$).
2. **2x2 Unitary Matrix ($U$)**: Inspect the real and imaginary parts of the combined unitary operator:
   $$\begin{pmatrix} u_{00} & u_{01} \\ u_{10} & u_{11} \end{pmatrix}$$
3. **Bloch Sphere Coordinates**: View 3D spherical angles $(\theta, \phi)$ and cartesian coordinates $(x, y, z)$.
4. **Dataset Export**: Export all historical and saved braid sessions as structured **CSV** or **JSON** for training machine learning models or verifying quantum knot theory algorithms.

---

## 📄 License

This project is open-source and licensed under the [MIT License](file:///f:/my-files/QGJ/qgj/LICENSE). Feel free to use, modify, distribute, and build upon this simulator for educational, scientific, or gaming projects!
