// app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { create_to_mongo_DB } from "./config/database-conn.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
create_to_mongo_DB();

// Middleware setup
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("WELCOME TO HOME PAGE!");
});

// User routes
app.use("/api/users", userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`SERVER IS RUNNING on http://localhost:${port}`);
});
