import { Response } from "express";

const catchResponse = (res: Response, err: any) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Server Error";

  console.log({ statusCode, errorMessage });

  return res.status(statusCode).send({ success: false, error: errorMessage });
};

export default catchResponse;
