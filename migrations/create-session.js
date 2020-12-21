'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sessions', {
      id:{
        type : Sequelize.INTEGER,
        unique:true,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      session_value:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      logout_time:{
        type: Sequelize.DATE,
      },
      ip_addr:{
        type:Sequelize.STRING
      },
      createdAt:{
        type:Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sessions');
  }
};