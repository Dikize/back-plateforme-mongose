const express = require('express');
const router = express.Router();

const carController = require('../../controllers/stock/car.controller');
// const auth = require('../../middleware/auth.middleware');

// router.route('/:userId')
router.route('/')
// Ajouter
.post(carController.addCar)
// Afficher toutes les voitures
.get(carController.getAllCar);


// router.route('/:userId/:id')
router.route('/:id')

// Afficher une voiture
.get(carController.getOneCar)

// Modifier
.put(carController.updateCar)
// Supprime
.delete(carController.deleteCar)

module.exports = router;