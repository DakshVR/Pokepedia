import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './PokemonSearch.css'
import PokemonCard from "./components/PokemonCard";

//for fuzzy search
import Fuse from 'fuse.js';

export function PokemonSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [inputQuery, setInputQuery] = useState(query || "");
    const [pokemonData, setPokemonData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1350');
        const data = await response.json();
        setPokemonData(data.results);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!inputQuery) {
        setSearchResults([]);
        return;
        }

        // Define options for fuzzy search
        const fuseOptions = {
        keys: ['name'],
        threshold: 0.3,
        };

        const fuse = new Fuse(pokemonData, fuseOptions);
        const results = fuse.search(inputQuery).map(result => result.item);
        setSearchResults(results);
    }, [inputQuery, pokemonData]);

    return (
        <>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')
        </style>
        <div className="message">
            <h1>Search for your favorite Pokémon!</h1>
        </div>
        <div className="search">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchParams({ q: inputQuery });
                }}
            >
                <input
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                />
                <button type="submit">
                    <img className="pokeball" src="/images/Poké_Ball_icon.png" alt="PokemonSearch" />
                    <span>Search</span>
                </button>
                <button type="button" onClick={() => setInputQuery("")}>
                    <img className="clear" src="/images/goodbye.png" alt="clear" />
                    <span>Clear</span>
                </button>
            </form>
        </div>
        <div className="pokemon-grid">
            {searchResults.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
            ))}
        </div>
        </>
    );
}

   