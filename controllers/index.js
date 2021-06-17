const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
// Handlebar/views routes will be required here

router.use('/api', apiRoutes);
// Handlebar/views routes will be used here

module.exports = router;