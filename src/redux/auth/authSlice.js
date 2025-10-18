import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/authApi";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  redirectToLogin: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
    setRedirectToLogin: (state, action) => {
      state.redirectToLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getUserWithToken.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      }
    );
    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        const { updated } = payload;

        state.user = {
          ...state.user,
          profile: {
            ...state.user?.profile,
            ...updated, 
          },
        };

        localStorage.setItem("user", JSON.stringify(state.user));
      }
    );
  },
});

export const { logout, setRedirectToLogin } = slice.actions;

export default slice.reducer;
