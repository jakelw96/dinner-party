const router = require('express').Router();
const { User, Bio, Party, Post, Comment, Interest} = require('../models');
const isAuth = require('../utils/authenticate');

// Gets single users data
router.get('/', (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
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
                                    attributes: ['id', 'username']
                                }
                            },
                            {
                                model: User,
                                attributes: ['id','username']
                            } 
                        ]
                    },
                    {
                        model: Interest,
                        attributes: ['id', 'interest_name']
                    },
                    {
                        model: User,
                        attributes: ['id','username']
                    },
                    
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

// Get a single party
router.get('/party/:id', (req, res) => {
    Party.findOne({
        where: {
            id: req.params.id
        },
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

// Go to create a bio
router.get('/bio', (req, res) => {
    res.render('add-bio', {
        loggedIn: true
    })
});

// Go to edit a bio
router.get('/bio/edit/:id', (req, res) => {
    res.render('edit-bio', {
        loggedIn: true
    })
});

// Go to create party
router.get('/party', (req, res) => {
    Interest.findAll({
        attributes: ['id', 'interest_name']
    })
    .then(dbInterestData => {
        const interests = dbInterestData.map(interest => interest.get({ plain: true }));

        res.render('new-party', {
            interests,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Go to add a post
router.get('/party/post/:party_id', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
});


// Get a single post 
router.get('/party/post/see-post/:post_id',  (req, res) => {
    Post.findOne({
        where: {
            id: req.params.post_id
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