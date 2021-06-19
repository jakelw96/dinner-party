const router = require('express').Router();
const { Party, Comment, Post} = require('../../models');

//Get all parties
router.get('/', (req, res) => {
    Party.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: Party,
                attributes: ['title']
            }
        ]
    })
    .then(dbPartyData => res.json(dbPartyData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single party
router.get('/:id', (req,res) => {
    Party.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title'],
        include: [
            {
                model: Party,
                attributes: ['title']
            }
        ]
    })
    .then(dbPartyData => {
        if (!dbPartyData) {
            res.status(404).json({message: 'No party found with this title'});
            return;
        }
        res.json(dbPartyData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});