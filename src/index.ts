import cors from "cors";
import express, { Express } from "express";
import { connection, connect, set } from "mongoose";
import "dotenv/config";

import router from "./routes";

const { PORT, MONGO_URL } = process.env;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  const { readyState } = connection;

  if (readyState !== 1 && readyState !== 2) {
    set("strictQuery", false);
    connect(MONGO_URL as string)
      .then(() => {
        console.log("INFO - MongoDB Database connected.");
      })
      .catch((err: Error) =>
        console.log("ERROR - Unable to connect to the database:", err)
      );
  }

  console.log(`Server is listening on port ${PORT}`);
});
