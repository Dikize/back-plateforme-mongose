const UserModel = require("../models/user.model");

exports.queryGetAllUsers = () => {
    return UserModel.find()
    .populate('compteurUser', 'marque modele technology etat')
    .populate('disjoncteurUser', 'marque modele etat')
    .populate('carUser', 'marque immatricule etat')
    .select(["-password", "-role"]);
};

exports.queryFindUserInfo = (param) => {
    return UserModel.findById( param )
    .select(["-password", "-role"])
    .exec()
};

exports.queryDeleteUser = (param) => {
    return UserModel.deleteOne({ param }).exec()
};

exports.queryUpdateUser = (userId, body) => {
    UserModel.findOneAndUpdate( 
        { _id: userId }, 
        { $set: { bio: body }}, 
        { new: true, upsert: true, setDefaultOnInsert: true },
        { runValidators: true}
    ).exec()
}

exports.queryUpdateFollow = (followId, followBody) => {
    return Promise.all([
        UserModel.findByIdAndUpdate(
            followId,
            { $addToSet: { following: followBody } },
            { new: true, upsert: true }
        ).exec(),

        UserModel.findByIdAndUpdate(
            followBody,
            { $addToSet: { followers: followId } },
            { new: true, upsert: true }
        ).exec()
    ])
};

exports.queryUpdateUnfollow = (unfollowId, unfollowBody) => {
    return Promise.all([
        UserModel.findByIdAndUpdate(
            unfollowId,
            { $pull: { following: unfollowBody } },
            { new: true, upsert: true }
        ).exec(),

        // remove to following list
        UserModel.findByIdAndUpdate(
            unfollowBody,
            { $pull: { followers: unfollowId } },
            { new: true, upsert: true }
        ).exec()
    ])
};
