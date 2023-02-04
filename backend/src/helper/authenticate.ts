import jwt from "jsonwebtoken";
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    //   get the token from the authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).send({
        message: "401 Unauthorized",
      });

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "sss");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.body.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.status(401).send({
      message: "401 Unauthorized",
    });
  }
};
