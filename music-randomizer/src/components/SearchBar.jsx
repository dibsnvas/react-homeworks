import { useRef } from "react";

export default function SearchBar({ defaultValue = "", onSearch, onReset }) {
  const ref = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const val = (form.get("q") || "").toString().trim();
    if (val) onSearch(val);
  }
  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Artist, song, genre…"
        ref={ref}
      />
      <button type="submit" className="btn btn-primary">Search</button>
      <button type="button" className="btn btn-ghost" onClick={onReset}>Reset</button>
    </form>
  );
}


