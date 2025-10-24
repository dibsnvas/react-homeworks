export default function ArtworkCard({ track }) {
  const { artworkUrl100, trackName } = track;
  const cover = (artworkUrl100 || "").replace("100x100bb.jpg", "600x600bb.jpg");
  return (
    <div className="artwork">
      <div className="square">
        <img src={cover} alt={trackName} />
      </div>
      <div className="badge">Cover Art</div>
    </div>
  );
}
