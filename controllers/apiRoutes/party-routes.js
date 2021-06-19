const router = require('express').Router();
const { Party, Comment, Post} = require('../../models');

//Get all parties
router.get('/', (req, res) => {
    Party.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: Party,
                attributes: ['party_name']
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
                attributes: ['party_name']
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
        part_name: req.body.party_name
    })
    .then(dbPartyData => {
      if (!dbPartyName) {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req,res) => {
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