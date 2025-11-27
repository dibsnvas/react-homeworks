import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getById } from "../../services/itemsService";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query, { rejectWithValue }) => {
    try {
      const data = await getAll(query);
      return { data, query: query || "" };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch items");
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getById(id);
      if (!data) {
        return rejectWithValue("Not found");
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch item");
    }
  }
);

const initialState = {
  list: [],
  selectedItem: null,

  loadingList: false,
  loadingItem: false,

  errorList: null,
  errorItem: null,

  query: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LIST =====
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.data;
        state.query = action.payload.query;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload || "Error loading list";
        state.list = [];
      })

      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || "Error loading item";
        state.selectedItem = null;
      });
  },
});

export const { setQuery, clearSelectedItem } = itemsSlice.actions;

export default itemsSlice.reducer;
