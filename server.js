import express from "express";

const app = express();

app.get("/", () => {
})

app.listen(3000, () => {
    console.log("running on port 3000");
})