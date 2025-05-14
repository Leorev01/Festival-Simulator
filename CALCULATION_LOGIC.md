# 🧠 Festival Simulation: Calculation Logic & Assumptions

This document outlines the real-world assumptions, formulas, and logic used to simulate the performance and cost of a music festival.

---

## 📌 Covered in this file:

- Revenue formulas (tickets & vendors)
- Resource requirements (toilets, staff, food)
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
categories: Array of ticket categories with name, price, and percentage.
attendance: Total number of attendees.

## 🍔 Vendor Revenue

Vendor revenue is calculated based on the number of food vendors.


```ts
vendorRevenue = foodVendors * 500;
```
Each food vendor is assumed to generate $500 in food sales

## 🚽 Required Amenities
To ensure a functioning festival, the app checks if selected resources meet the following minimums:
```ts
Resource	    Requirement
Toilets     	    1 per   75  attendees
Food Vendors	    1 per   250 attendees
Staff Members	    1 per   100 attendees
Speakers            0 per   0 attendees
```
These values are used in the simulation to determine whether your setup is under-resourced.

### 🏗️ CAPEX / OPEX / Energy Use
Each component contributes to total cost and energy usage.

#### 🎤 Artists
```ts
cost = artist.cost
energy = artist.energy
```
Each artist contributes to the total cost and energy usage.

#### 🏟️ Stages
```ts
cost = stage.cost
energy = stage.energy
```
Larger stages increase both setup cost and power usage

#### 🚻 Amenities
```ts
cost = count * costPerUnit
energy = count * energyPerUnit
```
```ts
Amenity	        Cost/Unit	Energy/Unit
Toilet	        $1,000	        10 kWh
Food Vendor     $3,000          50 kWh
Staff Member	$500	        5 kWh
```

#### 🌱 Environmental Impact
The environmental impact is calculated based on energy usage and carbon footprint.
```ts
energyUsage = amenities.reduce((sum, amenity) => sum + (amenity.count * amenity.energyPerUnit), 0);
carbonFootprint = energyUsage * 0.5; // Example: Carbon footprint per kWh
```

#### ✅ Crowd Health
The crowd health score is calculated based on the number of toilets, food vendors, and staff relative to attendance.
```ts
crowdHealthScore = Math.min(
  100,
  Math.round((toilets * 10 + foodVendors * 5 + staff * 2) / (attendance / 100))
);
```

### ⚠️ Overload Detection
Warnings appear in the simulation if any of the following conditions are true:
```ts
if (toilets < required) show warning;
if (staff < required) show warning;
if (food < required) show warning;
```
These are shown as alerts in the Simulation Panel to inform users of potential service failures.

### 📊 Summary Metrics
Displayed live to the user:

- Total CAPEX (setup cost)

- Total Energy (kWh)

- Ticket Revenue

- Vendor Revenue

- Resource Shortage Warnings

### 💾 Data Storage & Export
All user selections are saved in localStorage.

Users can:

- Save festival setups by name

- Load previous setups

- Export setups to .json for external use or submission

The app works entirely offline and does not require a backend or database.