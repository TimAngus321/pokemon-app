import axios from "axios";

const bulbasaurURL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemon(query) {
    try {
    let getPokemon = await axios.get(`${bulbasaurURL}${query}`) 
    let pokemonData = await getPokemon.data
    return pokemonData;
    } catch (error) {
      console.log(error);
    }

}
 