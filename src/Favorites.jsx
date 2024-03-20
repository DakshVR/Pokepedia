import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./components/PokemonCard";

export function Favorites() {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')
    </style>
    <div>
      <h1 className="favorites-message">Welcome to the Favorites Page!</h1>
      <div className="pokemon-grid">
        {favorites.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
    </>
  );
}
export default Favorites;
