const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl, link } = req.body;
  const finalImageUrl = imageUrl || link;

  ClothingItem.create({
    name,
    weather,
    imageUrl: finalImageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed to create item"));
      }

      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Forbidden");
      }

      return ClothingItem.findByIdAndDelete(id);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }

      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }

      return next(err);
    });
};

module.exports.unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item id"));
      }

      return next(err);
    });
};
