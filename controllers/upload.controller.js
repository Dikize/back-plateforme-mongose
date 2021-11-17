const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedFileExtension != "image/jpg" &&
      req.file.detectedFileExtension != "image/png" &&
      req.file.detectedFileExtension != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return console.log(err);
    // return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../frontend/public/uploads/profil/${fileName}`
    )
  );

  // const tempPath = req.file.path;
  // fileName = req.body.stream + Date.now() + ".jpg";
  // const targetPath = path.join(__dirname, "../client/public/uploads/profil/" + fileName);

  // fs.rename(tempPath, targetPath, err => {
  //     if (err) return console.log(err);
  // });

  try {
    await UserModel.findByIdAndUpdate( 
      req.body.userId,
      { $set : {picture: "./uploads/profil/" + fileName}},
      { new: true },
    ).exec()
      .then ( docs => res.send(docs) )        
      .catch (res.status(500).send({ message: err }))

  } catch (err) {
    return res.status(500).send({ message: err });
  }
};