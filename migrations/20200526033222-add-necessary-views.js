'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Chapters', 'necessary_views', {
      type: Sequelize.DataTypes.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('Chapters', 'necessary_views')
  }
};
