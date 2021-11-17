const ObjectID = require("mongoose").Types.ObjectId;
const util = require("util");
const createError = require("http-errors");
const { queryGetAllUsers, queryUpdateUser, queryDeleteUser, queryFindUserInfo, queryUpdateFollow, queryUpdateUnfollow } = require("../queries/user.queries")

module.exports.getAllUsers = async (req, res) => {
    const users = await queryGetAllUsers()
    res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const docs = await queryFindUserInfo(req.params.id)
    res.status(200).json(docs)
};

module.exports.updateUser = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        const docs = await queryUpdateUser(req.params.id, req.body.bio)
        res.status(200).json(docs)
    } catch (err) {
        next(err)
        // console.log(err);
        // return res.status(500).json(console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80, colors: true })));
    } 
};

module.exports.deleteUser = async (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await queryDeleteUser({_id: req.params.id});
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        next(err)
        // return res.status(500).json(console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80, colors: true })));
    }
};

module.exports.follow = async (req, res, next) => {
    if ( !ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const docs = await queryUpdateFollow(req.params.id, req.body.idToFollow)
        res.status(201).json(docs)

    } catch (err) {
        next(err)
        const errors = Object.keys(err.errors).map( key => err.errors[key].message)
        // res.status(500).json(errors})
    }
};

module.exports.unfollow = async (req, res, next) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnfollow)
    )
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const docs = await queryUpdateUnfollow(req.params.id, req.body.idToUnfollow)
        res.status(201).json(docs)

    } catch (err) {
        next(err)
        // return res.status(500).json(console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80, colors: true })));
    }
};
