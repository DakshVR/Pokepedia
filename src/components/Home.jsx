// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { getTypeColor } from '../helpers'; 

function Home() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, []);

  return (
    <div className='home'>
      {/* <h1>Welcome to the Pokémon App!</h1> */}
      <div className='content'>
        <div className='welcome-card'>
          {pokemon ? (
            <div
              className='pokemon-card'
              style={{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }}
            >
              <h1>Welcome!</h1>
              <p>Explore and learn about every Pokémon you could think of  on this site!</p>
              <p>If you don't know where to start, check out the Pokémon on the right.</p>
              <p>Refresh for a new one!</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='featured-pokemon'>
          {pokemon ? (
            <div className='pokemon-feature'>
              <h2>{pokemon.name.toUpperCase()}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Link to={`/pokedex/${pokemon.id}`} className='details-link' style={{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }}>View Details </Link>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <section className="introduction-section" >
        <h2>Discover More About Your Favorite Pokémon</h2>
        <p>
          Welcome to the ultimate Pokémon destination! Dive deep into the details of every Pokémon and build your own collection of favorites.
        </p>
        <p>
        
        </p>
        <p>
        Here’s what you can do on our site:
        </p>
        <ul>
          <li>
            <img src='/images/search2.png' alt='Search Icon' />
            <h2>Search: </h2> Find specific Pokémon quickly with our easy-to-use search feature.
            </li>
          <li>
          <img src='/images/explore.png' alt='Explore Icon' />
            <h2>Explore: </h2>  Browse through the entire Pokédex to learn about different Pokémon species.
          </li>
          <li>
            <img src="/images/curate.png" alt="Curate Icon" />
            <h2>Curate: </h2> Create your list of favorite Pokémon and have all the information at your fingertips.
          </li>
          <li>
            <img src="/images/jiggly.png" alt="Learn Icon" />
            <h2>Learn: </h2> Get to know the abilities, moves, types, and more for each Pokémon.
          </li>
        </ul>
        <p>
          Whether you're a seasoned trainer or new to the Pokémon world, our site is the perfect place to enhance your knowledge and love for these incredible creatures. Start exploring now!
        </p>
      </section>
    </div>
  );
}

export default Home;