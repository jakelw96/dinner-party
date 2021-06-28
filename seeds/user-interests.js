const { UserInterests } = require('../models');

const userInterestsData = [
    {
        user_id: 1,
        interest_id: 2
    },
    {
        user_id: 1,
        interest_id: 2
    }
];

const seedUserInterests = () => UserInterests.bulkCreate(userInterestsData);

module.exports = seedUserInterests;