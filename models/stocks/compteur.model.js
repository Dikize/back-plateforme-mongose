const mongoose = require('mongoose');

const compteurSchema = new mongoose.Schema({
    // users: {
    //     // required: [true, 'Le est obligatoire'],
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user"
    // },
    compteurId: {
        type: String,
        required: [true, "L'id de l'utilisateur est obligatoire"]
    },
    // index: {
    //     type: Number,
    // },
    marque: {
        type: String,
        required: [true, 'La marque est obligatoire'],
    },
    modele: {
        type: String,
        required: [true, 'Le modele est obligatoire'],
        default: 'monophase',
        enum: ["monophase", "triphase"]
    },
    technology: {
        type: String,
        required: [true, 'La technologie est obligatoire'],
        default: 'G1',
        enum: ["G1", "G3"]
    },
    puissance: {
        type: String,
        required: [true, 'La puissance est obligatoire'],
        default: "60A",
        enum: ["60A", "90A"]
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
        // donne: depanne un compteur à un collègue
    }
}, {
    timestamps: true,
});

// compteurSchema.post("validate", function(doc, next) {
//     console.log('post validate')
//     return CompteurModel.countDocuments().exec()
//         .then(nbr => doc.index = nbr + 1)
//         .catch(err => console.log(err));
// });
// compteurSchema.index({ marque: 1 })

const CompteurModel = mongoose.model("compteur", compteurSchema);

module.exports = CompteurModel;