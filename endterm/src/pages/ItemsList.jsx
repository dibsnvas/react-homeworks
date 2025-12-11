import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchItems } from "../features/items/itemsSlice";
import PeopleCard from "../components/PeopleCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import { useDebounce } from "../hooks/useDebounce";

export default function ItemsList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loadingList, errorList, count, hasNext, hasPrev } = useSelector(
    (state) => state.items
  );

  const pageFromUrl = Number(searchParams.get("page") || "1");
  const queryFromUrl = searchParams.get("q") || "";

  const [search, setSearch] = useState(queryFromUrl);
  const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  setSearchParams((prev) => {
    const params = new URLSearchParams(prev);

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    return params;
  });
}, [debouncedSearch]);

  useEffect(() => {
    dispatch(
      fetchItems({
        query: queryFromUrl,
        page: pageFromUrl,
      })
    );
  }, [dispatch, queryFromUrl, pageFromUrl]);

  const totalPages = count ? Math.ceil(count / 10) : null;

  function goToPage(newPage) {
    if (newPage < 1) return;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (debouncedSearch) {
        params.set("q", debouncedSearch);
      } else {
        params.delete("q");
      }

      params.set("page", String(newPage));
      return params;
    });
  }

  return (
    <section className="items-page">
      <h1 className="page-title">Star Wars Characters</h1>
      <p>Search by name using server-side filtering.</p>

      <div style={{ margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", minWidth: "220px" }}
        />
      </div>

      {/* Ошибка */}
      {errorList && <ErrorBox message={errorList} />}

      {/* Лоадер */}
      {loadingList && <Spinner />}

      {/* Список */}
      {!loadingList && !errorList && (
        <>
          {list.length === 0 ? (
            <p>No characters found.</p>
          ) : (
            <ul className="people-list">
              {list.map((person) => (
                <PeopleCard key={person.url} person={person} />
              ))}
            </ul>
          )}
        </>
      )}

      {/* Пагинация */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => goToPage(pageFromUrl - 1)}
          disabled={!hasPrev || loadingList || pageFromUrl <= 1}
        >
          ← Previous
        </button>

        <span>
          Page {pageFromUrl}
          {totalPages ? ` of ${totalPages}` : ""}
        </span>

        <button
          type="button"
          onClick={() => goToPage(pageFromUrl + 1)}
          disabled={!hasNext || loadingList}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
