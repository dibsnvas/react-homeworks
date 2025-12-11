import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import { useAuth } from "../auth/AuthContext";
import {
  initFavorites,
  clearMergeMessage,
} from "../features/favorites/favoritesSlice";

export default function RootLayout() {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const mergeMessage = useSelector((state) => state.favorites.mergeMessage);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (loading) return;
    dispatch(initFavorites(user || null));
  }, [dispatch, user, loading]);

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
    }

    function handleOffline() {
      setIsOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="app-root">
      {isOffline && (
        <div className="offline-banner">
          You are offline. Some data may be unavailable or outdated.
        </div>
      )}

      {mergeMessage && (
        <div className="merge-notice">
          {mergeMessage}
          <button
            type="button"
            onClick={() => dispatch(clearMergeMessage())}
          >
            ×
          </button>
        </div>
      )}

      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
