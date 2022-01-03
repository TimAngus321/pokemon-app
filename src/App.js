import "./App.scss";
import { useState, useEffect } from 'react';
import {getBulbasaur} from './services/get-bulbasaur';
import Spinner from './components/spinner';
import PokemonCard from "components/pokemon-card";

function App() {

  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const pokeUrl = `https://pokeapi.co/api/v2/pokemon/`;

  // Get Bulbasaur on load
  useEffect(() => {
    (async function getInitialPokemon() {
      setTimeout(async () => {
        try {
          setIsLoading(true);
          const bulbasuar = await getBulbasaur();
          const bulbasaurData = bulbasuar;
          setPokemon(bulbasaurData);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      }, 500);
    })();
  }, []);
 



  return (
    <div className="app-container">
      <div className="left-action-components">
        <h2 className="app-header">Search That Pokémon!</h2>
        <div className="arrows-container">
      </div>
      </div>

      <div className="right-components">
        {error ? (
          <h2>Pokemon not found. Please check your query and try again.</h2>
        ) : isLoading ? (
          <Spinner />
        ) : null}
        {!isLoading && pokemon && !error ? (
          <PokemonCard
            loading={isLoading}
            pokemonDetails={pokemon}
            pokeName={pokemon.name}
            pokeId={pokemon.id}
            pokeImg={pokemon.sprites.front_default}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
