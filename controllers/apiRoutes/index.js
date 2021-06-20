const router = require('express').Router();

const userRoutes = require('./user-routes');
const bioRoutes = require('./bio-routes');
const partyRoutes = require('./party-routes');
// Other api routes will be required here

router.use('/users', userRoutes);
router.use('/bios', bioRoutes);
router.use('/parties', partyRoutes);
// Other api routes will be used here

module.exports = router;
