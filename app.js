// const app = require('express')()
const express = require("express");
const router = require("./router");
require("./config/database");

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);

app.use("/api/v1", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is Listening on port ${port}`);
});
