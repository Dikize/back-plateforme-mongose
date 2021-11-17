const mongoose = require('mongoose');

const controleCarSchema = new mongoose.Schema({
    controleCar: {
        type: String,
        required: true
    },
    verifficationNiveaux: {
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
    },

    visibilite: {
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
    },

    pneumatique: {
        mesurePressionAvant: {
            type: String,
            required: true,
            default: 'max',
            enum: ["max", "3/4", "2/4", "1/4"]
        },
        mesurePressionArriere: {
            type: String,
            required: true,
            default: 'max',
            enum: ["max", "3/4", "2/4", "1/4"]
        },
        usure: {
            type: String,
            required: true,
            default: 'bon',
            enum: ["bon", "moyen", "deffectueux"]
        },
    },

    eclairage: {
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
    },
    
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

// const carModel = mongoose.model("car", controleCarSchema);
module.exports = controleCarSchema;