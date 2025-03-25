const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			auto: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: BigInt,
			required: true,
		},
	},
	{ timestamps: true }
);

itemSchema.set("toJSON", {
	transform: (doc, ret) => {
		ret.price = ret.price.toString();
		return ret;
	},
});

module.exports = mongoose.model("Item", itemSchema);
