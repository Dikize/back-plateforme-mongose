const ObjectID = require("mongoose").Types.ObjectId;
const util = require("util");
const {queryAddCar, queryGetAllCar, queryGetOneCar, queryUpdateCar, queryDeleteCar}  = require("../../queries/cars.queries")

// Créer une voiture
exports.addCar = async (req, res) => {
    try {
        const newCar = await queryAddCar(req.body)
        res.status(201).json(newCar)

    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message )
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        // const errors = addcarErrors(err);
        res.status(400).send({ errors })
    }
}

// get toutes les voiture 
exports.getAllCar = async (req, res) => {
    const cars = await queryGetAllCar()
    res.status(200).json(cars);
}

exports.getOneCar = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const car = await queryGetOneCar(req.params.id)
    res.status(200).json(car);
}

//update voiture
exports.updateCar = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const docs = await queryUpdateCar(req.params.id, req.body)
        res.status(200).json(docs)

    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message )
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        return res.status(500).json(errors);
    }
}

// delete voiture
exports.deleteCar = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await queryDeleteCar(req.params.id)
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        const errors = Object.keys(err.errors).map( key => err.errors[key].message )
        console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));
        return res.status(500).json(errors);
    }
}