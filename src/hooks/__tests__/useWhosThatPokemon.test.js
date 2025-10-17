import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useWhosThatPokemon } from '../useWhosThatPokemon';

// Test component that uses the hook
const TestComponent = ({ pokemon, getRandomPokemon, onHookChange }) => {
  const hookResult = useWhosThatPokemon(pokemon, getRandomPokemon);
  
  // Call the callback with hook result whenever it changes
  React.useEffect(() => {
    onHookChange(hookResult);
  }, [hookResult, onHookChange]);

  return (
    <div>
      <button 
        data-testid="start-classic" 
        onClick={() => hookResult.toggleWhosThatPokemon(true)}
      >
        Start Classic
      </button>
      <button 
        data-testid="start-all" 
        onClick={() => hookResult.toggleWhosThatPokemon(false)}
      >
        Start All Pokemon
      </button>
      <button 
        data-testid="guess-correct" 
        onClick={() => hookResult.makeGuess('pikachu')}
      >
        Guess Pikachu
      </button>
      <button 
        data-testid="guess-incorrect" 
        onClick={() => hookResult.makeGuess('charizard')}
      >
        Guess Charizard
      </button>
      <div data-testid="mode">{hookResult.whosThatPokemonMode ? 'active' : 'inactive'}</div>
      <div data-testid="correct-count">{hookResult.correctAnswersCount}</div>
      <div data-testid="incorrect-count">{hookResult.incorrectAnswersCount}</div>
    </div>
  );
};

describe('useWhosThatPokemon', () => {
  const mockPokemon = { name: 'pikachu', id: 25 };
  const mockGetRandomPokemon = jest.fn();
  let hookResult = {};

  const onHookChange = (result) => {
    hookResult = result;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    hookResult = {};
  });

  describe('Game Mode Selection', () => {
    it('should start classic mode (Gen 1, Pokemon 1-151) when called with true', () => {
      const { getByTestId } = render(
        <TestComponent 
          pokemon={mockPokemon} 
          getRandomPokemon={mockGetRandomPokemon}
          onHookChange={onHookChange}
        />
      );

      fireEvent.click(getByTestId('start-classic'));

      expect(getByTestId('mode')).toHaveTextContent('active');
      expect(mockGetRandomPokemon).toHaveBeenCalledWith(expect.any(Number));
      // Verify the random number is within Gen 1 range (1-151)
      const calledWith = mockGetRandomPokemon.mock.calls[0][0];
      expect(calledWith).toBeGreaterThanOrEqual(1);
      expect(calledWith).toBeLessThanOrEqual(151);
    });

    it('should start all pokemon mode (Pokemon 1-1025) when called with false', () => {
      const { getByTestId } = render(
        <TestComponent 
          pokemon={mockPokemon} 
          getRandomPokemon={mockGetRandomPokemon}
          onHookChange={onHookChange}
        />
      );

      fireEvent.click(getByTestId('start-all'));

      expect(getByTestId('mode')).toHaveTextContent('active');
      expect(mockGetRandomPokemon).toHaveBeenCalledWith(expect.any(Number));
      // Verify the random number is within all Pokemon range (1-1025)
      const calledWith = mockGetRandomPokemon.mock.calls[0][0];
      expect(calledWith).toBeGreaterThanOrEqual(1);
      expect(calledWith).toBeLessThanOrEqual(1025);
    });
  });

  describe('Score Tracking', () => {
    it('should increment correct answers count when guess is correct', () => {
      const { getByTestId } = render(
        <TestComponent 
          pokemon={mockPokemon} 
          getRandomPokemon={mockGetRandomPokemon}
          onHookChange={onHookChange}
        />
      );

      // Make multiple correct guesses
      fireEvent.click(getByTestId('guess-correct'));
      fireEvent.click(getByTestId('guess-correct'));
      fireEvent.click(getByTestId('guess-correct'));

      expect(getByTestId('correct-count')).toHaveTextContent('3');
      expect(getByTestId('incorrect-count')).toHaveTextContent('0');
    });

    it('should increment incorrect answers count when guess is wrong', () => {
      const { getByTestId } = render(
        <TestComponent 
          pokemon={mockPokemon} 
          getRandomPokemon={mockGetRandomPokemon}
          onHookChange={onHookChange}
        />
      );

      // Make incorrect guesses
      fireEvent.click(getByTestId('guess-incorrect'));
      fireEvent.click(getByTestId('guess-incorrect'));

      expect(getByTestId('correct-count')).toHaveTextContent('0');
      expect(getByTestId('incorrect-count')).toHaveTextContent('2');
    });

    it('should track both correct and incorrect answers accurately', () => {
      const { getByTestId } = render(
        <TestComponent 
          pokemon={mockPokemon} 
          getRandomPokemon={mockGetRandomPokemon}
          onHookChange={onHookChange}
        />
      );

      // Mixed correct and incorrect guesses
      fireEvent.click(getByTestId('guess-correct'));   // correct
      fireEvent.click(getByTestId('guess-incorrect')); // incorrect
      fireEvent.click(getByTestId('guess-correct'));   // correct
      fireEvent.click(getByTestId('guess-incorrect')); // incorrect
      fireEvent.click(getByTestId('guess-correct'));   // correct

      expect(getByTestId('correct-count')).toHaveTextContent('3');
      expect(getByTestId('incorrect-count')).toHaveTextContent('2');
    });
  });
});