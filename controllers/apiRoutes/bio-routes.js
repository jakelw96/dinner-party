const router = require('express').Router();
const { User, Bio } = require('../../models');
const isAuthenticate = require('../../utils/authenticate');


// Get all bios
router.get('/', isAuthenticate, (req, res) => {
    Bio.findAll({
        attributes: ['id', 'bio_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBioData => res.json(dbBioData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single bio
router.get('/:id', isAuthenticate, (req, res) => {
    Bio.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'bio_text', 'user_id'],
        include: [
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
    .then(dbBioData => {
        if (!dbBioData) {
            res.status(404).json({ message: 'No bio found with this id' });
            return;
        }
        res.json(dbBioData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a bio
router.post('/', isAuthenticate, (req, res) => {
    Bio.create({
        bio_text: req.body.bio_text,
        user_id: req.session.user_id  // To be updated to reflect session instead
    })
    .then(dbBioData => res.json(dbBioData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update bio
router.put('/:id', isAuthenticate, (req, res) => {
    Bio.update(
        {
            bio_text: req.body.bio_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBioData => {
        if (!dbBioData) {
            res.status(404).json({ message: 'No bio found with this id' });
            return;
        }
        res.json(dbBioData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;