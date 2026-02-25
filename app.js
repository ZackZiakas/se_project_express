const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

// temporary authorization (paste your real test user _id from Compass)
app.use((req, res, next) => {
  req.user = {
    _id: "PASTE_TEST_USER_ID_HERE",
  };
  next();
});

app.use("/", routes);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
