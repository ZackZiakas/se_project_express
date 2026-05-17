const router = require("express").Router();

const usersRouter = require("./users");
const itemsRouter = require("./items");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", usersRouter);
router.use("/items", itemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
