// const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema(
//     {
//         firstname: {
//             type: String,
//             required: true,
//             minLength: 3,
//             maxLength: 80,
//             trim: true
//         },
//         lastname: {
//             type: String,
//             required: true,
//             minLength: 3,
//             maxLength: 80,
//             trim: true
//         },
//         email: {
//             type: String,
//             required: true,
//             validate: [isEmail],
//             lowercase: true,
//             unique: true,
//             trim: true,
//         },
//         userInfo: {
//             // mobile: {
//             //   type: String,
//             //   required: false,
//             //   min: 10,
//             //   max: 15,
//             // },
//             // address: {
//             //   rue         :{ type: String, required: true, max: 5 },
//             //   ville       :{ type: String, required: true, max: 5 },
//             //   codePostale :{ type: Number, required: true, max: 5 },
//             // },
//             // birthDate: {
//             //   type: Date,
//             //   required: false,
//             // },
//             // sex: {
//             //   type: String,
//             //   enum: ["Male", "Female"],
//             //   required: true,
//             // },
//         },
//         password: {
//             type: String,
//             required: true,
//             max: 1024,
//             minlength: 6
//         },
//         isActive :{ type: Boolean, required: true, default: true },
//         // indentityProfesional: {
//         //     required: true,
//         //     matricule :{
//         //         type: String,
//         //         max: 15,
//         //         unique: true,
//         //         required: true,
//         //     },
//         //     secuSocial :{
//         //         type: Number,
//         //         max: 15,
//         //         unique: true,
//         //         required: true,
//         //     },
//         //     emploi :{
//         //         type: String,
//         //         max: 80,
//         //         required: true,
//         //     },
//         //     statutProfesional :{
//         //         type: String,
//         //         max: 80,
//         //         required: true,
//         //     },
//         //     access: {
//         //         type: String,
//         //         required: true,
//         //         default: 'level-5',
//         //         enum: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5"]
//         //     },
//         // },
//         picture: {
//             type: String,
//             default: "./uploads/profil/random-user.png"
//         },
//         bio :{
//             type: String,
//             max: 1024,
//         },
//         followers: {
//             type: [String]
//         },
//         following: {
//             type: [String]
//         },
//         likes: {
//             type: [String]
//         }
//     },
//     {
//         timestamps: true,
//     }
// );

// // play function before save into display: 'block',
// userSchema.pre("save", async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         }
//         throw Error('incorrect password');
//     }
//     throw Error('incorrect email')
// };

// // userSchema.plugin(require('mongoose-role'), {
// //   roles: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5", "public"],
// //   accessLevels: {
// //     superadmin: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5"],
// //     level1: ['level1', 'level2', 'level3', 'level4', 'level5'],
// //     level2: ['level2', 'level3', 'level4', 'level5'],
// //     level3: ['level3', 'level4', 'level5'],
// //     level4: ['level4', 'level5'],
// //     level5: ['level5'],
// //     public: ['public'],
// //   }
// // })

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;

//     // home: {
//     //   rue         :{ type: String, required: true, max: 5 },
//     //   ville       :{ type: String, required: true, max: 5 },
//     //   codePostale :{ type: Number, required: true, max: 5 },
//     // },
//     // secteur: {
//     //   secteur de travail
//     // },