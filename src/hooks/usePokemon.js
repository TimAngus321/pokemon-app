import { useState, useEffect } from 'react';
import { getPokemon } from '../services/get-pokemon';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState();
  const [initialPokemon, setInitialPokemon] = useState(false);
  const [pokemonName, setPokemonName] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const lastPokeId = 1025;
  const firstPokemonId = 1;

  // Get Bulbasaur on load
  useEffect(() => {
    if (!initialPokemon) {
      findPokemon("1");
      setInitialPokemon(true);
    }
  }, [initialPokemon]);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    findPokemon(pokemonName);
  }, [pokemonName]);

  // All requests dealt with here
  const findPokemon = async (query) => {
    const pokemonData = await getPokemon(query);
    if (!pokemonData.status) {
      setError(false);
      setPokemon(pokemonData);
      return;
    } else if (pokemonData.status === 404) {
      setError(true);
      setErrorMsg("Pokemon not found");
      return Promise.reject(pokemonData.status);
    } else {
      setError(true);
      setErrorMsg("Unknown problem. Try again later.");
      return Promise.reject(pokemonData.status);
    }
  };

  // Display previous pokemon on click
  const previousPokemon = () => {
    if (pokemon?.id === firstPokemonId) {
      findPokemon(lastPokeId);
    } else if (pokemon?.id) {
      let previousPokemonId = pokemon.id - 1;
      findPokemon(previousPokemonId);
    }
  };

  // Display next pokemon on click
  const nextPokemon = () => {
    if (pokemon?.id === lastPokeId) {
      findPokemon("1");
    } else if (pokemon?.id) {
      let nextPokemonId = pokemon.id + 1;
      findPokemon(nextPokemonId);
    }
  };

  const getRandomPokemon = (specificId) => {
    const randomNumber = specificId || Math.floor(Math.random() * lastPokeId) + 1;
    findPokemon(randomNumber);
  };

  return {
    pokemon,
    error,
    errorMsg,
    setPokemonName,
    findPokemon,
    previousPokemon,
    nextPokemon,
    getRandomPokemon
  };
};