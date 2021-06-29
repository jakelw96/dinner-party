const router = require('express').Router();
const { User, Bio, Party, Post, Interest, UserInterests, Comment } = require('../../models');
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
        include: [      
            {
                model: Bio,
                attributes: ['id', 'bio_text']
            },
            {
                model: Party,
                attributes: ['id', 'party_name'],
                include: [
                    {
                        model: Interest,
                        attributes: ['id', 'interest_name']
                    },
                    {
                        model: Post,
                        attributes: ['id', 'post_name', 'post_text'],
                        include: {
                            model: Comment,
                            attributes: ['id', 'comment_text'],
                        }
                    }
                ]
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
        // Session saving data will go here
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json(user)
        })
        
        if (req.body.interestIds.length) {
            const interestsTagsArr = req.body.interestIds.map((interest_id) => {
                return {
                   user_id: user.id,
                   interest_id
                };
            })
            return UserInterests.bulkCreate(interestsTagsArr)
        }
        res.json(user)
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update users interests
router.put('/:id', isAuthenticate, (req, res) => {
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

        // Delete tags to remove and create the new interests for user
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

// Login 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this email' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// Logout
router.post('/logout', isAuthenticate, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

// Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
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

module.exports = router;