const router = require("express").Router();

const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");

const usersRouter = require("./users");
const itemsRouter = require("./items");

const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");

const { validateSignin, validateSignup } = require("../middlewares/validation");

router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
