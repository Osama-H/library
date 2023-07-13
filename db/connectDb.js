require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "postgres",
  pool: {
    max: 3000,
    min: 0,
    acquire: 1000000,
    idle: 20000,
    evict: 10000,
  },
});

/* 
  {
    logging: false,
    freezeTableName: true,
    paranoid: true,
  }
*/

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log(`Unable To Connect, The Error : ${err}`);
  }
})();

module.exports = sequelize;
