const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Party extends Model{}

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
        },
        party_bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
   
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'party'
    }    
);

module.exports = Party;