const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

// Test de connexion immédiat
console.log('🚀 Démarrage du serveur...');
console.log('Variables d\'environnement:', {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI ? '✅ Définie' : '❌ Manquante'
});

//Connexion à la DB
connectDB()
    .then(async () => {
        console.log('✅ Connexion DB réussie');
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

        // Test de la connexion MongoDB au démarrage
        const mongoose = require('mongoose');
        const collections = await mongoose.connection.db.collections();
        console.log('📊 Collections disponibles:', collections.map(c => c.collectionName));

        app.listen(port, () => {
            console.log(`🌍 Serveur démarré sur le port ${port}`);
        });
    })
    .catch(error => {
        console.error('❌ Erreur de démarrage:', error);
        process.exit(1);
    });
