const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const isAuthenticate = require('../../utils/authenticate');

//Get all comments
router.get('/', isAuthenticate, (req,res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_name', 'post_text']
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
router.get('/:id', isAuthenticate, (req,res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'comment_text', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_name', 'post_text']
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
router.post('/', isAuthenticate, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id, // Will be session data 
            post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    };
});

//Update a comment
router.put('/:id', isAuthenticate, (req,res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
            user_id: req.body.user_id, // To be session later
            post_id: req.body.post_id
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
router.delete('/:id', isAuthenticate, (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json;
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});    

module.exports = router;