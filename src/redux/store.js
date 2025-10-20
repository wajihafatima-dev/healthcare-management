import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import authReducer from "./auth/authSlice";
import appointmentsReducer from "./appointments/appointmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    appointments: appointmentsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
