const { DataTypes, Model } = require("sequelize");
const db = require("./../config/database");

class Book extends Model {}
Book.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    numOfPages: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    review: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: db,
    modelName: "Book",
  }
);

module.exports = Book;
