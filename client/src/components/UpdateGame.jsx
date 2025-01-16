import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";

const UpdateGame = ({ gameToDisplayed, setIsUpdatingGame }) => {
  const [updateMessage, setUpdateMessage] = useState("");

  // Vérifie si le jeu à modifier existe
  if (!gameToDisplayed) {
    return <p>Aucun jeu à modifier</p>;
  }

  /**
   * Handles the submission of the update game form.
   * Prevents the default form submission event and retrieves form data.
   * Converts form data to a JavaScript object and sends a PUT request to update the game.
   * If the request is successful, displays a success message and redirects to the homepage after 2.5 seconds.
   * Closes the update form upon redirection.
   * If the request fails, logs the error and displays an error message.
   *
   * @param {Object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupération des données directement depuis le formulaire
    const formData = new FormData(e.target);
    const updatedGame = Object.fromEntries(formData.entries()); // Convertir en objet JS

    try {
      // requête PUT pour mettre à jour le jeu avec l'ID du jeu à modifier
      await axios.put(
        `${API_URL}/api/games/${gameToDisplayed._id}`,
        updatedGame
      );

      setUpdateMessage("Le jeu a été mis à jour avec succès !");
      setTimeout(() => {
        window.location.href = "/"; // Redirection à l'accueil après 2.5 secondes
      }, 2500);
    } catch (error) {
      console.error(error);
      setUpdateMessage("Erreur lors de la mise à jour du jeu.");
    }
  };

  return (
    <div className="form-container">
      <h2>Modifier le jeu</h2>

      {updateMessage && <p className="update-message">{updateMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            defaultValue={gameToDisplayed.name || ""}
          />
        </label>
        <label>
          Plateforme:
          <input
            type="text"
            name="platform"
            defaultValue={gameToDisplayed.platform || ""}
          />
        </label>
        <label>
          Année:
          <input
            type="number"
            step="1" // Permettre seulement des nombres entiers
            min="1980" // Année minimale
            max={new Date().getFullYear()} // Année maximale autorisée inf. ou égale à la date actuelle
            name="year"
            defaultValue={gameToDisplayed.year || ""}
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            defaultValue={gameToDisplayed.genre || ""}
          />
        </label>
        <label>
          Editeur:
          <input
            type="text"
            name="publisher"
            defaultValue={gameToDisplayed.publisher || ""}
          />
        </label>
        <label>
          Ventes EU:
          <input
            type="number"
            step="any" // accepte les nombres flottants
            name="euSales"
            defaultValue={gameToDisplayed.euSales || ""}
          />
        </label>
        <label>
          Ventes NA:
          <input
            type="number"
            step="any"
            name="naSales"
            defaultValue={gameToDisplayed.naSales || ""}
          />
        </label>
        <label>
          Ventes JP:
          <input
            type="number"
            step="any"
            name="jpSales"
            defaultValue={gameToDisplayed.jpSales || ""}
          />
        </label>
        <label>
          Ventes Autres:
          <input
            type="number"
            step="any"
            name="otherSales"
            defaultValue={gameToDisplayed.otherSales || ""}
          />
        </label>
        <label>
          Ventes Globales:
          <input
            type="number"
            step="any"
            name="globalSales"
            defaultValue={gameToDisplayed.globalSales || ""}
          />
        </label>
        <button className="button-submitGame" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default UpdateGame;
