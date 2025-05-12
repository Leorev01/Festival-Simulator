// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentFestivalData(): any {
  return {
    name: `Festival_${new Date().toISOString()}`,
    timestamp: new Date().toISOString(),
    artists: JSON.parse(localStorage.getItem('selected-artists') || '[]'),
    stages: JSON.parse(localStorage.getItem('selected-stages') || '[]'),
    amenities: JSON.parse(localStorage.getItem('selected-amenities') || '{}'),
  };
}

export function saveFestival(name: string) {
  const all = JSON.parse(localStorage.getItem('saved-festivals') || '[]');
  const current = getCurrentFestivalData();
  current.name = name;
  const updated = [...all, current];
  localStorage.setItem('saved-festivals', JSON.stringify(updated));
}

export function getSavedFestivals() {
  return JSON.parse(localStorage.getItem('saved-festivals') || '[]');
}
