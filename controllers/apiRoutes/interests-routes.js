const router = require('express').Router();
const { Interest, Party, User } = require('../../models');

// Get all interests
router.get('/', (req, res) => {
    Interest.findAll({
        attributes: ['interest_name'],
        include: [
            // {
            //     model: User,
            //     attributes: ['username']
            // },
            {
                model: Party,
                attributes: ['party_name']
            }
        ]
    })
    .then(dbInterestData => res.json(dbInterestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single interest
router.get('/:id', (req, res) => {
    Interest.findOne({
        attributes: ['interest_name'],
        where: {
            id: req.params.id
        },
        include: [
            // {
            //     model: User,
            //     attributes: ['username']
            // },
            {
                model: Party,
                attributes: ['party_name']
            }
        ]
    })
    .then(dbInterestData => {
        if (!dbInterestData) {
            res.status(404).json({ message: 'No interest found with this id' })
            return;
        }
        res.json(dbInterestData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a new interest
router.post('/', (req, res) => {
    Interest.create({
        interest_name: req.body.interest_name
    })
    .then(dbInterestData => res.json(dbInterestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete an interest
router.delete('/:id', (req, res) => {
    Interest.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbInterestData => {
        if (!dbInterestData) {
            res.status(404).json({ message: 'No interest with this id' })
            return;
        }
        res.json(dbInterestData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;