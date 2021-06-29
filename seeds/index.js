const seedInterests = require('./interests');

const sequelize = require('../config/connection');


const seeded = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced');
    await seedInterests();
    console.log('Interests seeded!');
};

seeded();