const express = require("express");
const router = express.Router();
const { validateId, itemRequestUpdate, itemRequestCreate } = require("../models/request/itemRequest");
const { validate } = require("../middleware/errorMiddleware");
const Item = require("../models/entity/item");

router.get("/", async (req, res) => {
	const items = await Item.find();

	if (items.length === 0) {
		return res.status(200).json({ message: "No items found" });
	}

	try {
		let { page, limit } = req.query;

		page = parseInt(page) || 1;
		limit = parseInt(limit) || 10;

		const totalItems = await Item.countDocuments();

		const items = await Item.find()
			.skip((page - 1) * limit)
			.limit(limit);

		res.json({
			page,
			limit,
			totalPages: Math.ceil(totalItems / limit),
			totalItems,
			data: items,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", itemRequestCreate, validate, async (req, res) => {
	try {
		const { title, description, price } = req.body;

		let item = await Item.findOne({ title });
		if (item) return res.status(400).json({ error: "Title already registered" });

		item = new Item({ title, description, price });

		await item.save();

		res.status(201).json({ message: "Item Created" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.get("/:id", validateId, validate, async (req, res) => {
	try {
		const item = await Item.findById(req.params.id);
		res.json({ data: item });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:id", itemRequestUpdate, validate, async (req, res) => {
	try {
		const { title, description, price } = req.body;
		const item = await Item.findById(req.params.id);

		item.title = title || item.title;
		item.description = description || item.description;
		item.price = price || item.price;

		await item.save();

		res.status(200).json({ message: "Item Updated" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", validateId, validate, async (req, res) => {
	try {
		await Item.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Item deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
