import express from "express";
import bcrypt from "bcrypt";
import { User } from "../entities/user";

const router = express.Router();

router.get("/user", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/user", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  let user = await User.findOneBy({ email });

  if (user) {
    return res.status(409).send({
      message: "User already exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    user = User.create({
      email: email,
      password: hashedPassword,
    });

    await user.save();
  }

  return res.json(user);
});

export { router as createUserRouter };
