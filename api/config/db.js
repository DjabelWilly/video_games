const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔄 Tentative de connexion à MongoDB...');
        // Afficher l'URI masquée pour debug
        const maskedURI = process.env.MONGO_URI ?
            process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@') :
            'URI manquante';
        console.log('URI utilisée:', maskedURI);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connecté avec succès');

        // Vérifier si la base contient des données
        const collections = await mongoose.connection.db.collections();
        console.log(`📊 Collections trouvées: ${collections.length}`);
    } catch (error) {
        console.error('❌ Erreur de connexion MongoDB:', error.message);
        throw error;  // Propager l'erreur au lieu de process.exit
    }
};

module.exports = connectDB;