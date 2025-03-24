const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const userRequestCreate = [body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("Invalid email format"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")];

const userRequestUpdate = [
	param("id")
		.custom((value) => mongoose.Types.ObjectId.isValid(value))
		.withMessage("Invalid User ID"),

	body("name").optional().notEmpty().withMessage("Name cannot be empty"),
	body("email").optional().isEmail().withMessage("Invalid email format"),
	body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const validateUserId = [
	param("id")
		.custom((value) => mongoose.Types.ObjectId.isValid(value))
		.withMessage("Invalid User ID"),
];

module.exports = { userRequestCreate, userRequestUpdate, validateUserId };
