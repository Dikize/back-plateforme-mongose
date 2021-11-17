const UserModel = require("../models/user.model");
const DisjoncteurModel = require("../models/stocks/disjoncteur.model");

exports.queryAddDisjoncteur = (body) => {
    const newDisjoncteur = new DisjoncteurModel({ 
        ...body
    })
    newDisjoncteur.save()
    UserModel.findOne({}).exec()
        .then(user => {
            user.disjoncteurUser.push(newDisjoncteur._id)
            user.save()
        })
    return newDisjoncteur
};

exports.queryUpdateDisjoncteur = (disjoncteurId, body) => {
    return DisjoncteurModel.findOneAndUpdate(
        { _id: disjoncteurId }, 
        { $set: { ...body }},
        { new: true, upsert: true, setDefaultOnInsert: true },
        { runValidators: true}
    ).exec()
};

exports.queryDeleteDisjoncteur = (disjoncteurId) => {
    return DisjoncteurModel.deleteOne({ _id: disjoncteurId }).exec()
};

exports.queryGetAllDisjoncteur = () => {
    return DisjoncteurModel.find().select();
};

exports.query = () => {
    return
};