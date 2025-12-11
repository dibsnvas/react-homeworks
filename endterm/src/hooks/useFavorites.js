import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initFavorites,
  toggleFavorite as toggleFavoriteThunk,
  clearMergeMessage,
} from "../features/favorites/favoritesSlice";
import { useAuth } from "../auth/AuthContext";

export function useFavorites() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const ids = useSelector((state) => state.favorites.ids);
  const loading = useSelector((state) => state.favorites.loading);
  const mergeMessage = useSelector((state) => state.favorites.mergeMessage);

  useEffect(() => {
    dispatch(initFavorites(user || null));
  }, [user, dispatch]);

  function isFavorite(id) {
    return ids.includes(id);
  }

  function toggleFavorite(id) {
    dispatch(toggleFavoriteThunk({ id, user: user || null }));
  }

  function clearMessage() {
    dispatch(clearMergeMessage());
  }

  return {
    favoritesIds: ids,
    isFavorite,
    toggleFavorite,
    loading,
    mergeMessage,
    clearMergeMessage: clearMessage,
  };
}
