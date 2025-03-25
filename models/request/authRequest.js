const { body } = require("express-validator");

const registerRequest = [body("email").isEmail().withMessage("Invalid email format"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")];

const loginRequest = [body("email").isEmail().withMessage("Invalid email format"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")];

module.exports = { registerRequest, loginRequest };
