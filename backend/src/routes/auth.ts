import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import { User } from "../entities/user";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const user = await User.findOneBy({ email: email });
  console.log("backend user searching result", user);

  if (!user) {
    return res.status(404).send({
      message: "Email not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    { email: user.email, password: user.password },
    "sss",
    { expiresIn: "24h" }
  );

  return res.status(200).send({
    message: "Login Successful",
    id: user.id,
    email: user.email,
    token,
  });
});

export { router as authRouter };
