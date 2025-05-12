import ArtistSelector from '../features/festival/ArtistSelector';
import StageSelector from '../features/festival/StageSelector';
import SummaryPanel from '../features/festival/SummaryPanel';

export default function FestivalBuilder() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🎤 Festival Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ArtistSelector />
          <StageSelector />
        </div>
        <SummaryPanel />
      </div>
    </div>
  );
}
