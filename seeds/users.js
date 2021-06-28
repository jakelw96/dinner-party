const faker = require('faker');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
    console.log('Seeding users...');
    let users = [];

    for (var i = 0; i < 10; i++) {
        let user = {
         username: faker.internet.userName(),
         password: await bcrypt.hash('password', 10),
        };
        users.push(user);
       }
       return users;
}

module.exports = seedUsers; 