import AmenitySelector from '../features/festival/AmenitySelector';
import ArtistSelector from '../features/festival/ArtistSelector';
import FestivalSaver from '../features/festival/FestivalSaver';
import StageSelector from '../features/festival/StageSelector';
import SummaryPanel from '../features/festival/SummaryPanel';
import SimulationPanel from '../features/simulation/SimulationPanel';

export default function FestivalBuilder() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🎤 Festival Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ArtistSelector />
          <StageSelector />
          <AmenitySelector />
          <SimulationPanel />
          
        </div>
        <SummaryPanel />
        <FestivalSaver />
      </div>
    </div>
  );
}
