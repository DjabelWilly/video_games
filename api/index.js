const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require('cors');
const port = process.env.PORT;

//Connexion à la DB
connectDB().then(() => {
    const app = express();
    // app.use(cors());  
    // autoriser les requêtes provenant de l'URL frontend de vercel remplace app.use(cors())
    app.use(cors({ origin: 'https://video-games-frontend.vercel.app' }));
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
