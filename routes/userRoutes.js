const express = require("express");
const router = express.Router();
const User = require("../models/entity/user");
const { validateUserId, userRequestUpdate } = require("../models/request/userRequest");
const { validate } = require("../middleware/errorMiddleware");

router.get("/", async (req, res) => {
	const users = await User.find();

	if (users.length === 0) {
		return res.status(200).json({ message: "No users found" });
	}

	res.json(users);
});

router.get("/:id", validateUserId, validate, async (req, res) => {
	const user = await User.findById(req.params.id);
	res.json(user);
});

router.put("/:id", userRequestUpdate, validate, async (req, res) => {
	try {
		const { name, email } = req.body;
		const user = await User.findById(req.params.id);
		user.name = name || user.name;
		user.email = email || user.email;
		await user.save();

		res.json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", validateUserId, validate, async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.json({ message: "User deleted" });
});

module.exports = router;
