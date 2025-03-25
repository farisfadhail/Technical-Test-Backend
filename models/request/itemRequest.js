const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const itemRequestCreate = [body("title").notEmpty().withMessage("Title is required"), body("description").notEmpty().withMessage("Description is required"), body("price").notEmpty().isNumeric().withMessage("Price must be a number")];

const itemRequestUpdate = [
	param("id")
		.custom((value) => mongoose.Types.ObjectId.isValid(value))
		.withMessage("Invalid Item ID"),

	body("title").optional().notEmpty().withMessage("Title cannot be empty"),
	body("description").optional().notEmpty().withMessage("Description cannot be empty"),
	body("price").optional().isNumeric().withMessage("Price must be a number"),
];

const validateId = [
	param("id")
		.custom((value) => mongoose.Types.ObjectId.isValid(value))
		.withMessage("Invalid Item ID"),
];

module.exports = { itemRequestCreate, itemRequestUpdate, validateId };
