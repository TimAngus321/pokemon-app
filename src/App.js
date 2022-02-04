import "./App.scss";
import { useState, useEffect, useCallback, Fragment } from "react";
import { getBulbasaur } from "./services/get-bulbasaur";
import PokemonCard from "components/pokemon-card";
import Search from "./components/search";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import NextArrow from "./components/next-arrow";
import PreviousArrow from "./components/previous-arrow";
import { getPokemonNames } from "services/get-pokemon-names";

function App() {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pokeUrls, setPokeUrls] = useState([]);
  const [loadingUrls, setLoadingUrls] = useState(false);

  const pokeUrl = `https://pokeapi.co/api/v2/pokemon/`;

  // Get Bulbasaur on load
  useEffect(()  => {
    (async function getInitialPokemon() {
    if (!pokemon) {
        try {
          const bulbasuar = await getBulbasaur();
          const bulbasaurData = bulbasuar;
          setPokemon(bulbasaurData);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      } 
      setIsLoading(false)
    })();
  }, [pokemon]);

  


  // Get queried pokemon here
  async function pokemonSearch(search) {
    if (!search) {
      setError(true);
      setErrorMsg("You must enter a Pokemon Name");
      console.log("No query");
      return;
    }
    setError(false);
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
  }, [displayErrorNotification, errorMsg]);

  //   Get all pokemon urls (with Id)
  useEffect(() => {
    (async function getAllPokeIds() {
        setLoadingUrls(true);
        const pokeUrls = await getPokemonNames();
        const allPokeUrls = pokeUrls;
        setPokeUrls(allPokeUrls);
        setLoadingUrls(false);
    })();
  }, []);

  //   Store all pokemon urls in an array
  const allPokeUrls = [];
  if (!loadingUrls) {
    pokeUrls.map((pokeName) => allPokeUrls.push(pokeName.url));
  }

  // Get up to date last pokemon Id - when more pokemon are added this should stay relevant
  async function getLastPokeId() {
    const lastPokemonUrl = await allPokeUrls[allPokeUrls.length - 1];
    const getIdUrl = lastPokemonUrl.substr(lastPokemonUrl.length - 6);
    const lastPokemonIdString = getIdUrl.slice(0, -1);
    const lastPokemonId = parseInt(lastPokemonIdString);
    return lastPokemonId;
  }

  // // Display previous pokemon on click
  async function previousPokemon() {
    const getLastPokePromise = await getLastPokeId();
    const lastPokeIdPromise = Promise.resolve(getLastPokePromise);
    lastPokeIdPromise.then(function (value) {
      const lastPokeId = value;
      const firstPokemonId = 1;

      if (pokemon.id === firstPokemonId) {
        (async function() {
          try {
            setIsLoading(true);
            const getPreviousPoke = await axios
              .get(`${pokeUrl}${lastPokeId}`)
              .catch((error) => console.log(error));
            let previousPoke = getPreviousPoke.data;
            setPokemon(previousPoke);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            setError(true);
          }
        })()
      } else {
        (async function() {
          try {
            setIsLoading(true);
            let previousPokemon = pokemon.id - 1;
            const getPrevPoke = await axios
              .get(`${pokeUrl}${previousPokemon}`)
              .catch((error) => console.log(error));
            let prevPoke = getPrevPoke.data;
            setPokemon(prevPoke);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            setError(true);
          }
        })();
      }
    });
  }

  // // Display next pokemon on click
  async function nextPokemon() {
    const getLastPokePromise = await getLastPokeId();
    const lastPokeIdPromise = Promise.resolve(getLastPokePromise);
    lastPokeIdPromise.then(function (value) {
      const lastPokeId = value;

      if (pokemon.id === lastPokeId) {
        (async function() {
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
        })();
      } else {
        (async function() {
          try {
            setIsLoading(true);
            let nextPokemon = pokemon.id + 1;
            const getNextPoke = await axios
              .get(`${pokeUrl}${nextPokemon}`)
              .catch((error) => console.log(error));
            let nextPoke = getNextPoke.data;
            setPokemon(nextPoke);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            setError(true);
          }
        })(); 
      }
    });
  }

  return (
    <div className="app-container">
      <ToastContainer />
      <div className="left-action-components">
        <div className="action-components-container">
          <h2 className="app-header">Search That Pokémon!</h2>
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
        {error ? (
          <h2>Pokemon not found. Please check your query and try again.</h2>
        ) : null}
        {!isLoading && pokemon && !error ? (
          <PokemonCard
            pokemonDetails={pokemon}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
