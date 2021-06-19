const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bio extends Model{}

Party.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        party_name: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'party'
    }    


);
