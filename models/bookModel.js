const { DataTypes } = require("sequelize");
const db = require("./../db/connectDb");
const User = require("./userModel");

const Book = db.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numOfPages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: "Number Of Pages Must be a Number",
      },
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [["Sport", "Programming", "Health", "Fantasy"]],
        msg: "Category Must be Sport, or Progamming, or Health, or Fantasy",
      },
    },
  },
  review: {
    type: DataTypes.FLOAT,
    defaultValue: 4.5,
  },
});

(async () => {
  try {
    await db.sync({ alter: true });
    console.log(`DataBase Synced Sucessfully`);
  } catch (err) {
    console.log(`Error In DB ${err}`);
  }
})();

module.exports = Book;
