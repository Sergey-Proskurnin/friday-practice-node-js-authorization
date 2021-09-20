const Products = require("../models/products.model");
const { OK, CREATED, BAD_REQUEST } = require("../utils/httpCodes");

const creatOne = async (req, res, _next) => {
  try {
    const body = req.body;
    const result = await Products.create(body);

    res.status(CREATED).json(result);
  } catch (error) {
    res.status(BAD_REQUEST).json(error.message);
  }
};

const getAll = async (_req, res, _next) => {
  try {
    const result = await Products.find();
    res.status(OK).json(result);
  } catch (error) {
    res.status(BAD_REQUEST).json(error.message);
  }
};

module.exports = { creatOne, getAll };
