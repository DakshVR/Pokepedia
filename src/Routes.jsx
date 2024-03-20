import {
  Outlet,
  useParams,
  useRouteError,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import PokemonDetailsPage from "./PokemonDetailsPage";
import Navbar from "./components/Navbar";
import { PokemonSearch } from "./PokemonSearch";

import './index.css'

export function Root(props) {
  return (
    <>
      <Navbar />
      <div className="container">
        <aside>{props.children || <Outlet />}</aside>
      </div>
    </>
  );
}
export function Home() {
  return (
    <>
      <h1>Welcome to the Home Page!</h1>
    </>
  );
}

export function Search() {
  return (
    <>
        <PokemonSearch />
    </>
  )
}

export function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Fetch Pokémon details using the id parameter from the URL
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) =>
        console.error("Error fetching Pokémon details:", error)
      );
  }, [id]);

  return (
    <div>
      {pokemon ? (
        <PokemonDetailsPage pokemon={pokemon} />
      ) : (
        <p>Loading Pokémon details...</p>
      )}
    </div>
  );
}

export function BasePokemon() {
  return (
    <>
      <h2>
        This section allows you to view details about Pokemon! Click one to
        learn more.
      </h2>
    </>
  );
}

export function ErrorPage() {
  const error = useRouteError();

  return (
    <>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')
        </style>
        <h1 className="error-message">
            Darn, that page doesn't seem to exist, why don't you try another one!
        </h1>
    </>
  );
}
