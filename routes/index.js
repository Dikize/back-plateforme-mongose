const express = require('express');
const router = express.Router();
const path = require('path');
const api = require('./api');
const {checkUser, requireAuth} = require('../middleware/auth.middleware');

// jwt
router.get('*', checkUser);
router.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

router.use('/../frontend/public', express.static(path.join(__dirname, 'images')));
router.use('/api', api);

// router.get('/',  (req, res) => {
//     res.render('index');
// })

module.exports = router;