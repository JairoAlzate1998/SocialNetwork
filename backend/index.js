const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const User = require("./routers/user");
const Post = require("./routers/post");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/user", User);
app.use("/api/post", Post);

app.listen(process.env.PORT, () =>
  console.log("Backend server running in port: ", process.env.PORT)
);

dbConnection();