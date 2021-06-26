const router = require('express').Router();

const userRoutes = require('./user-routes');
const bioRoutes = require('./bio-routes');
const partyRoutes = require('./party-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const interestRoutes = require('./interests-routes');
const userPartyRoutes = require('./userParty-routes');
// Other api routes will be required here

//router.use('/users', userRoutes);
router.use('/bios', bioRoutes);
//router.use('/parties', partyRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/interests', interestRoutes);
router.use('/userparty', userPartyRoutes);
// Other api routes will be used here

module.exports = router;
