const { DataTypes } = require("sequelize");
const db = require("./../db/connectDb");

const Book = require("./../models/bookModel");

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      email: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "please provide a valid Email",
        },
      },
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    paranoid: true,
  }
);

User.hasMany(Book, {
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Book.belongsTo(User, { onDelete: "SET NULL", onUpdate: "CASCADE" });

module.exports = User;

(async () => {
  try {
    await db.sync();
    console.log(`DataBase Synced Sucessfully`);
  } catch (err) {
    console.log(`Error In DB ${err}`);
  }
})();
