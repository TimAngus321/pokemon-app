import "./App.scss";
import { useState, useEffect, Fragment } from "react";
import { getPokemon } from "./services/get-pokemon";
import PokemonCard from "components/pokemonCard/pokemon-card";
import Search from "./components/Search/search";
import "react-toastify/dist/ReactToastify.css";
import NextArrow from "./components/arrows/next-arrow";
import PreviousArrow from "./components/arrows/previous-arrow";


function App() {
  const [pokemon, setPokemon] = useState();
  const [initialPokemon, setInitialPokemon] = useState(false);
  const [pokemonName, setPokemonName] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const lastPokeId = 898;
  const firstPokemonId = 1;


  // Get Bulbasaur on load
  useEffect(() => {
    if (!initialPokemon) {
      findPokemon("1");
      setInitialPokemon(true)
    } 
  }, [initialPokemon]);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    findPokemon(pokemonName);
  }, [pokemonName]);

   // All requests dealt with here
   const findPokemon = (query) => {
    getPokemon(query)
      .then((pokemonData) => {
        if (!pokemonData.status) {
          setError(false);
          setPokemon(pokemonData);
          console.log(pokemon);
          return;
        } else if (pokemonData.status === 404) {
          setError(true)
          setErrorMsg("Pokemon not found")
          return Promise.reject(pokemonData.status);
        } else {
          setError(true)
          setErrorMsg("Unknown problem. Try again later.")
          return Promise.reject(pokemonData.status);
        }
      });
};

  // Get queried pokemon here
  const pokemonSearch = (search) => {
    setPokemonName(search.toLowerCase());
  };

  // // Display previous pokemon on click
  function previousPokemon() {
    if (pokemon.id === firstPokemonId) {
      findPokemon(lastPokeId);
    } else {
      let previousPokemon = pokemon.id - 1;
      findPokemon(previousPokemon);
    }
  }

  // // Display next pokemon on click
  function nextPokemon() {
    if (pokemon.id === lastPokeId) {
      findPokemon("1");
    } else {
      let nextPokemon = pokemon.id + 1;
      findPokemon(nextPokemon);
    }
  }

  return (
    <div className="app-container">
      <div className="left-action-components">
        <div className="action-components-container">
          <div className="arrows-container">
          
            {pokemon ? (
              <Fragment>
                <PreviousArrow previousPokemon={previousPokemon} />
                <NextArrow nextPokemon={nextPokemon} />
              </Fragment>
            ) : null}
          </div>
          <Search pokemonSearch={pokemonSearch} />
        </div>
      </div>
      <div className="right-components">
        {error ? 
        <div className="">
        <h2 style={{ color: 'white'}}>{errorMsg}</h2> 
</div> : null}
        {pokemon && !error ? <PokemonCard pokemonDetails={pokemon} /> : null}
      </div>
    </div>
  );
}


export default App;
