# 🧠 Festival Simulation Logic & Assumptions

This document explains the logic and real-world assumptions used to simulate a music festival, calculate resources, and project revenue/costs.

---

## 🎫 Ticket Revenue

```ts
ticketRevenue = attendance * ticketPrice;
```
🍔 Vendor Revenue
```ts
vendorRevenue = foodVendors * 500;
```
🚽 Required Amenities
```ts
To ensure a safe and functioning festival, the following minimum ratios are enforced:
```
Resource	        Requirement
Toilets     	    1 per   75  attendees
Food Vendors	    1 per   250 attendees
Staff Members	    1 per   100 attendees

### 🏗️ CAPEX / OPEX / Energy Use
Every festival element has associated setup costs and energy consumption:

#### 🎤 Artists
```ts
cost: artist.cost
energy: artist.energy
```
#### 🏟️ Stages
```ts
cost: stage.cost
energy: stage.energy
```
#### 🚻 Amenities
```ts
cost = count * costPerUnit
energy = count * energyPerUnit
```
Amenity	        Cost/Unit	Energy/Unit
Toilet	        $1,000	    10 kWh
Food Vendor	    $3,000	    50 kWh
Staff Member	$500	    5 kWh

### ⚠️ Overload Detection
Warnings are triggered in the simulation if selected resources are insufficient:
```ts
if (toilets < required) show warning;
if (staff < required) show warning;
if (food < required) show warning;
```
These are displayed in the Simulation Panel with contextual messages.

### 📊 Summary Metrics
Displayed live to the user:

- Total CAPEX (setup cost)

- Total Energy (kWh)

- Ticket Revenue

- Vendor Revenue

- Resource Shortage Warnings

### 💾 Data Storage & Export
Festival setups (artists, stages, amenities) are stored in localStorage

Users can:

- Save setups by name

- Load saved setups

- Export setups to .json for external use or submission