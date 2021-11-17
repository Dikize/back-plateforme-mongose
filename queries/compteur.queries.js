const UserModel = require("../models/user.model");
const CompteurModel = require("../models/stocks/compteur.model");

exports.queryAddCompteur = (body) => {
    const newCompteur = new CompteurModel({ ...body })
    newCompteur.save()
        UserModel.findOne({}).exec()
            .then(user => {
                user.compteurUser.push(newCompteur._id)
                user.save()
            })
    return newCompteur
};

exports.queryUpdateCompteur = (compteurId, body) => {
    return CompteurModel.findOneAndUpdate(
        { _id: compteurId }, 
        { $set: { ...body }},
        { new: true, upsert: true, setDefaultOnInsert: true },
        { runValidators: true}
    ).exec()
};

exports.queryDeleteCompteur = (compteurId) => {
    return CompteurModel.deleteOne({ _id: compteurId }).exec()
};

exports.queryGetAllCompteur = () => {
    return CompteurModel.find().select();
};

exports.query = () => {
    return
};