// const { DataTypes, Model } = require("sequelize");
// const db = require("./../config/database");


// // class Address extends Model {}

// // Address.init(
// //   {
// //     country: {
// //       type: DataTypes.STRING,
// //     },
// //     city: {
// //       type: DataTypes.STRING,
// //     },
// //   },
// //   {
// //     sequelize: db,
// //     modelName: "Address",
// //   }
// // );

// const Address = db.define("Book", {
//   country: {
//     type: DataTypes.STRING,
//   },
//   city: {
//     type: DataTypes.STRING,
//   },
// });

// (async () => {
//   try {
//     await db.sync({force : true});
//     console.log(`DataBase Synced Sucessfully`);
//   } catch (err) {
//     console.log(`Error In DB ${err}`);
//   }
// })();

// module.exports = Address;
