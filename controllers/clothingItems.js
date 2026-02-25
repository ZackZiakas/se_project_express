const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.createItem = (req, res) => {
  // Postman suite may send image as "link" instead of "imageUrl"
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
      console.error(err);

      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data passed to create item" });
      }

      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.id)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item id" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item id" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports.unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item id" });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};
