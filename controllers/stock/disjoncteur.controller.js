const ObjectID = require("mongoose").Types.ObjectId;
const {queryAddDisjoncteur, queryGetAllDisjoncteur, queryUpdateDisjoncteur, queryDeleteDisjoncteur}  = require("../../queries/disjoncteur.queries")
// const { addDisjoncteurErrors } = require('../../utils/errors.utils');

// Créer un article
exports.addDisjoncteur = async (req,res) => {
    const body = req.body
    try {
        const docs = await queryAddDisjoncteur(body)
        return res.status(201).json(docs)
    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message)
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        // const errors = addDisjoncteurErrors(err);
        // res.status(500).json(errors);
    }
}

// get tous les articles de l'utilisateur
exports.getAllDisjoncteur = async (req,res) => {
    const disjoncteur = await queryGetAllDisjoncteur()
    res.status(200).json(disjoncteur);
}

//update disjoncteur
exports.updateDisjoncteur = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const docs = await queryUpdateDisjoncteur(req.params.id, req.body)
        res.status(200).json(docs)

    } catch (err) {
            return res.status(500).json({ message: err });
    }
}

// delete disjoncteur
exports.deleteDisjoncteur = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await queryDeleteDisjoncteur(req.params.id)
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

