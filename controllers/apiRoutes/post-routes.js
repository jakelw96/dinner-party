const router = require('express').Router();
const { User, Party } = require('../../models');

//Get all posts
router.get('/', (req, res) => {
    Post.findAll(
        {
        include: [
            {
               model: Party,
               attributes: ['party_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get one post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_text', 'user_id'],
        include: [
            {
               // model: User, 
               // attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
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