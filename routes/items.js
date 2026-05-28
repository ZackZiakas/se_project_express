const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");

router.post("/", validateCreateItem, createItem);
router.delete("/:id", validateItemId, deleteItem);
router.put("/:id/likes", validateItemId, likeItem);
router.delete("/:id/likes", validateItemId, unlikeItem);

module.exports = router;
