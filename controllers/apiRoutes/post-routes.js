const router = require('express').Router();
const { User, Party, Post, Comment } = require('../../models');
const isAuthenticate = require('../../utils/authenticate');


//Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_name', 'post_text', 'user_id', 'party_id', 'created_at'],
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
        attributes: ['id', 'post_name', 'post_text', 'user_id', 'party_id', 'created_at'],
        include: [
            {
               model: Party, 
               attributes: ['party_name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['id','username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a post
router.post('/', (req,res) => {
    Post.create({
        post_name: req.body.post_name,
        post_text: req.body.post_text,  
        party_id: req.body.party_id,
        user_id: req.session.user_id,
    })
    .then(dbPostData => res.json(dbPostData))        
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a post
router.put('/:id', isAuthenticate, (req, res) => {
    Post.update(
        {
            post_name: req.body.post_name,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Delete a post
router.delete('/:id', isAuthenticate, (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
