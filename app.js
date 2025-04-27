// app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { create_to_mongo_DB } from "./config/database-conn.js";

const app = express();
const port = process.env.PORT || 3001

create_to_mongo_DB();


app.listen(port, () => {
    console.log(`SERVER IS RUNNING on http://localhost:${port}`)
})