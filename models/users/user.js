const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(64),
        allowNull: true,
        unique: true,
        required: [true, "Email address is required"],
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, "Password is required"],
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        enum: ["user", "admin"],
      },
    },

    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  user.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };
  user.prototype.getHashPass = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  };
  return user;
};
