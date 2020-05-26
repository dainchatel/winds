module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Views', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      chapter_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model:'Chapters',
          key: 'id'
        },
        allowNull: false
      },
      ip_address: {
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
    return queryInterface.dropTable('Views');
  }
};