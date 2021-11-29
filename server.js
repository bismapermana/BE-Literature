require("dotenv").config();
const express = require("express");

const cors = require("cors");

const router = require("./src/routes/index");
const app = express();

const port = 5000;

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});