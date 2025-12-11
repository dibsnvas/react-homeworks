import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLocalFavorites,
  saveLocalFavorites,
  saveServerFavorites,
  mergeFavoritesOnLogin,
} from "../../services/favoritesService";

export const initFavorites = createAsyncThunk(
  "favorites/init",
  async (user, { rejectWithValue }) => {
    try {
      if (!user) {
        const ids = getLocalFavorites();
        return { ids, mergeMessage: null };
      }

      const { merged, wasMerged } = await mergeFavoritesOnLogin(user.uid);
      return {
        ids: merged,
        mergeMessage: wasMerged
          ? "Your local favorites were merged with your account."
          : null,
      };
    } catch (err) {
      console.error("Failed to init favorites, fallback to local:", err);
      const ids = getLocalFavorites();
      return { ids, mergeMessage: null };
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async ({ id, user }, { getState }) => {
    const state = getState().favorites;
    const isFav = state.ids.includes(id);

    let newIds;
    if (isFav) {
      newIds = state.ids.filter((x) => x !== id);
    } else {
      newIds = [...state.ids, id];
    }

    saveLocalFavorites(newIds);

    if (user) {
      try {
        await saveServerFavorites(user.uid, newIds);
      } catch (err) {
        console.error("Failed to sync favorites to Firestore:", err);
      }
    }

    return newIds;
  }
);

const initialState = {
  ids: [],
  loading: false,
  error: null,
  mergeMessage: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearMergeMessage(state) {
      state.mergeMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload.ids || [];
        state.mergeMessage = action.payload.mergeMessage;
      })
      .addCase(initFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to init favorites";
      })

      .addCase(toggleFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.ids = action.payload || [];
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload || "Failed to update favorites";
      });
  },
});

export const { clearMergeMessage } = favoritesSlice.actions;

export default favoritesSlice.reducer;
