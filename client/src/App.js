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
      // on envoie la requete à l'api avec un param dynamique optionnel "filter"
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
  const handleClickGame = (jeu) => {
    console.log(jeu);
    setGameToDisplayed(jeu); // Met à jour l'état qui contient le jeu sélectionné à afficher
  };

  // Tableau des filtres pour creer des boutons de manière dynamique
  const filters = [
    { label: "Afficher tous les jeux", filter: "", key: "all" },
    { label: "Nintendo", filter: "/action/nintendo", key: "nintendo" },
    { label: "PlayStation", filter: "/action/playstation", key: "playstation" },
    { label: "Sega", filter: "/action/sega", key: "sega" },
    { label: "PC", filter: "/action/pc", key: "pc" },
  ];

  return (
    <>
      <div className="app-header">
        <h1>Sales Dashboard</h1>

        {!isAddingGame && // Enlève les boutons si isAddingGame est true (bouton "+" cliqué)
          <div>
            {/*------- Affiche les boutons dynamiquement-------------- */}
            {filters.map(({ label, filter, key }) => (
              <button
                key={key}
                className={activeButton === key ? "button-active" : "button-basic"}
                onClick={() => {
                  fetchGames(filter); // Met à jour la route de la requête selon le bouton cliqué
                  setActiveButton(key); // Met à jour la classe CSS du bouton actif
                  setGameToDisplayed(null); // Réinitialise la sélection d'un jeu
                  setIsAddingGame(false); // Affiche formulaire ajout de jeu
                }}
              >
                {label}
              </button>
            ))}

            <button
              className="button-newGame"
              onClick={() => {
                setGameToDisplayed(null);
                setIsAddingGame(true);
              }}
            >
              +
            </button>
          </div>
        }
        {/*------------- fin div bouttons---------------- */}

      </div >

      <p style={{ color: "red" }}>A FAIRE : Barre de recherche / update JEU </p>


      {isAddingGame ? ( // Affiche le formulaire d'ajout de jeu si isAddingGame est vrai (bouton "+" cliqué)
        <>
          <button
            onClick={() => {
              fetchGames(""); // retourne la liste des jeux
              setIsAddingGame(false);
              setActiveButton("all");
            }}
          >
            retour
          </button>

          <AddNewGame />
        </>
      ) :  // Sinon affiche les details du jeu qui à été selectionné
        gameToDisplayed ? (
          <Game gameToDisplayed={gameToDisplayed} />

        ) : (  // Sinon affiche la liste comprenant tous des jeux

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
                    onClick={() => { handleClickGame(jeu) }} // passe le jeu à la fonction handleGameClick
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
