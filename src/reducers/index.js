import { combineReducers } from "redux";
import favoritesReducer from "./favoritesSlice";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
