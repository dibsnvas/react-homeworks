export function SkeletonRow() {
  return (
    <div className="skeleton">
      <div className="skel-grid">
        <div className="skel-square"></div>
        <div>
          <div className="skel-box" style={{width: "66%", height: 32}}></div>
          <div className="skel-box" style={{width: "50%", height: 20, marginTop: 12}}></div>
          <div className="skel-box" style={{width: "100%", height: 96, marginTop: 12, borderRadius: 18}}></div>
        </div>
      </div>
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="empty">
      <div className="emoji">🔍</div>
      <p>No tracks yet. Try a different search term.</p>
    </div>
  );
}
