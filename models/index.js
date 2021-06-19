
const User = require('./User');
const Bio = require('./Bio');
const Interest = require('./Interest');
// Other models will require here

// This is where we will associate the different models
User.hasOne(Bio, {
   foreignKey: 'user_id' 
});

Bio.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Bio, Interest }