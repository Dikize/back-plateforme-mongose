const express = require('express');
const router = express.Router();

const disjoncteurController = require('../../controllers/stock/disjoncteur.controller');
const auth = require('../../middleware/auth.middleware');

router.route('/')
// Ajouter
.post(disjoncteurController.addDisjoncteur)
// Afficher
.get(disjoncteurController.getAllDisjoncteur)
// // Afficher
// .get(disjoncteurController.getOneDisjoncteur);

router.route('/:id')
// Modifier
.put(disjoncteurController.updateDisjoncteur)
// Supprime
.delete(disjoncteurController.deleteDisjoncteur)

module.exports = router;