module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    chapter_name: DataTypes.STRING,
    chapter_number: DataTypes.TEXT,
    chapter_text: DataTypes.TEXT,
    necessary_views: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt:  DataTypes.DATE,
  }, {})
  Chapter.associate = function(models) {
    Chapter.hasMany(models.View, {
      foreignKey: 'chapter_id'
    });  }
  return Chapter
}