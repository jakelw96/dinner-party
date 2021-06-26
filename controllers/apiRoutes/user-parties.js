const router = require('express').Router();
const { User, Bio, Party, Interest, UserInterests } = require('../../models');
const isAuthenticate = require('../../utils/authenticate');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});