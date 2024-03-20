import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "../reducers/favoritesSlice";

export default configureStore({
  reducer: {
    favorites: favoritesSlice,
  },
});
