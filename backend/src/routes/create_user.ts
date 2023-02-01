import express from "express";
import { User } from "../entities/user";

const router = express.Router();

router.get("/user", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  const user = User.create({
    email: email,
    password: password, // needs to be encrypted by jwt
  });

  await user.save();

  return res.json(user);
});

export { router as createUserRouter };
