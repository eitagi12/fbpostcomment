module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    author: {
      type: DataTypes.STRING(100)
    },
    text: {
      type: DataTypes.STRING(500)
    },
  })

  return comment
}