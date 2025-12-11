import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, setQuery } from "../features/items/itemsSlice";

import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import PeopleList from "../components/PeopleList";

export default function ItemsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const dispatch = useDispatch();

  const {
    list,
    loadingList,
    errorList,
    query,
  } = useSelector((state) => state.items);

  
  useEffect(() => {
    dispatch(setQuery(q));
    dispatch(fetchItems(q));
  }, [q, dispatch]);

  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) setSearchParams({ q: value });
    else setSearchParams({});
  }

  return (
    <section>
      <h1>Star Wars Characters</h1>
      <p>Search by name using server-side filtering.</p>

      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={handleSearchChange}
      />

      {loadingList && <Spinner />}

      <ErrorBox message={errorList} />

      {!loadingList && !errorList && list.length === 0 && (
        <p>No characters found.</p>
      )}

      <PeopleList items={list} />
    </section>
  );
}
