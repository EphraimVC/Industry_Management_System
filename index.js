import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { expressMiddleware } from "@as-integrations/express5";
import productsRouter from "./REST_API/routes/products.js";
import { createApolloServer } from "./GQL/apolloServer.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/products", productsRouter);
// Apollo middleware is registered after server creation (post-DB connect)
async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        // Initialize Apollo only after successful DB connection
        const apollo = await createApolloServer();
        app.use("/gql", expressMiddleware(apollo));
        app.listen(port, () => {
            console.log(
                `REST Server running on http://localhost:${port}/api/products`
            );
            console.log(`GQL Server running on http://localhost:${port}/gql`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
}
start();
