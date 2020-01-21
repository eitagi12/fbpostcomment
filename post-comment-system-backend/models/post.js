module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    author: {
      type: DataTypes.STRING(100)
    },
    text: {
      type: DataTypes.STRING(500)
    },
    picture: {
      type: DataTypes.STRING(300)
    }
  })

  post.associate = function (models) {
    // associations can be defined here
    post.hasMany(models.comment, { foreignKey: 'post_id' })
  };

  return post
}