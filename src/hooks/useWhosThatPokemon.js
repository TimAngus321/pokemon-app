import { useState } from 'react';

export const useWhosThatPokemon = (pokemon, getRandomPokemon) => {
  const [whosThatPokemonMode, setWhosThatPokemonMode] = useState(false);
  const [pokemonGuess, setPokemonGuess] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [classicMode, setClassicMode] = useState(null); // null, 'classic', or 'allPokemon'

  // Get random Pokemon based on mode (accepts mode parameter to avoid stale state)
  const getRandomPokemonWithMode = (modeString = classicMode) => {
    const maxId = modeString === 'classic' ? 151 : 1025;
    const randomNumber = Math.floor(Math.random() * maxId) + 1;
    return randomNumber;
  };

  // Start or stop the guessing game
  const toggleWhosThatPokemon = (modeOverride) => {
    if (!whosThatPokemonMode) {
      // Convert boolean modeOverride to string, or use current classicMode
      let modeString;
      if (modeOverride !== undefined) {
        modeString = modeOverride ? 'classic' : 'allPokemon';
      } else {
        modeString = classicMode;
      }
      
      const randomId = getRandomPokemonWithMode(modeString);
      getRandomPokemon(randomId);
      setWhosThatPokemonMode(true);
    } else {
      // Stop the game - reset to null
      setWhosThatPokemonMode(false);
      setClassicMode(null);
    }
  };

  // Handle a guess attempt
  const makeGuess = (guess) => {
    if (!pokemon?.name) return false;
    
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setPokemonGuess(true);
      setCorrectAnswersCount(prev => prev + 1);
      // Reset the visual feedback after animation
      setTimeout(() => setPokemonGuess(null), 3000);
      return true;
    } else {
      setPokemonGuess(false);
      setIncorrectAnswersCount(prev => prev + 1);
      // Reset the visual feedback after animation
      setTimeout(() => setPokemonGuess(null), 1000);
      return false;
    }
  };

  // Handle what happens after a correct answer
  const handleCorrectAnswer = () => {
    // Show pokemon details (turn off whosThatPokemonMode but keep classicMode)
    setWhosThatPokemonMode(false);
    
    // After 3 seconds, get new random pokemon and restart game
    setTimeout(() => {
      const randomId = getRandomPokemonWithMode(classicMode);
      getRandomPokemon(randomId);
      setWhosThatPokemonMode(true);
    }, 3000);
  };

  return {
    whosThatPokemonMode,
    pokemonGuess,
    correctAnswersCount,
    incorrectAnswersCount,
    classicMode,
    toggleWhosThatPokemon,
    makeGuess,
    handleCorrectAnswer,
    setWhosThatPokemonMode,
    setClassicMode
  };
};