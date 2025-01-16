const express = require('express');
const { getGames, addGame, updateGame, deleteGame, getGameById, getGameByName, getNintendoGames, getPlaystationGames, getSegaGames, getPcGames, getTotalSorted } = require('../controllers/gameController');
const router = express.Router();



// Route pour rechercher tous les jeux
router.get('/', (req, res, next) => {
    console.log('📥 Requête GET reçue sur /api/games');
    next();
}, getGames);

// Route pour rechercher un jeu par le nom
router.get('/search/:name', getGameByName);

// Route pour sélectionner les jeux Nintendo
router.get('/action/nintendo', (req, res, next) => {
    console.log('📥 Requête GET reçue pour les jeux Nintendo');
    next();
}, getNintendoGames);

// Route pour rechercher tous les jeux Playstation
router.get('/action/playstation', (req, res, next) => {
    console.log('📥 Requête GET reçue pour les jeux PlayStation');
    next();
}, getPlaystationGames);

// Route pour rechercher tous les jeux Sega
router.get('/action/sega', (req, res, next) => {
    console.log('📥 Requête GET reçue pour les jeux Sega');
    next();
}, getSegaGames);

// Route pour rechercher tous les jeux Pc
router.get('/action/PC', getPcGames);

// Route pour ajouter un jeu
router.post('/', (req, res, next) => {
    console.log('📥 Requête POST reçue sur /api/games');
    console.log('Données reçues:', req.body);
    next();
}, addGame);

// Route pour mettre à jour un jeu
router.put('/:id', updateGame);

// Route pour supprimer un jeu
router.delete('/:id', deleteGame);

// Route pour rechercher un jeu par l'ID
router.get('/:id', getGameById);

// Route pour obtenir les jeux triés par ventes globales
router.get('/sorted/total', getTotalSorted);








module.exports = router;