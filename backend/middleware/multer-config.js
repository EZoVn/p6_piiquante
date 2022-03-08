const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        /**Elimine les espaces du nom de fichier
         * les remplaces par des underscors
         * supprime l'extension
        */
        const name = file.originalname.split(' ').join('_').slice(0,-4);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        // callback(null, name);
    }
});

module.exports = multer({ storage }).single('image');