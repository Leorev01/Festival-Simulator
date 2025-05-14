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
│   ├── components/         # Shared UI components
|   ├── contexts/           # Context management
│   ├── features/
│   │   ├── festival/       # Artist, stage, amenity selection
│   │   └── simulation/     # Simulation logic and panel
│   ├── pages/              # Route-level pages
│   ├── utils/              # Calculation and persistence utils
├── README.md               # First readme containing information about the project
├── CALCULATION_LOGIC.md    # Second readme containing the logic for the calculations
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

### 🧪 Features
- 🧍 Local login with profile
- 🎵 Select artists, stages, toilets, food vendors, staff, speakers, parking spots, and security staff
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
#### Revenue:
- **Ticket Revenue**: Based on ticket categories and attendee distribution.
- **Vendor Revenue**: Based on the number of food vendors.
- **Parking Revenue**: Based on the number of parking spots.
- **Security Revenue**: Based on the number of security staff.

#### Environmental Impact:
- Energy usage and carbon footprint based on amenities, staff, and other resources.

#### Crowd Health:
- Health score based on the number of toilets, food vendors, staff, speakers, parking spots, and security staff relative to attendance.

#### Overload Detection:
- Alerts for insufficient resources (e.g., toilets, food vendors, staff, speakers, parking spots, security staff).

---

### 💾 Data Storage & Export
- All user selections are saved in localStorage.
- Users can:
    - Save festival setups by name.
    - Load previous setups.
    - Export setups to `.json` for external use or submission.

---

### 🖥️ Simulation Features
- Real-time simulation of festival performance.
- Dynamic updates to metrics based on weather and resource allocation.
- Visualizations for:
  - Revenue trends (ticket, vendor, parking, security, and total revenue).
  - Environmental impact (energy usage and carbon footprint).
  - Crowd health (based on resource-to-attendance ratios).

---

### 🏗️ Resource Requirements
To ensure a functioning festival, the app checks if selected resources meet the following minimums:

| Resource        | Requirement              |
|------------------|--------------------------|
| Toilets         | 1 per 75 attendees       |
| Food Vendors    | 1 per 250 attendees      |
| Staff Members   | 1 per 100 attendees      |
| Speakers        | 1 per 500 attendees      |
| Parking Spots   | 1 per 300 attendees      |
| Security Staff  | 1 per 200 attendees      |

---

### 🌱 Environmental Impact
The app calculates energy usage and carbon footprint based on the following energy consumption rates:

| Amenity          | Energy/Unit (kWh)       |
|-------------------|-------------------------|
| Toilets          | 10 kWh                  |
| Food Vendors     | 50 kWh                  |
| Staff Members    | 5 kWh                   |
| Speakers         | 300 kWh                 |
| Parking Spots    | 50 kWh                  |
| Security Staff   | 100 kWh                 |

The carbon footprint is calculated as:
```ts
carbonFootprint = totalEnergy * 0.5; // Example: Carbon footprint per kWh
```

---

### ⚠️ Overload Detection
Warnings appear in the simulation if any of the following conditions are true:
- Toilets are insufficient for the number of attendees.
- Food vendors are insufficient for the number of attendees.
- Staff members are insufficient for the number of attendees.
- Speakers are insufficient for the number of attendees.
- Parking spots are insufficient for the number of attendees.
- Security staff are insufficient for the number of attendees.

These warnings are displayed in the **Simulation Panel** to inform users of potential service failures.

---

### 📊 Summary Metrics
Displayed live to the user:
- Total CAPEX (setup cost)
- Total Energy (kWh)
- Ticket Revenue
- Vendor Revenue
- Parking Revenue
- Security Revenue
- Resource Shortage Warnings

---

### 💡 Example Use Case
1. Select artists, stages, and amenities (toilets, food vendors, staff, speakers, parking spots, security staff).
2. Configure ticket pricing and attendee distribution.
3. Simulate the festival to view:
   - Revenue breakdown (ticket, vendor, parking, security).
   - Environmental impact (energy usage and carbon footprint).
   - Crowd health score.
4. Save or export the festival setup for future use.
