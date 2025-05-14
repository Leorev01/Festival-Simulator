# 🎪 Festival Simulation App

A full-stack local web application that allows users to design and simulate their own music festival, including artist/stage/vendor selection/speakers, performance simulation, and cost/revenue metrics.

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
|   ├── contexts/           # Context management
│   ├── features/
│   │   ├── auth/           # Login logic
│   │   ├── festival/       # Artist, stage, amenity selection
│   │   └── simulation/     # Simulation logic and panel
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route-level pages
│   ├── services/           # Data logic and handlers
│   ├── utils/              # Calculation and persistence utils
├── README.md               #First read me containing information about project
├── CALCULATION_LOGIC.md    #Second read me containing the logic for the calculations
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### 🧪 Features
- 🧍 Local login with profile
- 🎵 Select artists, stages, toilets, food vendors, and staff
- 🎟️ Configure ticket pricing and attendee distribution
- 📊 Simulate crowd impact, resource needs, and revenue
- 🌱 Calculate environmental impact (energy usage and carbon footprint)
- ✅ Evaluate crowd health based on amenities and attendance
- 💡 Calculate CAPEX, OPEX, energy use, and overloads
- 💾 Save/load/export festival setups as JSON
- ⚙️ Works entirely offline (localStorage-based)

---

### 📁 Dependencies
- React + TypeScript

- Tailwind CSS

- React Router

- Vite (build tool)

---

### 📊 Key Metrics
 - Revenue:
     - Ticket revenue based on ticket categories and attendee distribution.
     - Vendor revenue based on the number of food vendors.
 - Environmental Impact:
Energy usage and carbon footprint based on amenities and staff.
 - Crowd Health:
     - Health score based on the number of toilets, food vendors, and staff relative to attendance.
 - Overload Detection:
     - Alerts for insufficient resources (e.g., toilets, food vendors, staff).

---

### 💾 Data Storage & Export
- All user selections are saved in localStorage.
- Users can:
    - Save festival setups by name.
    - Load previous setups.
    - Export setups to .json for external use or submission.

---

### 🖥️ Simulation Features
- Real-time simulation of festival performance.
- Dynamic updates to metrics based on weather and resource allocation.
- Visualizations for revenue trends, environmental impact, and crowd health.