import { useState, useEffect, useRef } from 'react';

export const useConfetti = (correctAnswersCount, onCorrectAnswer) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCorrectAnswersCount = useRef(0);

  // Show confetti when correct answers count increases
  useEffect(() => {
    if (correctAnswersCount > prevCorrectAnswersCount.current) {
      setShowConfetti(true);
      
      // Call the onCorrectAnswer callback if provided
      if (onCorrectAnswer) {
        onCorrectAnswer();
      }
      
      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    prevCorrectAnswersCount.current = correctAnswersCount;
  }, [correctAnswersCount, onCorrectAnswer]);

  return {
    showConfetti
  };
};