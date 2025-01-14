import { React, useState } from "react";
import axios from "axios";

/**
 * AddNewGame component.
 *
 * This component allows users to add new games to the database.
 * It handles form submission, validation, and error handling.
 *
 * @return {JSX.Element} The AddNewGame component.
 */
const AddNewGame = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    platform: "",
    year: "",
    genre: "",
    publisher: "",
    euSales: "",
    naSales: "",
    jpSales: "",
    otherSales: "",
    globalSales: "",
  });

  /**
   * Updates the formData state with the current input values.
   *
   * @param {Object} e - The event object from the input change.
   * @param {string} e.target.name - The name attribute of the input field.
   * @param {string} e.target.value - The current value of the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Handles the submission of the new game form.
   * Prevents the default form submission event.
   * Logs the current formData to the console.
   * Sends a POST request to the server with the formData.
   * If the request is successful, logs the response to the console.
   * Resets the formData to its initial state.
   * Displays a success message.
   * If the request fails, logs the error to the console.
   * Displays an error message.
   * Redirects to the homepage after 2.5 seconds.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Envoi des données au serveur
      const response = await axios.post(
        // "http://localhost:5000/api/games",
        "https://video-games-back-end.vercel.app/api/games",
        formData
      );
      console.log(response.data);

      // Réinitialisation des champs du formulaire après soumission
      setFormData({
        name: "",
        platform: "",
        year: "",
        genre: "",
        publisher: "",
        euSales: "",
        naSales: "",
        jpSales: "",
        otherSales: "",
        globalSales: "",
      });

      // Message de succès
      setMessage("Le jeu a bien été ajouté !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu :", error);
      // Message d'erreur
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }

    // Redirection vers la page d'accueil
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  };

  return (
    <div className="form-container">
      <h2>Ajouter un nouveau jeu</h2>

      {/* Affichage du message */}
      {message && <div className="message">{message}</div>}

      {/* Formulaire d'ajout de jeu */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="platform">Plateforme:</label>
        <input
          type="text"
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
        />
        <label htmlFor="year">Année:</label>
        <input
          type="number"
          min="1980" // Année minimale
          max={new Date().getFullYear()} // Année maximale autorisée inf. ou égale à la date actuelle
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <label htmlFor="publisher">Editeur:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          required
        />
        <label htmlFor="euSales">Ventes EU:</label>
        <input
          type="number"
          id="euSales"
          name="euSales"
          value={formData.euSales}
          onChange={handleChange}
          required
        />
        <label htmlFor="naSales">Ventes NA:</label>
        <input
          type="number"
          id="naSales"
          name="naSales"
          value={formData.naSales}
          onChange={handleChange}
          required
        />
        <label htmlFor="jpSales">Ventes JP:</label>
        <input
          type="number"
          id="jpSales"
          name="jpSales"
          value={formData.jpSales}
          onChange={handleChange}
          required
        />
        <label htmlFor="otherSales">Ventes autres:</label>
        <input
          type="number"
          id="otherSales"
          name="otherSales"
          value={formData.otherSales}
          onChange={handleChange}
          required
        />
        <label htmlFor="globalSales">Ventes globales:</label>
        <input
          type="number"
          id="globalSales"
          name="globalSales"
          value={formData.globalSales}
          onChange={handleChange}
          required
        />
        <button className="button-submitGame" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddNewGame;
