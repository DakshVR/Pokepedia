export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const addToFavorites = (pokemon) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: pokemon,
  };
};

export const removeFromFavorites = (pokemon) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: pokemon,
  };
};
