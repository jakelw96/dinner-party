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
    },
    {
        id: 4,
        interest_name: 'Running'
    },
    {
        id: 5,
        interest_name: 'Skydiving'
    },
    {
        id: 6,
        interest_name: 'Movies'
    },
    {
        id: 7,
        interest_name: 'Comic Books'
    },
    {
        id: 8,
        interest_name: 'Technology'
    },
    {
        id: 9,
        interest_name: 'Board Games'
    },    
    {
        id: 10,
        interest_name: 'Botany'
    },
    {
        id: 11,
        interest_name: 'Pets'
    },
    {
        id: 12,
        interest_name: 'Dancing'
    },
    {
        id: 13,
        interest_name: 'Music'
    },
    {
        id: 14,
        interest_name: 'Bodybuilding'
    },
    {
        id: 15,
        interest_name: 'Improv Comedy'
    },
    {
        id: 16,
        interest_name: 'Politics'
    },
    {
        id: 17,
        interest_name: 'Fishing'
    },
    {
        id: 18,
        interest_name: 'MMA'
    },
    {
        id: 19,
        interest_name: 'Anime'
    },
    {
        id: 20,
        interest_name: 'Sailing'
    }

];

const seedInterests = () => Interest.bulkCreate(interestData);

module.exports = seedInterests;
