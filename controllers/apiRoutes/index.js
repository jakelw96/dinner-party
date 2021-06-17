const router = require('express').Router();

const userRoutes = require('./user-routes');
// Other api routes will be required here

router.use('/users', userRoutes);
// Other api routes will be used here

module.exports = router;
