const User = require('./User');
const Bio = require('./Bio');
const Party = require('./Party');
const Post = require('./Post');
const Comment = require('./Comment')
const Interest = require('./Interest');
const UserInterests = require('./UserInterests');
const PartyInterests = require('./PartyInterests');
const FakeUser = require('./FakeUser');


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
    PartyInterests,
};



