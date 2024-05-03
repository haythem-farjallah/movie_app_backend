const express = require("express");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const favoriteRouter = require("./routes/favoriteRoute");

const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const dbConnection = require("./database");
dbConnection();
const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/favorite", favoriteRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
