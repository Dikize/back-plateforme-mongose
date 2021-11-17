// const mongoose = require('mongoose');

// const identityProfesionalPostSchema = new mongoose.Schema(
//     {
//         isActive :{ type: Boolean, required: true, default: true },
//         secteur: {
//             type: String,
//             max: 40,
//             required: true,
//         },
//         matricule :{
//             type: String,
//             max: 15,
//             unique: true,
//             required: true,
//         },
//         secuSocial :{
//             type: Number,
//             max: 15,
//             unique: true,
//             required: true,
//         },
//         emploi :{
//             type: String,
//             max: 80,
//             required: true,
//         },
//         statutProfesional :{
//             type: String,
//             max: 80,
//             required: true,
//         },
//         access: {
//             type: String,
//             required: true,
//             default: 'level-5',
//             enum: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5"]
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// identityProfesionalPostSchema.plugin(require('mongoose-role'), {
//     roles: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5", "public"],
//     accessLevels: {
//         superadmin: ["superadmin", "level-1", "level-2", "level-3", "level-4", "level-5"],
//         level1: ['level1', 'level2', 'level3', 'level4', 'level5'],
//         level2: ['level2', 'level3', 'level4', 'level5'],
//         level3: ['level3', 'level4', 'level5'],
//         level4: ['level4', 'level5'],
//         level5: ['level5'],
//         public: ['public'],
//     }
// })

// const IdentityProfesionalModel = mongoose.model("IdentityProfesional", identityProfesionalPostSchema);

// module.exports = IdentityProfesionalModel;