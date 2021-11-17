const router = require('express').Router()
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const compteurRoutes = require('./stocks/compteur.routes');
const disjoncteurRoutes = require('./stocks/disjoncteur.routes');
const carRoutes = require('./stocks/car.routes');
// const {checkUser, requireAuth} = require('./middleware/auth.middleware');


// routes
router.use('/user', userRoutes);
router.use('/post', postRoutes);

// stock
router.use('/compteur', compteurRoutes);
router.use('/disjoncteur', disjoncteurRoutes);
router.use('/car', carRoutes);

module.exports = router;