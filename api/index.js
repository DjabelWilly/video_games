const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

//Connexion à la DB
connectDB().then(() => {
    const app = express();

    // Configuration CORS détaillée
    app.use(cors({
        origin: '*',  // Autorise toutes les origines
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

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
    app.use("/games", require("./routes/gameRoutes")); // Enlever le préfixe /api

    // Lance le serveur
    app.listen(port, () => console.log("le serveur est connecté sur le port " + port));
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
