export default function ControlBar({ onPrev, onNext, hasData }) {
  return (
    <>
      <button onClick={onPrev} disabled={!hasData} className="btn btn-ghost">◀︎ Prev</button>
      <button onClick={onNext} disabled={!hasData} className="btn btn-primary">Shuffle ▶︎</button>
    </>
  );
}
