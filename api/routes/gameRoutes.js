const express = require('express');
const { getGames, addGame, updateGame, deleteGame, getGameById, getGameByName, getNintendoGames, getPlaystationGames, getSegaGames, getPcGames } = require('../controllers/gameController');
const router = express.Router();



// Route pour rechercher tous les jeux
router.get('/', getGames);

// Route pour rechercher un jeu par le nom
router.get('/search/:name', getGameByName);

// Route pour rechercher un jeu par l'ID
router.get('/:id', getGameById);

// Route pour sélectionner les jeux Nintendo
router.get('/action/nintendo', getNintendoGames);

// Route pour rechercher tous les jeux Playstation
router.get('/action/playstation', getPlaystationGames);

// Route pour rechercher tous les jeux Sega
router.get('/action/sega', getSegaGames);

// Route pour rechercher tous les jeux Pc
router.get('/action/PC', getPcGames);

// Route pour ajouter un jeu
router.post('/', addGame);

// Route pour mettre à jour un jeu
router.put('/:id', updateGame);

// Route pour supprimer un jeu
router.delete('/:id', deleteGame);








module.exports = router;