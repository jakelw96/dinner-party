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
        post_name: req.body.post_name
    })
    .then(dbPostData => {
      if (!dbPostName) {
            res.status(404).json({message: "This post name already exists!"});
            return;
        }
        res.json(dbPostData)
    })        
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a post
router.put('/:id', (req, res) => {
    Post.update(
        {
            post_name: req.body.post_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
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