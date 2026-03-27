const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const routes = require("./routes");
const { getItems } = require("./controllers/clothingItems");

const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use(auth);
app.use("/", routes);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
