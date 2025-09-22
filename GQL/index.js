import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
dotenv.config();

const app = express();
app.use(express.json());

const apollo = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        await apollo.start();
        app.use("/gql", expressMiddleware(apollo));

        app.listen(port, () => {
            // console.log(`Server running on http://localhost:${port}`);
            console.log(`GraphQL endpoint: http://localhost:${port}/gql`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
}

start();