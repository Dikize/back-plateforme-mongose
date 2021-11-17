const UserModel = require("../models/user.model");
const CarModel = require("../models/stocks/car/car.model");

exports.queryAddCar = (body) => {
    const newCar = new CarModel({ ...body })
    newCar.controleCar.addToSet({ ...body})
    newCar.save()
        UserModel.findOne({}).exec()
            .then(user => {
                user.carUser.push(newCar._id)
                user.save()
            })
    return newCar
};

exports.queryGetAllCar = () => {
    return CarModel.find().select()
};

exports.queryGetOneCar = (carId) => {
    return CarModel.findById(carId)
};

exports.queryUpdateCar = (carId, body) => {
    return CarModel.findOneAndUpdate(
        { _id: carId }, 
        { $set: { ...body, controleCar: body }},
        { new: true, upsert: true, setDefaultOnInsert: true },
        { runValidators: true}
    ).exec()
};

exports.queryDeleteCar = (carId) => {
    return CarModel.deleteOne({ _id: carId }).exec()
};

exports.query = () => {
    return 
};