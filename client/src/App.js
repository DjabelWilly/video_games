
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";



function App() {

  const [games, setGames] = useState([]); // Etat pour stocker les jeux
  const [activeButton, setActiveButton] = useState(null); // État pour suivre le bouton actif
  const [gameToDisplayed, setGameToDisplayed] = useState(null); // Etat pour stocker le Jeu sélectionné pour affichage détails

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
  const handleGameClick = (games) => {
    console.log(games);
    setGameToDisplayed(games);
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
            }}
          >
            PC
          </button>

        </div>



      </div >

      <p>A FAIRE</p>
      <p>Barre de recherche</p>
      <p>Page pour ajouter un jeu</p>
      <p>Page pour voir le détail des ventes d'un jeu sous forme d'un graphique</p>


      {/* <Search gameToDisplayed={setGames} /> */}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>plateforme</th>
            <th>annee</th>
            <th>genre</th>
            <th>editeur</th>
            <th>ventes EU</th>
            <th>ventes US</th>
            <th>ventes JP</th>
            <th>ventes autres</th>
            <th>ventes global</th>
          </tr>
        </thead>
        <tbody>
          {games.length > 0 ? (
            games.map((jeu) => (
              <tr key={jeu._id}
                onClick={() => {
                  handleGameClick(jeu);
                }}
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
    </>
  );
}

export default App;
