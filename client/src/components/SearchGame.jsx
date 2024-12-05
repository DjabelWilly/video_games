import React, { useState } from "react";
import axios from "axios";

/**
 * A functional component that renders a search bar to find games.
 * It updates the games state with the fetched data when a search is performed.
 *
 * @param {Object} props - The props object containing the setGames function.
 * @param {function} props.setGames - A function to update the games state with the fetched data.
 * @returns {JSX.Element} The rendered SearchGame component.
 */
const SearchGame = ({ setGames }) => {
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker le terme de recherche

  /**
   * Handles the change event of the search input.
   * Updates the searchTerm state with the new value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   * @returns {void}
   */
  const handleChange = (event) => {
    setSearchTerm(event.target.value); // Met à jour le champ de recherche
  };

  /**
   * Handles the search button click event.
   * Checks if the search input is not empty.
   * If not empty, sends a GET request to the API with the search term.
   * If the request is successful, updates the games state with the fetched data.
   * If the request fails, logs an error message.
   * @returns {Promise<void>} Returns a Promise that resolves when the search is finished.
   */
  const handleSearch = async () => {
    // Vérifie que le champ de recherche n'est pas vide
    if (!searchTerm.trim()) {
      alert("Veuillez entrer un terme pour la recherche !");
      return;
    }

    // Vérifie les caractères non autorisés, sauf les espaces
    if (searchTerm.match(/[^a-zA-Z0-9\s]/g)) {
      alert("Les caractères spéciaux ne sont pas autorisés !");
      return;
    }

    try {
      // Effectue la requête API
      const response = await axios.get(
        `http://localhost:5000/api/games/search/${searchTerm}`
      );
      console.log(response.data);
      setGames(response.data); // Met à jour la liste des jeux dans le composant parent
      setSearchTerm(""); // Réinitialise le champ de recherche après la recherche
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Rechercher un jeu"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="button-submitGame"
        onClick={(e) => {
          e.preventDefault();
          handleSearch(); // Appelle la recherche lors du clic
        }}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchGame;
