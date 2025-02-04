import { useEffect } from "react";

const FloatingHearts = () => {
  useEffect(() => {
    let container = document.getElementById("floating-hearts-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "floating-hearts-container";
      container.classList.add("floating-hearts-container");
      document.body.appendChild(container);
    }

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️"; // Heart emoji or use an image
      heart.classList.add("floating-heart");

      // Random position & size
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${Math.random() * 30 + 10}px`;

      // Random floating speed between 15s and 25s (slower than before)
      heart.style.animationDuration = `${Math.random() * 10 + 15}s`;

      container.appendChild(heart);

      // Remove heart after animation ends
      setTimeout(() => {
        heart.remove();
      }, 25000); // Wait for longest duration before removing
    };

    // Generate hearts at intervals
    const interval = setInterval(createHeart, 1200); // Every 1.2 seconds instead of 700ms

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default FloatingHearts;