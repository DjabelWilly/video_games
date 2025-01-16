const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

//Connexion à la DB
connectDB().then(() => {
    const app = express();

    // Middleware de sécurité
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });

    // Configuration CORS
    app.use(cors({
        origin: 'https://video-games-frontend.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false
    }));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://video-games-frontend.vercel.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use("/api/games", require("./routes/gameRoutes"));


    // Lance le serveur
    app.listen(port, () => console.log("le serveur est connecté sur le port " + port));
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
