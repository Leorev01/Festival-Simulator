# 🧠 Festival Simulation: Calculation Logic & Assumptions

This document outlines the real-world assumptions, formulas, and logic used to simulate the performance and cost of a music festival.

---

## 📌 Covered in this file:

- Revenue formulas (tickets, vendors, parking, security)
- Resource requirements (toilets, staff, food, speakers, parking, security)
- CAPEX & energy usage per component
- Overload detection logic
- Summary metrics
- Local data storage & export

---

## 🎫 Ticket Revenue

Ticket revenue is calculated based on the ticket categories and the percentage of attendees in each category.

```ts
ticketRevenue = categories.reduce((sum, category) => {
  return sum + (attendance * (category.percentage / 100) * category.price);
}, 0);
```

- **categories**: Array of ticket categories with name, price, and percentage.
- **attendance**: Total number of attendees.

---

## 🍔 Vendor Revenue

Vendor revenue is calculated based on the number of food vendors.

```ts
vendorRevenue = foodVendors * 500;
```

- Each food vendor is assumed to generate $500 in food sales.

---

## 🅿️ Parking Revenue

Parking revenue is calculated based on the number of parking spots.

```ts
parkingRevenue = parkingSpots * 200;
```

- Each parking spot is assumed to generate $200 in revenue.

---

## 🛡️ Security Revenue

Security revenue is calculated based on the number of security staff.

```ts
securityRevenue = securityStaff * 100;
```

- Each security staff member is assumed to generate $100 in revenue.

---

## 🚽 Required Amenities

To ensure a functioning festival, the app checks if selected resources meet the following minimums:

```ts
Resource        Requirement
Toilets         1 per 75 attendees
Food Vendors    1 per 250 attendees
Staff Members   1 per 100 attendees
Speakers        1 per 500 attendees
Parking Spots   1 per 300 attendees
Security Staff  1 per 200 attendees
```

These values are used in the simulation to determine whether your setup is under-resourced.

---

## 🏗️ CAPEX / OPEX / Energy Use

Each component contributes to total cost and energy usage.

### 🎤 Artists

```ts
cost = artist.cost
energy = artist.energy
```

- Each artist contributes to the total cost and energy usage.

### 🏟️ Stages

```ts
cost = stage.cost
energy = stage.energy
```

- Larger stages increase both setup cost and power usage.

### 🚻 Amenities

```ts
cost = count * costPerUnit
energy = count * energyPerUnit
```

```ts
Amenity          Cost/Unit   Energy/Unit
Toilet           $1,000      10 kWh
Food Vendor      $3,000      50 kWh
Staff Member     $500        5 kWh
Speaker          $2,000      300 kWh
Parking Spot     $500        50 kWh
Security Staff   $1,000      100 kWh
```

---

## 🌱 Environmental Impact

The environmental impact is calculated based on energy usage and carbon footprint.

```ts
energyUsage = amenities.reduce((sum, amenity) => sum + (amenity.count * amenity.energyPerUnit), 0);
carbonFootprint = energyUsage * 0.5; // Example: Carbon footprint per kWh
```

---

## ✅ Crowd Health

The crowd health score is calculated based on the number of toilets, food vendors, staff, speakers, parking spots, and security staff relative to attendance.

```ts
crowdHealthScore = Math.min(
  100,
  Math.round((toilets * 10 + foodVendors * 5 + staff * 2 + speakers * 3 + parking * 2 + security * 4) / (attendance / 100))
);
```

---

## ⚠️ Overload Detection

Warnings appear in the simulation if any of the following conditions are true:

```ts
if (toilets < required) show warning;
if (staff < required) show warning;
if (food < required) show warning;
if (speakers < required) show warning;
if (parking < required) show warning;
if (security < required) show warning;
```

These are shown as alerts in the Simulation Panel to inform users of potential service failures.

---

## 📊 Summary Metrics

Displayed live to the user:

- Total CAPEX (setup cost)
- Total Energy (kWh)
- Ticket Revenue
- Vendor Revenue
- Parking Revenue
- Security Revenue
- Resource Shortage Warnings

---

## 💾 Data Storage & Export

### Why Login Without Registration?

The app includes a simple login system to allow users to personalize their experience and save festival setups. However, since the app works entirely offline and uses localStorage for data storage, a registration system is not required. This design decision ensures simplicity and avoids the need for backend infrastructure.

All user selections are saved in localStorage.

Users can:

- Save festival setups by name.
- Load previous setups.
- Export setups to `.json` for external use or submission.

The app works entirely offline and does not require a backend or database.