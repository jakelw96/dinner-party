const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PartyInterests extends Model {}

PartyInterests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        interest_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        party_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        interests_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'interest',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_interests'
    }
);

module.exports = PartyInterests;