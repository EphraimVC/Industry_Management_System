import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "../GQL/schema/typeDefs.js";
dotenv.config();

import productsRouter from "./routes/products.js";
const apollo = new ApolloServer({ typeDefs });
const app = express();
app.use(express.json());

// GQL endpoint
app.use("/gql", expressMiddleware(apollo));

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
