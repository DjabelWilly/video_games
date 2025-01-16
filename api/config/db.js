const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔄 Tentative de connexion à MongoDB...');
        console.log('URI:', process.env.MONGO_URI ? '✅ URI définie' : '❌ URI manquante');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connecté avec succès');
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;