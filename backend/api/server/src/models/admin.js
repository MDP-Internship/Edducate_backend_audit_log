module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING(255),
      surname: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      roleId: DataTypes.INTEGER(),
      isRemoved: DataTypes.INTEGER(),
    },
    {
      classMethods: {
        associate: function (models) {
          User.hasOne(models.Config)
        },
      },
      hooks: {
        afterCreate: function (user, options) {
          models.Config.create({
            name: user.name,
          })
        },
      },
    }
  )
  return User
}

// CONFIG MODEL
module.exports = function (sequelize, DataTypes) {
  var Config = sequelize.define(
    "Config",
    {
      notifications: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function (models) {
          Config.belongsTo(models.User)
        },
      },
    }
  )
  return Config
}
