import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./PokemonCard.css";
import { capitalizeFirstLetter } from "../helpers";
import { useQuery } from "@tanstack/react-query";

const pokeballImageSource =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

function PokemonCard({ pokemon }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", pokemon.url || pokemon.name],
    queryFn: async () => {
      console.log("PokemoninCard", pokemon);
      console.log("PokemonURLinCard", pokemon.url);
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      console.log("==PokemonCardResponse");
      return response.json();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error: Failed to fetch Pokémon data</p>;
  }

  const { id, name, sprites, types, height, weight, base_experience } = data;

  console.log("==PokemonCardData", data);

  const getTypeColor = (type) => {
    const typeColors = {
      fire: "#FDDFDF",
      water: "#DEF3FD",
      grass: "#DEFDE0",
      electric: "#FCF7DE",
      psychic: "#EAEDA1",
      normal: "#F5F5F5",
      dragon: "#97b3e6",
      fairy: "#f7c6ef",
      fighting: "#8b5d5a",
      rock: "#867d7d",
      ground: "orange",
      bug: "#b8f870",
      poison: "#cea5f7",
      ghost: "#866db6",
      ice: "#6ac6de",
      flying: "lightblue",
    };
    return typeColors[type.toLowerCase()] || "#F5F5F5";
  };

  const getTypeImageUrl = (typeName) => {
    return `/images/types/${typeName}.png`;
  };

  return (
    <Link to={`/pokedex/${id}`} className="pokemon-card-link">
      <div
        className="pokemon-card"
        style={{ backgroundColor: getTypeColor(types[0].type.name) }}
      >
        <div className="card-top-left">
          <span className="pokemon-game-index">
            {id <= 1025 ? id + "/1025" : "Form"}
          </span>
        </div>
        <div className="card-top-right">
          <img
            src={getTypeImageUrl(types[0].type.name)}
            alt={types[0].type.name}
            className="type-image"
          />
          <span className="pokemon-hp">
            HP: {!base_experience ? "N/A" : base_experience}
          </span>
        </div>
        <h2>{capitalizeFirstLetter(name)}</h2>
        {sprites && sprites.front_default ? (
          <img
            src={sprites.front_default}
            alt={name}
            style={{ width: "125px", height: "125px" }}
          />
        ) : (
          <img
            src={pokeballImageSource}
            alt="Pokeball"
            style={{ width: "125px", height: "125px" }}
          />
        )}
        <div className="height-and-weight">
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
