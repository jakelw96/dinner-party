const router = require('express').Router();
const { User, Bio, Party, Interest, UserInterests} = require('../../models');
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

// Get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [      // This is where we will associate with the other models
            {
                model: Bio,
                attributes: ['id', 'bio_text']
            },
            {
                model: Party,
                attributes: ['id', 'party_name']
            },
            {
                model: Interest,
                attributes: ['id', 'interest_name']
            }
        ] 
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        interestIds: req.body.interestIds
    })
    .then((user) => {
        if (req.body.interestIds.length) {
            const interestsTagsArr = req.body.interestIds.map((interest_id) => {
                return {
                   user_id: user.id,
                   interest_id
                };
            })
            return UserInterests.bulkCreate(interestsTagsArr)
        }
        // If no interests
        res.status(200).json(user)
    })
    .then(dbUserData => {
        // Session saving data will go here
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update users interests
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then((user) => {
        // Find all associated interests
        return UserInterests.findAll({ where: { user_id: req.params.id } })
    })
    .then((userInterests) => {
    // Get current interest ids
    const interests = userInterests.map(({ interest_id }) => interest_id);
    // Filter list of new ids
    const newInterests = req.body.interestIds
        .filter((interest_id) => !interests.includes(interest_id))
        .map((interest_id) => {
            return {
                user_id: req.params.id,
                interest_id
            };
        });
        // Figures out which interests to remove
        const interestsToRemove = userInterests
            .filter(({ interest_id }) => !req.body.interestIds.includes(interest_id))
            .map(({ id }) => id);

        // Delete tags to remove and create the new tags for party
        return Promise.all([
            UserInterests.destroy({where: { id: interestsToRemove } }),
            UserInterests.bulkCreate(newInterests)
        ]);
    })
    .then((updatedInterests) => res.json(updatedInterests))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;