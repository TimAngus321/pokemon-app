import axios from "axios";

const bulbasaurURL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemon(query) {
  console.log(`${bulbasaurURL}${query}`)
  const initialPokemon = await axios.get(`${bulbasaurURL}${query}`).catch((error) => console.log(error));
  return initialPokemon.data
}
