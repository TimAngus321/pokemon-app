import "./App.scss";
import { useState, useEffect, useCallback } from 'react';
import {getBulbasaur} from './services/get-bulbasaur';
import Spinner from './components/spinner';
import PokemonCard from "components/pokemon-card";
import Search from './components/search';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function App() {

  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


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

   // Get queried pokemon here
   async function pokemonSearch(search) {
    if (!search) {
      setError(true);
      setErrorMsg("You must enter a Pokemon Name");
      console.log("No query");
      return;
    }
    setError(false);
    setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchedPokemon = await axios
          .get(`${pokeUrl}${search}`)
          .catch((error) => console.log(error));
        const foundPokemon = searchedPokemon.data;
        setPokemon(foundPokemon);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setErrorMsg("Pokemon not found. Please check your spelling.");
        console.log("Bad spelling");
        setErrorMsg(false);
      }
    }, 1500);
  }

  // Display toast error if button clicked with no search query or unknown pokemon
  const displayErrorNotification = useCallback(() => {
    if (error && errorMsg !== "") {
      toast.error(errorMsg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
    }
  });

  // Prevent multiple renders of notificaton
  useEffect(() => {
    displayErrorNotification();
  }, [errorMsg]);
 



  return (
    <div className="app-container">
    <ToastContainer />
      <div className="left-action-components">
        <h2 className="app-header">Search That Pokémon!</h2>
        <div className="arrows-container">
      </div>
      <Search pokemonSearch={pokemonSearch} />
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
