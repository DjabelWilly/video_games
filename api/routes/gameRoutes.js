const express = require('express');
const { getGames, addGame, updateGame, deleteGame, getGameById, getGameByName } = require('../controllers/gameController');
const router = express.Router(); // création d'un routeur


// Route pour rechercher tous les jeux
router.get('/', getGames);

// Route pour rechercher un jeu par le nom
router.get('/search/:name', getGameByName);

// Route pour rechercher un jeu par l'ID
router.get('/:id', getGameById);

// Route pour ajouter un jeu
router.post('/', addGame);

// Route pour mettre à jour un jeu
router.put('/:id', updateGame);

// Route pour supprimer un jeu
router.delete('/:id', deleteGame);




module.exports = router;