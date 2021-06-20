const router = require('express').Router();
const { User, Comment } = require('../../models');

//Get all posts
router.get('/', (req, res) => {
    Bio.findAll({
        attributes: ['id', 'post_text', 'user_id'],
        include: [
            {
                model: Party,
               // attributes: ['username']
            }
        ]
    })
    .then(dbBioData => res.json(dbBioData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});