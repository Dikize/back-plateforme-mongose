const express = require('express');
const router = express.Router();

const compteurController = require('../../controllers/stock/compteur.controller');
// const auth = require('../../middleware/auth.middleware');

// router.route('/:userId')
router.route('/')
// Ajouter
.post(compteurController.addCompteur)
// Afficher
.get(compteurController.getAllCompteur);

// // Afficher
// .get('/:id', compteurController.getOneCompteur);

// router.route('/:userId/:id')
router.route('/:id')
// Modifier
.put(compteurController.updateCompteur)
// Supprime
.delete(compteurController.deleteCompteur)

module.exports = router;