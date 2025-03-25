const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			auto: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
