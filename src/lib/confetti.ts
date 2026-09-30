import confetti from 'canvas-confetti';

export function fireConfettiCelebration() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#F4C95D', '#6D5DFB', '#22C55E']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#FFE28A', '#8B7FFF', '#FFFFFF']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#F4C95D', '#6D5DFB', '#38BDF8']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireVictoryFireworks() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#F4C95D', '#6D5DFB', '#22C55E', '#EC4899', '#38BDF8']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#F4C95D', '#6D5DFB', '#22C55E', '#EC4899', '#38BDF8']
    });
  }, 250);
}
