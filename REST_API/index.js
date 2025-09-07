import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


import productsRouter from "./routes/products.js";

const app = express();
app.use(express.json());


app.use("/api/products", productsRouter);

const port = process.env.PORT || 3000;

async function start() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	}
}

start();