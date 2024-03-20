import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <img src="/images/home.png" alt="Home" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <img src="/images/search.png" alt="Search" />
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/pokedex">
            <img src="/images/pokedex.png" alt="Pokedex" />
            Pokedex
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites">
            <img src="/images/favorites.png" alt="Favorites" />
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
