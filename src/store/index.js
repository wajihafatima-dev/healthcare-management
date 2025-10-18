import { configureStore } from "@reduxjs/toolkit";
// import themeReducer from "./slices/themeSlice";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    // theme: themeReducer,
    data: dataReducer,
  },
});

export default store;
