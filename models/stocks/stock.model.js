const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    disjoncteurUser: [{
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "disjoncteur"
    }],
    compteurUser: [{
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "compteur"
    }],
    // vehiculeUser: [{
    //     // required: true,
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "vehicule"
    // }],
}, {
    timestamps: true,
});

// stockSchema.index({ disjoncteurUser: 1, compteurUser: 1 })

const stockModel = mongoose.model("stock", stockSchema);

module.exports = stockModel;