const router = require('express').Router();
const { User, Bio, Party, Post, Comment, Interest} = require('../models');
const isAuth = require('../utils/authenticate');

// Gets single users data
router.get('/', (req, res) => {
    User.findOne({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'username'],
        include: [
            {
                model: Bio,
                attributes: ['id', 'bio_text']
            },
            {
                model: Interest,
                attributes: ['id', 'interest_name']
            },
            {
                model: Party,
                attributes: ['id', 'party_name', 'party_bio'],
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'post_name', 'post_text', 'user_id'],
                        include: [
                            {
                                model: Comment,
                                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                                include: {
                                    model: User,
                                    attributes: ['username']
                                }
                            },
                            {
                                model: User,
                                attributes: ['username']
                            } 
                        ]
                    },
                    {
                        model: Interest,
                        attributes: ['id', 'interest_name']
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ] 
            }
        ]
    })
    .then(dbUserData => {
        const user = dbUserData.get({ plain: true });
        res.render('dashboard', {
            user,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single post 
router.get('/post/:id', isAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_name', 'post_text'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
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
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;