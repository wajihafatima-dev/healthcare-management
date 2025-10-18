// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./appointments/appointmentsSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
