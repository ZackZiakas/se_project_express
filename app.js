const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const routes = require("./routes");
const { getItems } = require("./controllers/clothingItems");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const { validateSignin, validateSignup } = require("./middlewares/validation");

const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);
app.get("/items", getItems);

app.use(auth);
app.use("/", routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
