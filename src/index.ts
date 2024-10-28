import express from "express";
import "dotenv/config";
import "./config/database";
import router from "./routes";
import applyMiddlewares from "./middlewares";

const port = process.env.PORT;

const app = express();
applyMiddlewares(app);
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
