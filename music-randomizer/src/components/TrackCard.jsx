import { useMemo } from "react";

export default function TrackCard({ track }) {
  const {
    trackName, artistName, collectionName,
    primaryGenreName, trackTimeMillis, releaseDate, previewUrl
  } = track;

  const duration = useMemo(() => {
    if (!trackTimeMillis) return "";
    const total = Math.floor(trackTimeMillis / 1000);
    const m = Math.floor(total / 60).toString();
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [trackTimeMillis]);

  return (
    <>
      <h2 className="track-title">{trackName}</h2>
      <p className="track-artist">{artistName}</p>
      <div className="pills">
        {collectionName && <span className="pill">{collectionName}</span>}
        {primaryGenreName && <span className="pill">{primaryGenreName}</span>}
        {duration && <span className="pill">{duration}</span>}
        {releaseDate && <span className="pill">{new Date(releaseDate).getFullYear()}</span>}
      </div>
      <div className="audio">
        <audio controls src={previewUrl} style={{ width: "100%" }} />
      </div>
    </>
  );
}
// Событие → setState → useEffect → fetch → setTracks → рендер карточки
// onSearch меняет query → useEffect перезапрашивает API → обновляется UI