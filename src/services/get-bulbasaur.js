import axios from "axios";

const bulbasaurURL = "https://pokeapi.co/api/v2/pokemon/1";

export async function getBulbasaur() {
  const initialPokemon = await axios.get(bulbasaurURL).catch((error) => console.log(error));
  return initialPokemon.data
}
