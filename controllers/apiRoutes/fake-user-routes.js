const router = require('express').Router();
const {FakeUser} = require('../../models');
const faker = require('faker'); 

// Get all users
router.get('/', (req, res) => {
    FakeUser.findAll({
        attributes: { exclude: ['password']},
    })
    .then(dbFakeUserData => res.json(dbFakeUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;