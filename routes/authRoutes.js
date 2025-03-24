const express = require("express");
const router = express.Router();
const User = require("../models/entity/user");
const { userRequestCreate } = require("../models/request/userRequest");
const { validate } = require("../middleware/errorMiddleware");

router.post("/", userRequestCreate, validate, async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// const user = new User({ name, email, password });
		// await user.save();

		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
