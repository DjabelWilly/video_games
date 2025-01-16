const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

//Connexion à la DB
connectDB().then(() => {
    console.log('Démarrage de l\'application...');
    const app = express();

    // Configuration CORS détaillée
    app.use(cors({
        origin: '*',  // Autorise toutes les origines
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    console.log('CORS configuré');

    // Middleware pour les headers CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use("/api/games", require("./routes/gameRoutes")); // Remettre le préfixe /api
    console.log('Routes configurées');

    // Lance le serveur
    app.listen(port, () => {
        console.log("Serveur démarré sur le port " + port);
        console.log("URL de l'API: " + process.env.REACT_APP_BACKEND_URL);
    });
}).catch(error => {
    console.error('Erreur au démarrage:', error);
    process.exit(1);
});
