'use strict';
const {
  Model
} = require('sequelize');
const { post } = require('../../routes/user');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
   
      Post.belongsTo(models.User,{
        foreignKey: 'UserId'
      })
      
    }
  }
  Post.init({
    comment: {
      type: DataTypes.STRING
    },
    photo: {
      type: DataTypes.STRING, unique:true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};