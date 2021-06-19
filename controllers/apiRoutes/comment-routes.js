const router = require('express').Router();
const { Party, User} = require('../../models');


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