const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

// ✅ parse JSON bodies
app.use(express.json());
// ✅ parse application/x-www-form-urlencoded bodies (Postman suite uses this sometimes)
app.use(express.urlencoded({ extended: true }));

// ✅ temporary authorization (PASTE a REAL user _id here)
app.use((req, res, next) => {
  req.user = {
    _id: "699e8d8e28afc0d512c9ecd8",
  };
  next();
});

app.use("/", routes);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
