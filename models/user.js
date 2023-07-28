const { DataTypes } = require("sequelize");
const db = require("./../config/database");

const Book = require("./book");
const Address = require("./address");

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
    x: DataTypes.STRING,
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    photo: {
      type: DataTypes.STRING,
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

// User.hasOne(Address, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
// Address.belongsTo(User);

module.exports = User;

// (async () => {
//   try {
//     await db.sync({alter : true});
//     console.log(`DataBase Synced Sucessfully`);
//   } catch (err) {
//     console.log(`Error In DB ${err}`);
//   }
// })();
