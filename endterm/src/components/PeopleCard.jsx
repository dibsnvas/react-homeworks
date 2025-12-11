import "../styles/peopleCard.css";
import { Link } from "react-router-dom";
import { getIdFromUrl } from "../services/itemsService";
import { useFavorites } from "../hooks/useFavorites";

export default function PeopleCard({ person }) {
  const { name, gender, birth_year, height, mass, url } = person;
  const id = getIdFromUrl(url);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = id ? isFavorite(id) : false;

  return (
    <li className="people-card">
      <h3 className="people-card__title">{name}</h3>

      <dl className="people-card__meta">
        <div>
          <dt>Gender</dt>
          <dd>{gender}</dd>
        </div>
        <div>
          <dt>Birth year</dt>
          <dd>{birth_year}</dd>
        </div>
        <div>
          <dt>Height</dt>
          <dd>{height} cm</dd>
        </div>
        <div>
          <dt>Mass</dt>
          <dd>{mass} kg</dd>
        </div>
      </dl>

      <div className="people-card__actions">
        {id && (
          <Link className="people-card__link" to={`/items/${id}`}>
            Details
          </Link>
        )}

        {id && (
          <button
            type="button"
            className={
              favorite
                ? "people-card__fav-btn people-card__fav-btn--active"
                : "people-card__fav-btn"
            }
            onClick={() => toggleFavorite(id)}
          >
            {favorite ? "★ In favorites" : "☆ Add to favorites"}
          </button>
        )}
      </div>
    </li>
  );
}
