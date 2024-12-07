require("dotenv").config();
const express = require("express");
const { connectDB } = require("./App/database/db");
const app = express();
const cors = require("cors");
const router = require("./App/routes/route");
const { errorHandler } = require("./App/middleware/ErrorMiddleware");
connectDB();


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("TMBC BACKEND SERVER");
});
app.use("/api/v1", router);
app.use(errorHandler);

app.listen("3300", () => {
  console.log("server running on port 3300");
});
