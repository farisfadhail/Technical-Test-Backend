const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ error: "Access denied, no token provided" });
	}

	try {
		const secretKey = process.env.JWT_SECRET;
		const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ error: "Invalid token" });
	}
};

module.exports = { authMiddleware };
