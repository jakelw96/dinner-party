const { Interest } = require('../models');

const interestData = [
    {
        id: 1,
        interest_name: 'Astrology'
    },
    {
        id: 2,
        interest_name: 'Football'
    },
    {
        id: 3,
        interest_name: 'Video Games'
    }
];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
