const gameModel = require('../models/Game');

/**
 * Adds a new game to the database.
 *
 * @param {Object} req - The request object containing the game data in the request body.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the game is successfully added to the database,
 * or rejects with an error message if any of the required fields are missing or if there is an error during the operation.
 */
module.exports.addGame = async (req, res) => {
    const { name, platform, year, genre, publisher, naSales, euSales, jpSales, otherSales, globalSales } = req.body;
    if (!name || !platform || !year || !genre || !publisher || !naSales || !euSales || !jpSales || !otherSales || !globalSales) {
        res.status(400).json({ message: "Veuillez fournir tous les champs requis." });
        return;
    }
    try {
        const game = await gameModel.create({
            name,
            platform,
            year,
            genre,
            publisher,
            naSales,
            euSales,
            jpSales,
            otherSales,
            globalSales
        });
        res.status(200).json({ message: "Les données ont été enregistrées avec succès.", game: game });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement des données.", error: error.message });
    }
};

/**
 * Fetches all games from the database and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} Returns a Promise that resolves when the games are successfully fetched and sent as a JSON response. If an error occurs, an error message is sent as a JSON response with a status code of 500.
 */
module.exports.getGames = async (req, res) => {
    try {
        const games = await gameModel.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la recherche des données.",
            error: error.message
        });
    }
};

/**
 * Deletes a game from the database based on the provided ID.
 *
 * @param {Object} req - The request object containing the ID in the params.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the game is successfully deleted and sends a JSON response with a message indicating the success of the operation. If an error occurs, sends a JSON response with an error message and a status code of 400.
 */
module.exports.deleteGame = async (req, res) => {
    try {
        const result = await gameModel.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            throw new Error("Aucune correspondance trouvée");
        }
        res.status(200).json({ message: "Suppression réussie" });
    } catch (error) {
        res.status(400).json({ message: "Une erreur s'est produite lors de la suppression.", error: error.message });
    }
};

/**
 * Updates a game in the database based on the provided ID and request body.
 *
 * @param {Object} req - The request object containing the ID in the params and the updated game data in the request body.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the game is successfully updated and sends a JSON response with a message indicating the success of the operation. If an error occurs, sends a JSON response with an error message and a status code of 400.
 */
module.exports.updateGame = async (req, res) => {
    try {
        const { name, platform, year, genre, publisher, naSales, euSales, jpSales, otherSales, globalSales } = req.body;
        const updatedGame = await gameModel.updateOne(
            { _id: req.params.id },
            { $set: { name, platform, year, genre, publisher, naSales, euSales, jpSales, otherSales, globalSales } }
        );
        if (updatedGame.matchedCount === 0) {
            throw new Error("Aucune correspondance trouvée");
        }
        res.status(200).json({ message: "Modification réussie" });
    } catch (error) {
        res.status(400).json({ message: "Une erreur s'est produite lors de la modification.", error: error.message });
    }
};

/**
 * Retrieves a game from the database based on the provided ID and sends it as a JSON response.
 *
 * @param {Object} req - The request object containing the ID in the params.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the game is successfully retrieved and sent as a JSON response. If an error occurs, sends a JSON response with an error message and a status code of 400.
 */
module.exports.getGameById = async (req, res) => {
    try {
        const game = await gameModel.findById(req.params.id);
        if (!game) {
            throw new Error("Aucune correspondance trouvée");
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: "Une erreur s'est produite lors de la recherche.", error: error.message });
    }
}


/**
 * Retrieves a game from the database based on the provided name and sends it as a JSON response.
 *
 * @param {Object} req - The request object containing the name in the params.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the game is successfully retrieved and sent as a JSON response. If an error occurs, sends a JSON response with an error message and a status code of 400.
 */
module.exports.getGameByName = async (req, res) => {
    try {
        // Récupère le nom du jeu à partir de la requête
        const name = req.params.name;

        // Recherche le jeu dans la base de données
        // La recherche est insensible à la casse
        const game = await gameModel.find({ name: { $regex: new RegExp(name, "i") } });

        // Si le jeu n'a pas été trouvé, lance une erreur
        if (game.length === 0) {
            throw new Error("Aucun jeu correspondant trouvé");
        }

        // Envoie le jeu comme réponse JSON
        res.status(200).json(game);
    } catch (error) {
        // Envoie une erreur comme réponse JSON si une erreur est survenue
        res.status(400).json({ message: "Une erreur s'est produite lors de la recherche.", error: error.message });
    }
};


/**
 * Retrieves all games from the database that are published by Nintendo and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the games are successfully retrieved and sent as a JSON response. If no games are found, sends a JSON response with a status code of 404 and a message indicating that no games were found. If an error occurs, sends a JSON response with an error message and a status code of 500.
 */
module.exports.getNintendoGames = async (req, res) => {
    try {
        const nintendoGames = await gameModel.find({ publisher: "Nintendo" });
        if (nintendoGames.length === 0) {
            return res.status(404).json({ message: "Aucun jeu Nintendo trouvé." });
        }
        res.status(200).json(nintendoGames);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des jeux Nintendo",
            error: error.message
        });
    }
};


/**
 * Retrieves all PlayStation games from the database that match the platform pattern 'PS' and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the games are successfully retrieved and sent as a JSON response. 
 * If no games are found, sends a JSON response with a status code of 404 and a message indicating that no games were found.
 * If an error occurs, sends a JSON response with an error message and a status code of 500.
 */
module.exports.getPlaystationGames = async (req, res) => {
    try {
        const playstationGames = await gameModel.find({ platform: { $regex: 'PS', $options: 'i' } }); // La recherche le terme "PS" insensible à la casse
        if (playstationGames.length === 0) {
            return res.status(404).json({ message: "Aucun jeu PlayStation trouvé." });
        }
        res.status(200).json(playstationGames);
    } catch (error) {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la recherche des jeux PlayStation.",
            error: error.message
        });
    }
};

/**
 * Retrieves all games from the database that are published by Sega and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the games are successfully retrieved and sent as a JSON response. 
 * If no games are found, sends a JSON response with a status code of 404 and a message indicating that no games were found.
 * If an error occurs, sends a JSON response with an error message and a status code of 500.
 */
module.exports.getSegaGames = async (req, res) => {
    try {
        const segaGames = await gameModel.find({ publisher: "Sega" });
        if (segaGames.length === 0) {
            return res.status(404).json({ message: "Aucun jeu Sega trouvé." });
        }
        res.status(200).json(segaGames);
    } catch (error) {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la recherche des jeux Sega.",
            error: error.message
        });
    }
};


/**
 * Retrieves all PC games from the database and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the result of the operation.
 * @return {Promise<void>} Returns a Promise that resolves when the games are successfully retrieved and sent as a JSON response. If no games are found, sends a JSON response with a status code of 404 and a message indicating that no games were found. If an error occurs, sends a JSON response with an error message and a status code of 500.
 */

module.exports.getPcGames = async (req, res) => {
    try {
        const pcGames = await gameModel.find({ platform: "PC" });
        if (pcGames.length === 0) {
            return res.status(404).json({ message: "Aucun jeu PC trouvé." });
        }
        res.status(200).json(pcGames);
    } catch (error) {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la recherche des jeux PC.",
            error: error.message
        });
    }
};

/**
 * Retrieves all games sorted by global sales.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} Returns games sorted by global sales.
 */
module.exports.getTotalSorted = async (req, res) => {
    try {
        const games = await gameModel.find().sort({ globalSales: -1 });
        if (games.length === 0) {
            return res.status(404).json({ message: "Aucun jeu trouvé." });
        }
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({
            message: "Une erreur s'est produite lors de la récupération des jeux.",
            error: error.message
        });
    }
};
