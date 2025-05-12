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
