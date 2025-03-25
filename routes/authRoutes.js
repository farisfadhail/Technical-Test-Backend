const express = require("express");
const router = express.Router();
const User = require("../models/entity/user");
const { validate } = require("../middleware/errorMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerRequest, loginRequest } = require("../models/request/authRequest");
const { authMiddleware } = require("../middleware/authMiddleware");

const secretKey = process.env.JWT_SECRET;

router.post("/auth/register", registerRequest, validate, async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ error: "Email already registered" });

		const hashedPassword = await bcrypt.hash(password, 10);
		user = new User({ email, password: hashedPassword });

		await user.save();

		const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });

		res.status(201).json({ message: "User registered successfully", token: token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/auth/login", loginRequest, validate, async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) return res.status(400).json({ error: "Invalid email or password" });

		const isMatch = bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

		const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "1h" });

		res.json({ token: token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/profile", authMiddleware, async (req, res) => {
	try {
		const email = req.user.email;
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "User Profile", data: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
