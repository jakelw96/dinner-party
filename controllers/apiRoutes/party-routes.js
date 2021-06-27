const router = require('express').Router();
const { User, Party, Comment, Post, PartyInterests, UserParties, Interest} = require('../../models');
const isAuthenticate = require('../../utils/authenticate');

//Get all parties
router.get('/', (req, res) => {
    Party.findAll({
        attributes: ['id', 'party_name', 'user_id'],
        include: [
            {
                model: Interest,
                attributes: ['interest_name']
            },
            {
                model: User,
                attributes: ['username']
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
        attributes: ['id', 'party_name', 'user_id'],
        include: [
            {
                model: Interest,
                attributes: ['id', 'interest_name']
            },
            {
                model: Post,
                attributes: ['id', 'post_name', 'post_text', 'user_id', 'party_id'],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'comment_text', 'user_id', 'post_id']
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPartyData => {
        if (!dbPartyData) {
            res.status(404).json({message: 'No party found with this id'});
            return;
        }
        res.json(dbPartyData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a party
router.post('/', (req,res) => {
    Party.create({
        party_name: req.body.party_name,
        user_id: req.body.user_id,    // Will be session data later
        interestIds: req.body.interestIds
    })


    .then((party) => {
        if (req.body.interestIds.length) {
            const interestsTagsArr = req.body.interestIds.map((interest_id) => {
                return {
                   party_id: party.id,
                   interest_id
                };
            })
            return PartyInterests.bulkCreate(interestsTagsArr)
        }
   
    .then(dbPartyData => {
      if (!dbPartyData) {
            res.status(404).json({message: "This party name already exists!"});
            return;
        }
        res.json(dbPartyData)
    })        
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a party's name and interests
router.put('/:id', (req, res) => {
    Party.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((party) => {
        // Find all associated interests
        return PartyInterests.findAll({ where: { party_id: req.params.id } })
    })
    .then((partyInterests) => {
    // Get current interest ids
    const interests = partyInterests.map(({ interest_id }) => interest_id);
    // Filter list of new ids
    const newInterests = req.body.interestIds
        .filter((interest_id) => !interests.includes(interest_id))
        .map((interest_id) => {
            return {
                party_id: req.params.id,
                interest_id
            };
        });
        // Figures out which interests to remove
        const interestsToRemove = partyInterests
            .filter(({ interest_id }) => !req.body.interestIds.includes(interest_id))
            .map(({ id }) => id);

        // Delete tags to remove and create the new tags for party
        return Promise.all([
            PartyInterests.destroy({where: { id: interestsToRemove } }),
            PartyInterests.bulkCreate(newInterests)
        ]);
    })
    .then((updatedInterests) => res.json(updatedInterests))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete a party
router.delete('/:id', isAuthenticate, (req,res) => {
    Party.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPartyData => {
        if (!dbPartyData) {
            res.status(404).json({message: 'No party found with this id'});
            return;
        }
        res.json(dbPartyData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});    

module.exports = router;
