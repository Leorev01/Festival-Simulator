import { createContext, useContext, useState } from 'react';

export const FestivalContext = createContext<{
  reloadKey: number;
  triggerReload: () => void;
}>({
  reloadKey: 0,
  triggerReload: () => {},
});

export const FestivalProvider = ({ children }: { children: React.ReactNode }) => {
  const [reloadKey, setReloadKey] = useState(0);
  const triggerReload = () => setReloadKey((k) => k + 1);

  return (
    <FestivalContext.Provider value={{ reloadKey, triggerReload }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => useContext(FestivalContext);
