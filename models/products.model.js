const { Schema, model } = require("mongoose");
const db = require("../db/connection");

const product = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
const Product = model("product", product);

module.exports = Product;
