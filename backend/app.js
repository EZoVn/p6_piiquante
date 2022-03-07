const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

/**Chargement du fichier .env */
require('dotenv').config();


const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.key,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('La connexion a MongoDB à échouée !'));

app.use(express.json());

/**CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**Route images */
app.use('/images', express.static(path.join(__dirname, 'images')));

/**Route API */
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;