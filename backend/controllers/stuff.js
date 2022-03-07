const Sauce = require('../models/Sauce');
const fs = require('fs');

/**AJOUT D'UNE SAUCE
 * parse des infos en json
 * supprime l'id crée par le frontend
 * crée un nouveau schema ... fait une copie de tout les elements
 * récupère l'image
 * sauvegarde dans la base de données
 */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

/**AFFICHE TOUTES LES SAUCES
 * find() pour trouver les elements dans api/sauces
 * affiche les sauces
 */
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

/**AFFICHE UNE SAUCE
 * findOne() pour trouver la sauce séléctionner dans api/sauce/:id
 * affiche la sauce
 */
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(500).json({ error }));
}

/**SUPPRIMER UNE SAUCE
 * findOne() pour retrouver la sauce séléctionner
 * s'il n'y a pas de sauce return err404
 * si je ne suis pas authorisé return err401
 * fs.unlink pour supprimer la photo du du system
 * supprime la sauce de grâce son ID api/sauce/:id
 */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({ error: new Error('Sauce non trouvé !') });
            } if (sauce.userID !== req.auth.userId) {
                return res.status(401).json({ error: new Error('Requête non autorisée !') });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

/**MODIFIER UNE SAUCE
 * sauceObject regarde s'il existe une image ou non 
 * si oui on traite la nouvelle image
 * sinon on traite l'objet entrant
 * ensuite on effectue la modification a partir de l'_id
 * avec les nouvelles modification
 */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status());
};

/**NON FINI EN TEST */
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((like) => {
            if (like = 1) {
                Sauce.updateOne({ _id: req.params.id }, { userId: req.params.usersLiked })
            } else{
                console.log('nan');
            }
        })
        .catch(error => res.status(404).json({ error }));
};