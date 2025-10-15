import "./App.scss";
import { useState, useEffect, Fragment } from "react";
import { getPokemon } from "./services/get-pokemon";
import PokemonCard from "components/pokemonCard/pokemon-card";
import Search from "./components/Search/search";
import "react-toastify/dist/ReactToastify.css";
import NextArrow from "./components/arrows/next-arrow";
import PreviousArrow from "./components/arrows/previous-arrow";
import WhosThatPokemon from "components/whosThatPokemon/whoPokemon";

function App() {
  const [pokemon, setPokemon] = useState();
  const [initialPokemon, setInitialPokemon] = useState(false);
  const [pokemonName, setPokemonName] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [whosThatPokemonMode, setWhosThatPokemonMode] = useState(false);
  const [pokemonGuess, setPokemonGuess] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);

  const lastPokeId = 1025;
  const firstPokemonId = 1;

  // Get Bulbasaur on load
  useEffect(() => {
    if (!initialPokemon) {
      findPokemon("1");
      setInitialPokemon(true);
    }
  }, [initialPokemon]);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    findPokemon(pokemonName);
  }, [pokemonName]);

  // All requests dealt with here
  const findPokemon = async (query) => {
    const pokemonData = await getPokemon(query);
    if (!pokemonData.status) {
      setError(false);
      setPokemon(pokemonData);
      return;
    } else if (pokemonData.status === 404) {
      setError(true);
      setErrorMsg("Pokemon not found");
      return Promise.reject(pokemonData.status);
    } else {
      setError(true);
      setErrorMsg("Unknown problem. Try again later.");
      return Promise.reject(pokemonData.status);
    }
  };

  // Get random pokemon on click
  const whosThatPokemon = () => {
    const randomNumber = Math.floor(Math.random() * 1025) + 1;
    findPokemon(randomNumber);
    setWhosThatPokemonMode(true);
    console.log(pokemon);
  };

  // Get queried pokemon here
  const pokemonSearch = (search) => {
    if (whosThatPokemonMode) {
      whosThatPokemonAttempt(search);
    } else {
      setPokemonName(search.toLowerCase());
    }
  };

  function whosThatPokemonAttempt(guess) {
    if (guess.toLowerCase() === pokemon.name) {
      setPokemonGuess(true);
      setCorrectAnswersCount(correctAnswersCount + 1);
    } else {
      setPokemonGuess(false);
      setIncorrectAnswersCount(incorrectAnswersCount + 1);
    }
  }

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

  // Handle arrow key presses to display next and previous pokemon
  const handleKeyDown = (event) => {
    if (!pokemon) return;
    if (whosThatPokemonMode) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextPokemon();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousPokemon();
    }
  };

  return (
    <div className="app-container" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="left-action-components">
        <div className="action-components-container">
          {pokemon ? (
            <div className="arrows-container">
              <PreviousArrow
                previousPokemon={previousPokemon}
                whosThatPokemonMode={whosThatPokemonMode}
                incorrectAnswersCount={incorrectAnswersCount}
              />
              <WhosThatPokemon
                whosThatPokemon={whosThatPokemon}
                whosThatPokemonMode={whosThatPokemonMode}
              />
              <NextArrow
                nextPokemon={nextPokemon}
                whosThatPokemonMode={whosThatPokemonMode}
                correctAnswersCount={correctAnswersCount}
              />
            </div>
          ) : null}
          <Search
            pokemonSearch={pokemonSearch}
            whosThatPokemonMode={whosThatPokemonMode}
          />
        </div>
      </div>
      <div className="right-components">
        {error ? (
          <div className="">
            <h2 style={{ color: "white" }}>{errorMsg}</h2>
          </div>
        ) : null}
        {pokemon && !error ? (
          <PokemonCard
            pokemonDetails={pokemon}
            whosThatPokemonMode={whosThatPokemonMode}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
