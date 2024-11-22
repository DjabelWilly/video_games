
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Game from "./components/Game";
import AddNewGame from "./components/AddNewGame";



function App() {

  const [games, setGames] = useState([]); // Etat pour stocker les jeux
  const [activeButton, setActiveButton] = useState(null); // État pour suivre le bouton actif
  const [gameToDisplayed, setGameToDisplayed] = useState(null); // Etat pour stocker le Jeu sélectionné pour affichage détails
  const [isAddingGame, setIsAddingGame] = useState(false);


  /**
   * Fetches games from the server, optionally filtered by a specified criteria.
   * If a filter is provided, it is appended to the request URL.
   * Updates the games state with the fetched data.
   * Logs any errors encountered during the request.
   *
   * @param {string} [filter] - Optional filter string to modify the request URL.
   */
  const fetchGames = async (filter) => {
    try {
      // on envoie la requete a l'api avec un param dynamique optionnel "filter"
      const response = await axios.get(`http://localhost:5000/api/games${filter ? filter : ""}`);
      console.log(response.data);
      setGames(response.data);

    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  /**
   * Handles a game being clicked, logging the game object to the console.
   *
   * @param {Object} games - The game object that was clicked.
   */
  const handleGameClick = (jeu) => {
    console.log(jeu);
    setGameToDisplayed(jeu); // Met à jour l'état qui contient le jeu sélectionné à afficher
  };


  return (
    <>
      <div className="app-header">
        <h1>Sales Dashboard</h1>
        <div>
          {/* Afficher tous les jeux */}
          <button
            className={activeButton === "all" ? "button-active" : "button-basic"}
            onClick={() => {
              fetchGames();
              setActiveButton("all");
              setGameToDisplayed(null);
              setIsAddingGame(false); // Désactive le mode ajout de jeu
            }}
          >
            Afficher tous les jeux
          </button>

          {/* Afficher les jeux Nintendo */}
          <button
            className={activeButton === "nintendo" ? "button-active" : "button-basic"}
            onClick={() => {
              fetchGames("/action/nintendo");
              setActiveButton("nintendo");
              setGameToDisplayed(null);
              setIsAddingGame(false); // quitte la page ajout de jeu
            }}
          >
            Nintendo
          </button>

          {/* Afficher les jeux Playstation */}
          <button
            className={activeButton === "playstation" ? "button-active" : "button-basic"}
            onClick={() => {
              fetchGames("/action/playstation");
              setActiveButton("playstation");
              setGameToDisplayed(null);
              setIsAddingGame(false); // quitte la page ajout de jeu
            }}
          >
            PlayStation
          </button>

          {/* Afficher les jeux Sega */}
          <button
            className={activeButton === "sega" ? "button-active" : "button-basic"}
            onClick={() => {
              fetchGames("/action/sega");
              setActiveButton("sega");
              setGameToDisplayed(null);
              setIsAddingGame(false); // quitte la page ajout de jeu
            }}
          >
            Sega
          </button>

          {/* Afficher les jeux PC */}
          <button
            className={activeButton === "pc" ? "button-active" : "button-basic"}
            onClick={() => {
              fetchGames("/action/pc");
              setActiveButton("pc");
              setGameToDisplayed(null);
              setIsAddingGame(false); // quitte la page ajout de jeu
            }}
          >
            PC
          </button>
          <button
            className="newGame-btn"
            onClick={() => {
              setGameToDisplayed(null); // Réinitialise la sélection d'un jeu
              setIsAddingGame(true); // Affiche formulaire ajout de jeu
            }}
          >
            +
          </button>

        </div>
      </div >

      <p style={{ color: "red" }}>A FAIRE : Barre de recherche / update / delete / </p>

      {isAddingGame ? (
        <AddNewGame />
      ) :
        gameToDisplayed ? (
          <Game gameToDisplayed={gameToDisplayed} />
        ) : (

          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Plateforme</th>
                <th>Année</th>
                <th>Genre</th>
                <th>Editeur</th>
                <th>ventes EU</th>
                <th>ventes US</th>
                <th>ventes JP</th>
                <th>ventes autres</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {games.length > 0 ? (
                games.map((jeu) => (
                  <tr key={jeu._id}
                    onClick={() => { handleGameClick(jeu) }} // passe le jeu à la fonction handleGameClick
                  >
                    <td className="name">{jeu.name}</td>
                    <td>{jeu.platform}</td>
                    <td>{jeu.year}</td>
                    <td className="genre">{jeu.genre}</td>
                    <td className="publisher">{jeu.publisher}</td>
                    <td>{jeu.euSales}</td>
                    <td>{jeu.naSales}</td>
                    <td>{jeu.jpSales}</td>
                    <td>{jeu.otherSales}</td>
                    <td>{jeu.globalSales}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">Aucun jeu trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
    </>
  );
}

export default App;
