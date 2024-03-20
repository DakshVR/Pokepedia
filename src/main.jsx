import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Favorites from "./Favorites.jsx";
import { Pokedex } from "./Pokedex.jsx";
import Home from "./components/Home";

import {
  Root,
  ErrorPage,
  BasePokemon,
  PokemonDetails,
  Search,
} from "./Routes.jsx";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Root>
        <ErrorPage />
      </Root>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "search",
        element: <Search />,
        children: [
          { path: ":pokemon", element: <PokemonDetails /> },
          { index: true, element: <BasePokemon /> },
        ],
      },
      {
        path: "pokedex",
        element: <Pokedex />,
      },
      { path: "pokedex/:id", element: <PokemonDetails /> },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);