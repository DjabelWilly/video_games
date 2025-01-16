const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion réussie !');
        const collections = await mongoose.connection.db.collections();
        console.log('Collections:', collections.map(c => c.collectionName));
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection(); 