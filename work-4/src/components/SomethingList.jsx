import { useMemo, useState, useEffect, useRef } from "react";

export default function SomethingList({ items = [] }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => String(it.title || "").toLowerCase().includes(q));
  }, [items, search]);

  const clearSearch = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") clearSearch();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ maxWidth: 560, margin: "24px auto", fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 12 }}>SomethingList</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <button
          onClick={clearSearch}
          disabled={!search}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: search ? "#f3f3f3" : "#fafafa",
            cursor: search ? "pointer" : "not-allowed",
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
        Showing {filtered.length} of {items.length}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {filtered.map((it) => (
          <li
            key={it.id}
            style={{
              padding: "10px 12px",
              border: "1px solid #eee",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 600 }}>{it.title}</div>
            {it.subtitle && <div style={{ color: "#666", fontSize: 13 }}>{it.subtitle}</div>}
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: "#999", fontStyle: "italic" }}>Nothing found</li>
        )}
      </ul>
    </div>
  );
}