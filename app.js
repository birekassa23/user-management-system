// app.js
import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import { create_to_mongo_DB } from "./config/database-conn.js"; 
import authenticationRoutes from "./routes/authentication.route.js"; 
import authorizationRoutes from "./routes/authorization.routes.js"; 

const app = express(); 
const port = process.env.PORT || 3000; 


create_to_mongo_DB();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("WELCOME TO HOME PAGE!");
});

// Authentication routes
app.use("/api/users", authenticationRoutes);

// Authorization routes
app.use("/api/users", authorizationRoutes);

// 404 handler if route not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found !"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`SERVER IS RUNNING on http://localhost:${port}`);
});
