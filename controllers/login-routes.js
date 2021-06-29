const router = require('express').Router();
const { Interest } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard')
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard')
        return;
    }

    Interest.findAll({
        attributes: ['id', 'interest_name']
    })
    .then(dbInterestData => {
        const interests = dbInterestData.map(interest => interest.get({ plain: true }));

        res.render('signup', {
            interests,
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;