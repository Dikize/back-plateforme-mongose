const ObjectID = require("mongoose").Types.ObjectId;
const util = require("util");

// const { addcompteurErrors } = require('../../utils/errors.utils');
const {queryAddCompteur, queryGetAllCompteur, queryUpdateCompteur, queryDeleteCompteur}  = require("../../queries/compteur.queries")

// Créer un article
exports.addCompteur = async (req, res) => {
    const body = req.body

    try {
        const docs = await queryAddCompteur(body)
        return res.status(201).json(docs)

    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message)
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        // const errors = addcompteurErrors(err);
        // res.status(500).json(errors);
    }
}

// get tous les compteurs de l'utilisateur
exports.getAllCompteur = async (req, res) => {
    const comteurs = await queryGetAllCompteur()
    res.status(200).json(comteurs);
}

//update compteur
exports.updateCompteur = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    // const { marque, modele, technology, puissance, quantity, reference } = req.body;
    const body = req.body
    try {
        const docs = await queryUpdateCompteur(req.params.id, body)
        res.status(200).json(docs)

    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message )
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        // return res.status(500).json(errors);
    }
}

// delete Compteur
exports.deleteCompteur = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await queryDeleteCompteur(req.params.id)
        res.status(200).json({ message: "Successfully deleted. " });

    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message )
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        // return res.status(500).json(errors);
    }
}