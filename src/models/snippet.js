
module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define('Snippet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    snippets: DataTypes.JSON,
    language: DataTypes.ENUM('javascript', 'ruby', 'go', 'python'),
  }, {});
  return Snippet;
};
