import ArtistSelector from '../features/festival/ArtistSelector';
import StageSelector from '../features/festival/StageSelector';

export default function FestivalBuilder() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🎤 Festival Builder</h1>
      <ArtistSelector />
      <StageSelector />
    </div>
  );
}
