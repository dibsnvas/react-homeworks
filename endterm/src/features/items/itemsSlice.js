import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getById } from "../../services/itemsService";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ query = "", page = 1 } = {}, { rejectWithValue }) => {
    try {
      const { results, count, next, previous } = await getAll({ query, page });

      return {
        items: results,
        query,
        page,
        count,
        hasNext: !!next,
        hasPrev: !!previous,
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch items");
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id, { rejectWithValue }) => {
    try {
      const item = await getById(id);
      return item;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch item details");
    }
  }
);

const initialState = {
  list: [],
  loadingList: false,
  errorList: null,

  selectedItem: null,
  loadingItem: false,
  errorItem: null,

  query: "",
  page: 1,
  count: 0,
  hasNext: false,
  hasPrev: false,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload || "";
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.items;
        state.query = action.payload.query;
        state.page = action.payload.page;
        state.count = action.payload.count;
        state.hasNext = action.payload.hasNext;
        state.hasPrev = action.payload.hasPrev;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload || "Failed to fetch items";
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
