import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ArtworkCard from "./components/ArtworkCard.jsx";
import TrackCard from "./components/TrackCard.jsx";
import ControlBar from "./components/ControlBar.jsx";
import { SkeletonRow, EmptyState } from "./components/UiStates.jsx";
import { shuffle } from "./lib/shuffle.js";

export default function App() {
  const [query, setQuery] = useState("lofi");
  const [limit, setLimit] = useState(24);
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError("");
      try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=${limit}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = (json.results || []).filter(x => x.previewUrl);
        if (!cancelled) { setTracks(shuffle(items)); setIndex(0); }
      } catch(e) {
        if (!cancelled) setError("Failed to load music. Try a different query.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [query, limit]);

  const current = tracks[index] || null;
  const next = () => tracks.length && setIndex(i => (i + 1) % tracks.length);
  const prev = () => tracks.length && setIndex(i => (i - 1 + tracks.length) % tracks.length);

  return (
    <div className="container">
      <header className="header">
        <div className="brand-badge">🎵</div>
        <div>
          <h1>Music Randomizer</h1>
          <p>Search • Shuffle • Play preview</p>
        </div>
      </header>

      <div className="row">
        <SearchBar defaultValue={query} onSearch={setQuery} onReset={() => setQuery("lofi")} />
        <div className="select">
          <label>Limit</label>
          <select value={limit} onChange={(e)=>setLimit(Number(e.target.value))}>
            <option>12</option>
            <option>24</option>
            <option>48</option>
          </select>
        </div>
      </div>

      <div className="chips">
        {["lofi","edm","taylor swift","k-pop","jazz","kazakh","instrumental"].map(v => (
          <button key={v} className="chip" onClick={()=>setQuery(v)}>#{v}</button>
        ))}
      </div>

      {loading && <SkeletonRow />}

      {!loading && error && <div className="state-error">⚠️ {error}</div>}

      {!loading && !error && !current && <EmptyState />}

      {!loading && !error && current && (
        <div style={{marginTop: 24}}>
          <div className="grid-2">
            <ArtworkCard track={current} />
            <div className="card">
              <TrackCard track={current} />
              <div className="controls" style={{marginTop: 16}}>
                <ControlBar onPrev={prev} onNext={next} hasData={!!tracks.length} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
