import ArtistSelector from '../features/festival/ArtistSelector';

export default function FestivalBuilder() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎤 Festival Builder</h1>
      <ArtistSelector />
    </div>
  );
}
