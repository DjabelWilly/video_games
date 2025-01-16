import { React, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { API_URL } from "../config/constants";

/**
 * A React component that renders detailed information about a game
 * and displays its sales distribution in a pie chart.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.gameToDisplayed - The game object containing details and sales data to be displayed.
 */
const Game = ({ gameToDisplayed, setGameToDisplayed, setIsUpdatingGame }) => {
  const [deleteMessage, setDeleteMessage] = useState(""); // Stocke le message d'erreur

  if (!gameToDisplayed) {
    return null;
  }
  /**
   * Handles the deletion of a game by sending a DELETE request to the server.
   * If the request is successful, logs a success message, displays it in the component,
   * and redirects to the homepage after 2.5 seconds.
   * If the request fails, logs an error, displays an error message, and does not redirect.
   */
  const handleDelete = async () => {
    console.log(gameToDisplayed._id);
    try {
      await axios.delete(`${API_URL}/api/games/${gameToDisplayed._id}`);
      // Message de succès
      setDeleteMessage("Le jeu a bien été supprimé !");
    } catch (error) {
      console.log(error);
      // Message d'erreur
      setDeleteMessage("Une erreur est survenue. Veuillez réessayer.");
    }
    // Redirection vers la page d'accueil
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  };

  // Fonction pour activer le formulaire de mise à jour et passe le jeu à modifier au composant parent
  const handleUpdate = () => {
    setGameToDisplayed(gameToDisplayed);
    console.log(gameToDisplayed);
    setIsUpdatingGame(true); // Active le formulaire de mise à jour
  };

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //--------------------------------------

  return (
    <div className="game-container">
      <h2>{gameToDisplayed.name}</h2>
      <div className="game-details">
        <h3>Plateforme: {gameToDisplayed.platform}</h3>
        <h3>Année: {gameToDisplayed.year}</h3>
        <h3>Genre: {gameToDisplayed.genre}</h3>
        <h3>Editeur: {gameToDisplayed.publisher}</h3>

        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}

        {/* boutton delete game */}
        <button
          className="button-delete"
          onClick={() => {
            handleDelete(gameToDisplayed._id);
          }}
        >
          {/* icone svg poubelle */}
          <svg
            fill="#000000"
            width="24px"
            height="24px"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 15.7566 49.5476 L 40.2434 49.5476 C 44.8420 49.5476 46.8962 47.4001 47.5731 42.8248 L 51.0511 19.4118 L 51.5645 19.4118 C 54.4358 19.4118 56 17.6144 56 14.7665 L 56 11.2183 C 56 8.3705 54.4358 6.5731 51.5645 6.5731 L 4.4352 6.5731 C 1.7040 6.5731 0 8.3705 0 11.2183 L 0 14.7665 C 0 17.6144 1.5640 19.4118 4.4352 19.4118 L 4.9721 19.4118 L 8.4268 42.8248 C 9.1271 47.4234 11.1579 49.5476 15.7566 49.5476 Z M 5.3922 15.8870 C 4.2251 15.8870 3.7582 15.3968 3.7582 14.2296 L 3.7582 11.7553 C 3.7582 10.5881 4.2251 10.0979 5.3922 10.0979 L 50.6308 10.0979 C 51.7983 10.0979 52.2419 10.5881 52.2419 11.7553 L 52.2419 14.2296 C 52.2419 15.3968 51.7983 15.8870 50.6308 15.8870 Z M 15.8032 46.0228 C 13.7024 46.0228 12.5118 45.0891 12.1617 42.7782 L 8.6836 19.4118 L 47.3164 19.4118 L 43.8380 42.7782 C 43.5115 45.0891 42.2743 46.0228 40.1967 46.0228 Z M 21.2188 41.1441 C 21.7090 41.1441 22.1292 40.9107 22.4560 40.5839 L 27.9883 35.0516 L 33.5206 40.5839 C 33.8474 40.8874 34.2676 41.1441 34.7811 41.1441 C 35.7615 41.1441 36.5552 40.3038 36.5552 39.3234 C 36.5552 38.7865 36.3451 38.4130 36.0183 38.0629 L 30.5093 32.5539 L 36.0416 26.9749 C 36.3918 26.6014 36.5785 26.2513 36.5785 25.7611 C 36.5785 24.7573 35.7849 23.9637 34.7811 23.9637 C 34.3376 23.9637 33.9408 24.1504 33.5673 24.5239 L 27.9883 30.0562 L 22.4326 24.5472 C 22.0825 24.1971 21.7090 24.0104 21.2188 24.0104 C 20.2384 24.0104 19.4214 24.7807 19.4214 25.7611 C 19.4214 26.2746 19.6315 26.6715 19.9583 26.9983 L 25.4673 32.5539 L 19.9583 38.0862 C 19.6315 38.4130 19.4214 38.8098 19.4214 39.3234 C 19.4214 40.3038 20.2150 41.1441 21.2188 41.1441 Z" />
          </svg>
        </button>

        {/* boutton update game */}
        <button
          className="button-update"
          onClick={() => {
            handleUpdate(gameToDisplayed);
          }}
        >
          {/* icone svg stylo */}
          <svg
            height="24px"
            width="24px"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            viewBox="0 0 256.000000 256.000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="#000000"
              stroke="none"
              transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
            >
              <path d="M2016 2465 c-22 -8 -53 -24 -70 -36 -35 -25 -175 -171 -345 -359 -320 -352 -690 -719 -1088 -1078 l-190 -170 -41 -105 c-66 -169 -203 -587 -200 -610 2 -13 11 -23 24 -25 21 -3 316 96 559 188 162 62 138 42 400 335 319 356 648 680 1090 1071 283 252 325 307 325 428 -1 68 -31 115 -156 237 -91 89 -128 119 -159 128 -53 14 -101 13 -149 -4z m117 -159 c46 -19 173 -154 181 -193 4 -17 2 -50 -4 -72 -12 -47 -56 -90 -420 -422 -390 -355 -503 -467 -1021 -1009 l-187 -195 -78 -29 c-44 -16 -84 -31 -91 -33 -6 -3 -14 6 -18 18 -11 32 -81 105 -116 119 -36 15 -35 23 12 135 28 67 38 79 251 280 351 332 706 689 954 960 331 362 392 423 439 440 51 18 59 18 98 1z" />
            </g>
          </svg>
        </button>
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
