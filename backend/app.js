const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://EzoVn:aS82YiMg4aenzUUt@cluster0.lp1lo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('La connexion a MongoDB à échouée !'));


app.use((req, res, next) => {
    console.log({ message: 'bien recu' });
    next();
})
app.use((req, res, next) => {
    res.json('bien recu');
})
// app.use(express.json());

module.exports = app;