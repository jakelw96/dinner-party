const express = require('express');
const serverRoutes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turns on routes
app.use(serverRoutes);

// connection to db and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Server is active'));
});