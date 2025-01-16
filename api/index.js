const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

const app = express();

// Configuration CORS
const allowedOrigins = [
    'http://localhost:3000',              // Développement local
    'https://video-games-frontend.vercel.app'     // Production
];

// Middleware CORS
app.use(cors({
    origin: allowedOrigins  // Uniquement les origines listées
}));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//Connexion à la DB
connectDB()
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));


// Routes
app.use('/api/games', require('./routes/gameRoutes'));


// Lance le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


