import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

/**
 * A React component that renders detailed information about a game
 * and displays its sales distribution in a pie chart.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.gameToDisplayed - The game object containing details and sales data to be displayed.
 */
const Game = ({ gameToDisplayed }) => {
  if (!gameToDisplayed) {
    return null;
  }

  //---------- chart.js -------------
  const data = {
    labels: ["EU", "US", "JP", "Autres"],
    datasets: [
      {
        label: "Ventes",
        data: [
          gameToDisplayed.euSales,
          gameToDisplayed.naSales,
          gameToDisplayed.jpSales,
          gameToDisplayed.otherSales,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //--------------------------------------

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="game-container">
      <h2>{gameToDisplayed.name}</h2>
      <div className="game-details">
        <h3>Plateforme: {gameToDisplayed.platform}</h3>
        <h3>Année: {gameToDisplayed.year}</h3>
        <h3>Genre: {gameToDisplayed.genre}</h3>
        <h3>Editeur: {gameToDisplayed.publisher}</h3>
      </div>
      <div className="game-sales">
        {/* affiche le graphique */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Game;
//recupére le jeu stocké dans le state gameToDisplayed et l'affiche
