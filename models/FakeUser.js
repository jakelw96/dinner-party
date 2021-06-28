const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FakeUser extends Model {}

FakeUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8] // Amount of characters the password must be
            }
        }
    },
    }
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'fake_user'
    }
);

module.exports = FakeUser;