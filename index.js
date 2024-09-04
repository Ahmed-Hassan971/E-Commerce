import { config } from "dotenv";
config({});
import express from "express";
import AppIndex from "./src/app.routes.js";
const app = express();
const port = 3000;
app.use(express.static("uploads"));
AppIndex(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
