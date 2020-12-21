'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    id:{ 
      type : DataTypes.INTEGER,
      unique:true,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true
    },
    user_id:{
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type : DataTypes.STRING,
      allowNull:false
    },
    signout_time:{
      type:DataTypes.DATE
    },
    exit_time:{
      type:DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    salt:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'users',
    timestamps:false
  });
  return users;
};
