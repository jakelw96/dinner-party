const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interest extends Model{}

Interest.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        interest_name: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'interest',
      }
);

<<<<<<< HEAD
<<<<<<< HEAD




=======
>>>>>>> interests-model-edit
=======
>>>>>>> 7d7fa0f489afb9fd734c4a3c60bd5b572b2828a0
module.exports = Interest; 