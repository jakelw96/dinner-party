const { Interest } = require('../models');

const interestData = [
    {
        interest_name: 'Astrology'
    },
    {
        interest_name: 'Football'
    },
    {
        interest_name: 'Video Games'
    }
];

const seedInterests = () => Interest.bulkCreate(interestData);
