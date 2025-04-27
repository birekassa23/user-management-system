// app.js
import express from "express";

const app = express();
const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT :${port}`)
})