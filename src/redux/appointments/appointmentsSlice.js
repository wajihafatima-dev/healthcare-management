// src/redux/appointments/appointmentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointmentApi,
  updateAppointmentApi,
  deleteAppointmentApi,
} from "./appointmentsApi";

/* Async Thunks */
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllAppointments();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const createAppointment = createAsyncThunk(
    "appointments/create",
    async (payload, { rejectWithValue }) => {
    try {
      const data = await createAppointmentApi(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
}
);
export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAppointmentById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await updateAppointmentApi({ id, payload });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteAppointmentApi(id);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // fetch by id
    builder
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // create
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // appended to list
        state.list.unshift(action.payload); // newest first
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // update
    builder
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.list.findIndex((i) => i._id === updated._id || i.id === updated.id);
        if (idx !== -1) state.list[idx] = updated;
        if (state.current && (state.current._id === updated._id || state.current.id === updated.id)) {
          state.current = updated;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // delete
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        state.list = state.list.filter((i) => (i._id || i.id) !== id);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCurrent } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
