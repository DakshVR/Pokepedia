import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "./components/PokemonCard";
import './index.css'

export function Pokedex() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const observer = useRef(null);

    const fetchPokemon = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        return data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["allPokemon"],
        queryFn: () => fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=100"),
    });

    useEffect(() => {
      if (data) {
          setPokemonList(data.results);
          setNextPageUrl(data.next);
      }
    }, [data]);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setShowBackToTop(offset > 400);
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const isBottom = windowHeight + scrollTop === documentHeight;
            if (isBottom && nextPageUrl) {
                loadMorePokemon();
            }
      };

    window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [nextPageUrl]);

    const loadMorePokemon = async () => {
      try {
          const newPokemonData = await fetchPokemon(nextPageUrl);
          setPokemonList((prevPokemonList) => [
            ...prevPokemonList,
            ...newPokemonData.results,
          ]);
          setNextPageUrl(newPokemonData.next);
      } catch (error) {
          console.error("Error fetching more Pokémon:", error);
      }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: Failed to fetch Pokémon data</p>;

    return (
        <>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')
        </style>
        <div>
            <h1 className="pokedex-message">Welcome to the Pokédex!</h1>
                <div className="pokemon-grid">
                  {pokemonList.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                  ))}
                </div>
            <div id="observer"></div>
            {showBackToTop && (
                <button
                  onClick={scrollToTop}
                  style={{ position: "fixed", bottom: "20px", right: "20px" }}
                >
                  Back to Top
                </button>
            )}
        </div>
        </>
    );
}
