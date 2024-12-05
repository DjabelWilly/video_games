import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

/**
 * ScrollUpArrow component.
 *
 * This component renders an arrow icon that, when clicked, smoothly scrolls the window
 * to the top of the page. It calculates the scroll distance and animates the scroll
 * over a fixed duration using the requestAnimationFrame method.
 *
 * @return {JSX.Element} The ScrollUpArrow component.
 */
const ScrollUpArrow = () => {
  /**
   * Handles a click event on the scroll up arrow.
   * Smoothly scrolls the window to the top of the page over a fixed duration.
   * Uses the requestAnimationFrame method to animate the scroll.
   */
  const handleClick = () => {
    // Variables pour la position actuelle du scroll et la position cible
    const targetPosition = 0;
    const currentPosition = window.scrollY;
    const scrollDistance = currentPosition - targetPosition;
    const duration = 700; // Durée du défilement (en millisecondes)
    const startTime = performance.now(); // Temps initial pour calculer la vitesse

    // Fonction de défilement progressif
    const smoothScroll = (timestamp) => {
      const elapsedTime = timestamp - startTime; // Temps écoulé depuis le début du défilement
      const progress = Math.min(elapsedTime / duration, 1); // Progression de l'animation (de 0 à 1)

      // Calcul de la nouvelle position de défilement
      window.scrollTo(0, currentPosition - scrollDistance * progress);

      // Si l'animation n'est pas encore terminée, on continue de scroller
      if (elapsedTime < duration) {
        window.requestAnimationFrame(smoothScroll);
      } else {
        // Une fois terminé, on s'assure qu'on est bien à la position cible
        window.scrollTo(0, targetPosition);
      }
    };

    // Lancer l'animation de défilement
    window.requestAnimationFrame(smoothScroll);
  };

  return (
    <div>
      <i className="fas fa-arrow-up" onClick={handleClick} />
    </div>
  );
};

export default ScrollUpArrow;
