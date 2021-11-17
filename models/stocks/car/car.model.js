const mongoose = require('mongoose');

const controleCarSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    niveauHuile: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    liquideRefroidissement: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    liquideLaveGlasse: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    liquideFreins: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    liquideBatterie: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },

    vitres: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    balaisEssuieGlaces: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    retroviseur: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    plaqueImmat: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    mesurePressionAvantPneu: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    mesurePressionArrierePneu: {
        type: String,
        required: true,
        default: 'max',
        enum: ["max", "3/4", "2/4", "1/4"]
    },
    usurePneu: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },

    feuxPosition: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    feuxCroisement: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    feuxRoute: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    feuxDetresse: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    clignotant: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    feuxStop: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
    feuxRecul: {
        type: String,
        required: true,
        default: 'bon',
        enum: ["bon", "moyen", "deffectueux"]
    },
}, {
    timestamps: true,
});

const carSchema = new mongoose.Schema({
    carId: {
        type: String,
        required: true
    },
    marque: {
        type: String,
        required: true,
    },
    immatricule: {
        type: String,
        required: true,
    },
    controleCar: [controleCarSchema],
    etat: {
        type: String,
        required: true,
        default: 'stock',
        enum: ["affecter", "garage", "stock", "accidente"]
        // donne: depanne un compteur à un collègue
    }
}, {
    timestamps: true,
});

const carModel = mongoose.model("car", carSchema);

module.exports = carModel;