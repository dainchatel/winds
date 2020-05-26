'use strict';
module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    ip_address: DataTypes.TEXT,
    chapter_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Chapter',
        key: 'id',
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: DataTypes.DATE,
  }, {})
  View.associate = function (models) {
    View.belongsTo(models.Chapter);
  }
  return View
}