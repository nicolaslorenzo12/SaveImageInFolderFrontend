import { useState, useEffect } from 'react';

export const useCountdown = (initialCount, onComplete) => {
  const [countdown, setCountdown] = useState(initialCount);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountingDown && countdown === 0) {
      onComplete();
      setIsCountingDown(false);
    }
  }, [isCountingDown, countdown, onComplete]);

  const startCountdown = () => {
    setCountdown(initialCount);
    setIsCountingDown(true);
  };

  return { countdown, isCountingDown, startCountdown };
};