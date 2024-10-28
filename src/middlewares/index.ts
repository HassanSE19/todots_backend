import express, {Express} from "express";
import cors from 'cors';

const applyMiddlewares = (app: Express) => {
  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json())
};

export default applyMiddlewares;