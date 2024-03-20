import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  convertHeightToFeetAndInches,
  convertWeightToPounds,
  capitalizeFirstLetter,
} from "./helpers";
import store from "./redux/store";
import { addToFavorites, removeFromFavorites } from "./reducers/favoritesSlice";

const colorHexMap = {
  black: "#d3d3d3",
  blue: "#ADD8E6",
  brown: "#C4A484",
  gray: "#808080",
  green: "#00ab41",
  pink: "#FFB6C1",
  purple: "#CBC3E3",
  red: "#FF474C",
  white: "lightgrey",
  yellow: "#feff57",
};

const pokeballImageSource =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

function PokemonDetailsPage({ pokemon }) {
  const [backgroundColor, setBackgroundColor] = useState("#f3b818");
  const [loading, setLoading] = useState(true);
  const [showAllMoves, setShowAllMoves] = useState(false);

  const dispatch = useDispatch(); 

  const favorites = useSelector((state) => state.favorites.favorites); 
  const handleAddToFavorites = () => {
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      console.log(`Added ${pokemon.name} to favorites`);
      dispatch(
        addToFavorites({
          id: pokemon.id, // Added id to prevent duplicate entries of same pokemon
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
        })
      );
    } else {
      console.log(`${pokemon.name} is already in favorites`);
    }
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(pokemon));
  };

  useEffect(() => {
    const fetchPokemonColor = async () => {
      try {
        const response = await fetch(pokemon.species.url);
        const speciesData = await response.json();
        const colorResponse = await fetch(speciesData.color.url);
        const colorData = await colorResponse.json();
        const colorName = colorData.name;
        let backgroundColor;
        if (colorName in colorHexMap) {
          backgroundColor = colorHexMap[colorName];
        } else {
          backgroundColor = "#f3b818"; // Default color
        }
        setBackgroundColor(backgroundColor);
        setLoading(false); // Set loading to false after fetching color
      } catch (error) {
        console.error("Error fetching Pokemon color:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPokemonColor();
  }, [pokemon.species.url]);

  const toggleMoves = () => {
    setShowAllMoves(!showAllMoves);
  };

  // Check if the current Pokemon is in favorites
  const isFavorite = favorites.some((p) => p.id === pokemon.id);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching
  }

  const playCry = () => {
    const audio = new Audio(pokemon.cries.latest);
    audio.volume = 0.02;
    audio.play();
  };

  const heightInFeetAndInches = convertHeightToFeetAndInches(pokemon.height);
  const weightInPounds = convertWeightToPounds(pokemon.weight);

  return (
    <div className="pokemon-details">
      <div className="pokemon-name-bar" style={{ backgroundColor }}>
        <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
      </div>
      <div className="pokemon-image">
        <img
          src={pokemon.sprites.front_default || pokeballImageSource}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-favorite">
        {isFavorite ? (
          <button onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </button>
        ) : (
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        )}
      </div>
      <div className="pokemon-info">
        <div className="pokemon-attributes">
          <div>
            <h3>Abilities:</h3>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>
                  {capitalizeFirstLetter(ability.ability.name)}
                </li>
              ))}
            </ul>
            <div>
              <h3>Base Experience:</h3>
              <p>{pokemon.base_experience ? pokemon.base_experience : "N/A"}</p>
            </div>
          </div>
          <div
            className="pokemon-physical-attributes"
            style={{ backgroundColor }}
          >
            <div>
              <h3>Height:</h3>
              <p>{heightInFeetAndInches}</p>

              <h3>Weight:</h3>
              <p>{weightInPounds} lbs.</p>
            </div>
            <div>
              <h3>Cry:</h3>
              <p>
                <button onClick={playCry}>Play Sound</button>
              </p>

              <h3>Types:</h3>
              <ul>
                {pokemon.types.map((type, index) => (
                  <li key={index}>{capitalizeFirstLetter(type.type.name)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {pokemon.held_items.length > 0 && <h3>Held Items:</h3>}
        <ul>
          {pokemon.held_items.map((item, index) => (
            <li key={index}>{capitalizeFirstLetter(item.item.name)}</li>
          ))}
        </ul>
        {pokemon.moves.length > 0 && <h3>Moves:</h3>}
        <div className="pokemon-moves">
          {pokemon.moves
            .slice(0, showAllMoves ? pokemon.moves.length : 14)
            .map((move, index) => (
              <div key={index} className="move" style={{ backgroundColor }}>
                {capitalizeFirstLetter(move.move.name)}
              </div>
            ))}
        </div>
        {/* Toggle button */}
        {pokemon.moves.length > 10 && (
          <button className="toggle-moves-button" onClick={toggleMoves}>
            {showAllMoves ? "Show Less Moves" : "Show More Moves"}
          </button>
        )}
        {Object.entries(pokemon.sprites.versions).some(
          ([generation, games]) => Object.keys(games).length > 0
        ) && (
          <>
            <h3>Shiny Sprite:</h3>
            <img
              src={pokemon.sprites.front_shiny || pokeballImageSource}
              alt={`${pokemon.name} Shiny`}
            />
            <h3>Past Game Looks:</h3>
            <div className="game-looks">
              {Object.entries(pokemon.sprites.versions)
                .filter(([_, games]) =>
                  Object.values(games).some((sprite) => sprite.front_default)
                ) // Filter out generations without images
                .map(([generation, games]) => (
                  <div key={generation}>
                    <strong>{generation}:</strong>
                    <div className="game-look">
                      {Object.entries(games).map(
                        ([game, sprite]) =>
                          sprite.front_default && ( // Check if the front_default image exists
                            <img
                              key={game}
                              src={sprite.front_default}
                              alt={`${pokemon.name} in ${game}`}
                            />
                          )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
