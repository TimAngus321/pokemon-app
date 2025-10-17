import axios from "axios";

const pokeNamesUrl = "https://pokeapi.co/api/v2/pokemon?limit=1025";

export async function getPokemonNames() {
  try {
    const allPokemonNames = await axios.get(pokeNamesUrl);
    return allPokemonNames.data.results;
  } catch (error) {
    console.log(error);
  }
}
