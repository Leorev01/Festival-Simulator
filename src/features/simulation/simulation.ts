interface SimulationInput {
  attendance: number;
  ticketPrice: number;
  vendorRevenuePerPerson: number;
  weather: 'sunny' | 'rainy' | 'storm';
  artists: number; // count
  stages: number; // count
  toilets: number;
  staff: number;
  energy: number; // kWh
  cost: number; // total capex
}

export interface SimulationResult {
  ticketRevenue: number;
  vendorRevenue: number;
  totalRevenue: number;
  cost: number;
  profit: number;
  weatherImpact: string;
  resourceStrain: string;
}

export function runSimulation(input: SimulationInput): SimulationResult {
  const ticketRevenue = input.attendance * input.ticketPrice;
  const vendorRevenue = input.attendance * input.vendorRevenuePerPerson;
  const totalRevenue = ticketRevenue + vendorRevenue;

  const profit = totalRevenue - input.cost;

  // Simulated logic:
  const weatherImpact =
    input.weather === 'sunny'
      ? 'Optimal'
      : input.weather === 'rainy'
      ? 'Slight delays and mud'
      : 'High risk: stage/equipment issues';

  const resourceStrain =
    input.toilets < input.attendance / 100
      ? 'Toilet shortage'
      : input.staff < input.attendance / 50
      ? 'Understaffed'
      : 'Resources OK';

  return {
    ticketRevenue,
    vendorRevenue,
    totalRevenue,
    cost: input.cost,
    profit,
    weatherImpact,
    resourceStrain,
  };
}
