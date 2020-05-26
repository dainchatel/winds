module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      chapter_name: {
        type: Sequelize.STRING
      },
      chapter_number: {
        type: Sequelize.STRING
      },
      chapter_text: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chapters');
  }
};