const router = require('express').Router();
const { User, Party, Comment, Post, PartyInterests, Interest} = require('../../models');
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
router.post('/', isAuthenticate, (req,res) => {
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
        // If no interests
        res.status(200).json(party)
    })
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

//Update a party
router.put('/:id', isAuthenticate, (req, res) => {
    Party.update(
        {
            party_name: req.body.party_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
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