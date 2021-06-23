const User = require('./User');
const Bio = require('./Bio');
const Party = require('./Party');
const Post = require('./Post');
const Comment = require('./Comment')
const Interest = require('./Interest');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const UserInterests = require('./UserInterests');
const PartyInterests = require('./PartyInterests');
>>>>>>> interests-model-edit
=======
const UserInterests = require('./UserInterests');
const PartyInterests = require('./PartyInterests');

>>>>>>> 7d7fa0f489afb9fd734c4a3c60bd5b572b2828a0

// Other models will require here

// This is where we will associate the different models
User.hasOne(Bio, {
   foreignKey: 'user_id' 
});

Bio.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Party, {
    foreignKey: 'user_id'
});

Party.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Party.hasMany(Post, {
    foreignKey: 'party_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.belongsTo(Party, {
    foreignKey: 'party_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
module.exports = { User, Bio, Party, Post, Comment };
=======
module.exports = { User, Bio, Party, Post, Comment };

>>>>>>> aa0bb27eabd5c76c7ef40fac7d896a2be6b64382
=======
=======
>>>>>>> 7d7fa0f489afb9fd734c4a3c60bd5b572b2828a0
User.belongsToMany(Interest, {
    through: UserInterests,
    foreignKey: 'user_id'
});

Interest.belongsToMany(User, {
    through: UserInterests,
    foreignKey: 'interest_id'
});

Party.belongsToMany(Interest, {
    through: PartyInterests,
    foreignKey: 'party_id'
});

Interest.belongsToMany(Party, {
    through: PartyInterests,
    foreignKey: 'interest_id'
});

module.exports = { 
    User, 
    Bio, 
    Party, 
    Post, 
    Comment, 
    Interest, 
    UserInterests, 
    PartyInterests 
<<<<<<< HEAD
};
>>>>>>> interests-model-edit
=======
};
>>>>>>> 7d7fa0f489afb9fd734c4a3c60bd5b572b2828a0
