'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      User.hasMany(models.Post,{
        onDelete:'CASCADE'})
     
      

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING, unique: true
    },
    firstName: {
      type: DataTypes.STRING
    },

    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,  validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};