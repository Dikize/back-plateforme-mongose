const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
    const messagePicture = req.file ? `${req.protocol}://${req.get('host')}/uploads/posts/${req.file.filename}` : null;
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: messagePicture,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        message: req.body.message,
    };

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    postModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.id } },
            { new: true }
        ).exec()
            .then ( docs => res.json(docs) )
            .catch (err => res.status(400).send({ error: err }))

        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id } },
            { new: true }
        ).exec()
            .then ( docs => res.status(201).json(docs) )
            .catch (err => res.status(400).send({ error: err }))
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.id } },
            { new: true }
        ).exec()
            .then ( docs => res.json(docs) )
            .catch (err => res.status(400).send({ error: err }))

        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id } },
            { new: true }
        ).exec()
            .then ( docs => res.status(201).json(docs) )
            .catch (err => res.status(400).send({ error: err }))

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true }
        ).exec()
            .then ( docs => res.json(docs) )
            .catch (err => res.status(400).send({ error: err }))

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findById(
            req.params.id, 
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                );

                if (!theComment) return res.status(404).send("Comment not found");
                theComment.text = req.body.text;

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err);
                });
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
                comments: {
                    _id: req.body.commentId,
                },
            },
        },
        { new: true },
        (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(400).send(err);
        }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};
