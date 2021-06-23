const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserInterests extends Model {}

UserInterests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
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
        modelName: 'user_interests'
    }
);

module.exports = UserInterests;