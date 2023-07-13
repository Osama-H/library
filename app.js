// const app = require('express')()
const express = require("express");
const router = require("./router");
const app = express();
require("./db/connectDb");

app.use(express.json());
app.use("/api/v1", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is Listening on port ${port}`);
});
