import express from "express";
import IndexRoute from "./src/routes/index.route.js";
const app = express();

// size limit to prevent DoS attacks. 
app.use(express.json({ limit: "10mb" }));

app.use("/gallery", IndexRoute);

// ! TO DO: ADD GLOBAL ERROR HANDLER MIDDLEWARE

app.listen(3000, () => {
    console.log("running on port 3000");
})