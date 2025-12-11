import { useSelector } from "react-redux";
import { useFavorites } from "../hooks/useFavorites";
import { getIdFromUrl } from "../services/itemsService";
import PeopleCard from "../components/PeopleCard";

export default function Favorites() {
  const { favoritesIds, mergeMessage, clearMergeMessage } = useFavorites();
  const items = useSelector((state) => state.items.list);

  const favorites = items.filter((item) => {
    const id = getIdFromUrl(item.url);
    return favoritesIds.includes(id);
  });

  return (
    <section className="favorites-page">
      <h1>Favorites</h1>

      {mergeMessage && (
        <div className="merge-banner" onClick={clearMergeMessage}>
          {mergeMessage}
        </div>
      )}

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="people-list">
          {favorites.map((person) => (
            <PeopleCard key={person.url} person={person} />
          ))}
        </ul>
      )}
    </section>
  );
}
