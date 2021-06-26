const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserParties extends Model{}

UserParties.init({
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
        party_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'party',
                key: 'id'
            }
        }
    },
    {   
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_parties'  
    }      
);

module.expors = UserParties;