import axios from "axios";

const bulbasaurURL = "https://pokeapi.co/api/v2/pokemon/";

export function getPokemon(query) {
  console.log(`${bulbasaurURL}${query}`);
  return fetch(`${bulbasaurURL}${query}`).then((pokemonData) =>
    pokemonData.ok ? pokemonData.json() : pokemonData
  );
}
