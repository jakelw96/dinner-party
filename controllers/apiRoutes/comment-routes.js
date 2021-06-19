const router = require('express').Router();
const { Party, User} = require('../../models');
const Comment = require('../../models/Comment');




//Get all comments
router.get('/', (req,res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]

    })
    .then(dbCommentData => res.json(dbCommentData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));
});

//Get a single comment
router.get('/:id', (req,res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }));
});

//Create a comment
router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a comment
router.put('/:id', (req,res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete a comment
router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    //Should we do an alert here to ask if sure they want to delete comment??//
    // .then(dbPartyData => {
    //     if (!dbPartyData) {
    //         res.status(404).json({message: 'No party found with this id'});
    //         return;
    //     }
    //     res.json(dbPartyData)
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    });
});    

module.exports = router;