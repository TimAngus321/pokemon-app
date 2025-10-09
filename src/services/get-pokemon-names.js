import axios from "axios";

const pokeNamesUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

export async function getPokemonNames() {
  const allPokemonNames = await axios.get(pokeNamesUrl).catch((error) => console.log(error));
  return allPokemonNames.data.results;
}
