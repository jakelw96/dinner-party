const router = require('express').Router();
const { User, Party, Post, Comment, Interest } = require('../models');
const isAuth = require('../utils/authenticate');

// Gets all parties
router.get('/', (req, res) => {
    Party.findAll({
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
    })
    .then(dbPartyData => {
        const parties = dbPartyData.map(party => party.get({ plain: true }));
        res.render('homepage', {
            parties,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single party
router.get('/party/:id', (req, res) => {
    Party.findOne({
        // where: {
        //     id: req.params.id
        // },
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
        
    })
    .then(dbPartyData => {
        if (!dbPartyData) {
            res.status(404).json({ message: 'No party with this id' });
            return;
        }
        const party = dbPartyData.get({ plain: true });

        res.render('single-party', {
            party,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single post 
router.get('/post/:id', (req, res) => {
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