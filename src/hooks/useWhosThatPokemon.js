import { useState } from 'react';

export const useWhosThatPokemon = (pokemon, getRandomPokemon) => {
  const [whosThatPokemonMode, setWhosThatPokemonMode] = useState(false);
  const [pokemonGuess, setPokemonGuess] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);

  // Start or stop the guessing game
  const toggleWhosThatPokemon = () => {
    if (!whosThatPokemonMode) {
      getRandomPokemon();
      setWhosThatPokemonMode(true);
    } else {
      setWhosThatPokemonMode(false);
    }
  };

  // Handle a guess attempt
  const makeGuess = (guess) => {
    if (!pokemon?.name) return false;
    
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setPokemonGuess(true);
      setCorrectAnswersCount(prev => prev + 1);
      return true;
    } else {
      setPokemonGuess(false);
      setIncorrectAnswersCount(prev => prev + 1);
      return false;
    }
  };

  // Handle what happens after a correct answer
  const handleCorrectAnswer = () => {
    // Show pokemon details (turn off whosThatPokemonMode)
    setWhosThatPokemonMode(false);
    
    // After 3 seconds, get new random pokemon and restart game
    setTimeout(() => {
      setWhosThatPokemonMode(true);
      getRandomPokemon();
    }, 3000);
  };

  return {
    whosThatPokemonMode,
    pokemonGuess,
    correctAnswersCount,
    incorrectAnswersCount,
    toggleWhosThatPokemon,
    makeGuess,
    handleCorrectAnswer,
    setWhosThatPokemonMode
  };
};