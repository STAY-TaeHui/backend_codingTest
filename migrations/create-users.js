'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id:{ 
        type : Sequelize.INTEGER,
        unique:true,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      user_id:{
        type:Sequelize.STRING,
        allowNull:false
      },
      password:{
        type : Sequelize.STRING,
        allowNull:false
      },
      signout_time:{
        type:Sequelize.DATE
      },
      exit_time:{
        type:Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      salt:{
        type:Sequelize.STRING
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
