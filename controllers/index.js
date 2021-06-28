const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const loginRoutes = require('./login-routes');
const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');
// Handlebar/views routes will be required here

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/homepage', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
// Handlebar/views routes will be used here

module.exports = router;