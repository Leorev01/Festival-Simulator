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

```ts
ticketRevenue = attendance * ticketPrice;
```
ticketPrice is fixed at $100

attendance is input by the user

---

## 🍔 Vendor Revenue

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
```
These values are used in the simulation to determine whether your setup is under-resourced.

### 🏗️ CAPEX / OPEX / Energy Use
Each component contributes to total cost and energy usage.

#### 🎤 Artists
```ts
cost = artist.cost
energy = artist.energy
```
Each component contributes to total cost and energy usage.

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
Food Vendor     $3,000      50 kWh
Staff Member	$500	        5 kWh
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

-  Load previous setups

- Export setups to .json for external use or submission

The app works entirely offline and does not require a backend or database.