import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemById,
  clearSelectedItem,
} from "../features/items/itemsSlice";

import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedItem,
    loadingItem,
    errorItem,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItemById(id));

    return () => {
      dispatch(clearSelectedItem());
    };
  }, [id, dispatch]);

  return (
    <section>
      <button onClick={() => navigate(-1)}>Back</button>

      {loadingItem && <Spinner />}

      <ErrorBox
        message={errorItem && errorItem !== "Not found" ? errorItem : ""}
      />

      {!loadingItem && errorItem === "Not found" && (
        <p>Character not found.</p>
      )}

      {!loadingItem && !errorItem && selectedItem && (
        <div className="person-details">
          <h1>{selectedItem.name}</h1>
          <p>
            <strong>Birth year:</strong> {selectedItem.birth_year}
          </p>
          <p>
            <strong>Gender:</strong> {selectedItem.gender}
          </p>
          <p>
            <strong>Height:</strong> {selectedItem.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {selectedItem.mass} kg
          </p>
          <p>
            <strong>Hair color:</strong> {selectedItem.hair_color}
          </p>
          <p>
            <strong>Eye color:</strong> {selectedItem.eye_color}
          </p>
          <p>
            <strong>Skin color:</strong> {selectedItem.skin_color}
          </p>
        </div>
      )}
    </section>
  );
}
