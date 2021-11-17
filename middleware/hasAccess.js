// function hasAccess(accessLevel) {
//     return function (req, res, next) {
//         if (req.session.user && req.session.user.hasAccess(accessLevel)) {
//             return next()
//         }
//         return res.json({
//             success: false,
//             error: 'Unauthorized'
//         })
//     }
// }

// var router = require('express').Router()

// router.get('/some-protected-route', [
//     hasAccess('user'), // protection middleware
//     function (req, res, next) {
//         console.log('you have access!')
//         res.json({
//             secure: true,
//             data: 'super secret data'
//         })
//     }
// ])


// // https://www.npmjs.com/package/mongoose-role

const authUser = (permission) => {
    return (req, res, next) => {
        const userRole = req.body.role
        if (permission.includes(userRole)) {
            next()
        } else {
            return res.status(401).json("Vous n'avez pas les autorisations nécessaire, veuillez vous rapprochez de votre supérieur.")
            
        }
    }
}

const authStock = (req, res, next) => {
    next();
}

module.exports = { authUser, authStock }