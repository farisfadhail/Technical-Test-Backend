const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");

const port = process.env.PORT || 3000;

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

app.use(errorHandler);
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/items", itemRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
