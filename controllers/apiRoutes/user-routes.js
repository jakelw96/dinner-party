const router = require('express').Router();
const { User, Bio, Party, Interest, UserInterests } = require('../../models');

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
            // {
            //     model: Interest,
            //     attributes: ['id', 'interest_name']
            // }
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
        
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Updates the user to add in interests
// router.put('/:id', (req, res) => {
//     const userID = parseInt(req.params.id, 10);
//     console.log(userID);
//     User.update(
//         {
//             interestIds: req.body.interestIds
//         },
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     )
//     .then((user) => {
//         if (req.body.interestIds.length) {
//             const interestsTagsArr = req.body.interestIds.map((interest_id) => {
//                 return {
//                    user_id: userID,
//                    interest_id
//                 };
//             })
//             return UserInterests.bulkCreate(interestsTagsArr)
//         }
//         // If no interests
//         res.status(200).json(user)
//     })
//     .then(dbUserData => {
//         // Session saving data will go here
        
//         res.json(dbUserData)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// Login 
router.post('/login', (req, res) => {
    // To be completed
});

// Logout
router.post('/logout', (req, res) => {
    // To be completed
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