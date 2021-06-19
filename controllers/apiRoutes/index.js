const router = require('express').Router();

const userRoutes = require('./user-routes');
const bioRoutes = require('./bio-routes');
// Other api routes will be required here

router.use('/users', userRoutes);
router.use('/bios', bioRoutes);
// Other api routes will be used here

module.exports = router;
