import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async (endpoint) => {
  const res = await fetch(`http://localhost:5000/api/${endpoint}`);
  return res.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;
