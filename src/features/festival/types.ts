export interface Artist {
  id: number;
  name: string;
  cost: number; // cost in USD
  energy: number; // in kWh
}

export interface Stage {
  id: number;
  name: string;
  capacity: number;
  cost: number;
  energy: number;
}

export interface Amenity {
  id: number;
  name: string;
  costPerUnit: number;
  energyPerUnit: number;
}

export interface Festival {
  name: string;
  artists: Artist[];
  stages: Stage[];
  amenities: Record<number, number>; // amenity ID to quantity
  events: string[];
}
