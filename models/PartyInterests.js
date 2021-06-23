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
        party_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'party',
                key: 'id'
            }
        },
        interest_id: {
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
        modelName: 'party_interests'
    }
);

module.exports = PartyInterests;