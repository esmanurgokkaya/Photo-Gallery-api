import express from "express";
import IndexRoute from "./src/routes/index.route.js";
const app = express();

app.use(express.json());
app.use("/gallery", IndexRoute);

app.listen(3000, () => {
    console.log("running on port 3000");
})