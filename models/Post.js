const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        post_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_text: {
            type: DataTypes.TEXT,
             allowNull: false
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
        modelName: 'post'
    }    
);

module.exports = Post;