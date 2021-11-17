const mongoose = require('mongoose');

const disjoncteurSchema = new mongoose.Schema({
    disjoncteurId: {
        type: String,
        required: true
    },
    marque: {
        type: String,
        required: [true, 'La marque est obligatoire'],
    },
    modele: {
        type: String,
        required: [true, 'Le modèle est obligatoire'],
        default: 'monophase',
        enum: ["monophase", "triphase"]
    },
    puissance: {
        type: String,
        required: [true, 'La puissance est obligatoire'],
        default: '60A',
        enum: ["10/30A", "30/60A", "15/45A", "60A", "60/90A"]
    },
    quantity: {
        type: Number,
        required: [true, 'La quantite est obligatoire'],
    },
    reference: {
        type: String,
        required: [true, 'La référence est obligatoire'],
    },
    etat: {
        type: String,
        required: [true, 'Est-il posé, en stock, deffectueux ou donner à un collègue?'],
        default: 'stock',
        enum: ["Pose", "deffectueux", "stock", "donne"]
        // donne: depanner un disjoncteur à un collègue
    }
}, {
    timestamps: true,
});
// disjoncteurSchema.index({ marque: 1 })

const DisjoncteurModel = mongoose.model("disjoncteur", disjoncteurSchema);

module.exports = DisjoncteurModel;