'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  session.init({
    id:{
      type : DataTypes.INTEGER,
      unique:true,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true
    },
    session_value:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    logout_time:{
      type: DataTypes.DATE,
    },
    ip_addr:{
      type:DataTypes.STRING
    },
    createdAt:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'session',
  });
  return session;
};