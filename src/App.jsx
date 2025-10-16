import "./App.scss";
import PokemonCard from "components/pokemonCard/pokemon-card";
import Search from "./components/Search/search";
import "react-toastify/dist/ReactToastify.css";
import NextArrow from "./components/arrows/next-arrow";
import PreviousArrow from "./components/arrows/previous-arrow";
import WhosThatPokemon from "components/whosThatPokemon/whoPokemon";
import Confetti from 'react-confetti-boom';
import { usePokemon } from './hooks/usePokemon';
import { useWhosThatPokemon } from './hooks/useWhosThatPokemon';
import { useConfetti } from './hooks/useConfetti';

function App() {
  const {
    pokemon,
    error,
    errorMsg,
    setPokemonName,
    previousPokemon,
    nextPokemon,
    getRandomPokemon
  } = usePokemon();

  const {
    whosThatPokemonMode,
    correctAnswersCount,
    incorrectAnswersCount,
    toggleWhosThatPokemon,
    makeGuess,
    handleCorrectAnswer
  } = useWhosThatPokemon(pokemon, getRandomPokemon);

  const { showConfetti } = useConfetti(correctAnswersCount, handleCorrectAnswer);

  // Get queried pokemon here
  const pokemonSearch = (search) => {
    if (whosThatPokemonMode) {
      makeGuess(search);
    } else {
      setPokemonName(search.toLowerCase());
    }
  };

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
                whosThatPokemon={toggleWhosThatPokemon}
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
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}

export default App;
