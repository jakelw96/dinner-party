const User = require('./User');
const Bio = require('./Bio');
const Party = require('./Party');
// Other models will require here

// This is where we will associate the different models
User.hasOne(Bio, {
   foreignKey: 'user_id' 
});

Bio.belongsTo(User, {
    foreignKey: 'user_id'
});

Party.

module.exports = { User, Bio };