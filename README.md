# 🎪 Festival Simulation App

A full-stack local web application that allows users to design and simulate their own music festival, including artist/stage/vendor selection, performance simulation, and cost/revenue metrics.

---

## 🚀 Getting Started

### 🔧 Requirements

- Node.js (v16+ recommended)
- npm

---

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Leorev01/Festival-Simulator
cd festival-sim

# Install dependencies
npm install
```
### 🖥️ Run the App Locally
```bash
npm run dev
Open http://localhost:5173 in your browser.
```
### 🗂️ Project Structure
```bash
festival-sim/
├── public/
├── src/
│   ├── assets/             # Static files
│   ├── components/         # Shared UI components
│   ├── features/
│   │   ├── auth/           # Login logic
│   │   ├── festival/       # Artist, stage, amenity selection
│   │   └── simulation/     # Simulation logic and panel
│   ├── pages/              # Route-level pages
│   ├── services/           # Data logic and handlers
│   ├── utils/              # Calculation and persistence utils
├── README.md
├── CALCULATION_LOGIC.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 🧪 Features
  🧍 Local login with profile

  🎵 Select artists, stages, toilets, food vendors, and staff

  📊 Simulate crowd impact, resource needs, and revenue

  💡 Calculate CAPEX, OPEX, energy use, and overloads

  💾 Save/load/export festival setups as JSON

  ⚙️ Works entirely offline (localStorage-based)

### 📁 Dependencies
React + TypeScript

Tailwind CSS

React Router

Vite (build tool)