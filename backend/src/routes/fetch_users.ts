import express from "express";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get("/user", async (req, res) => {
  const users = await User.find();

  return res.json(users);
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOneBy({ id: parseInt(userId) });

  return res.json(user);
});

export { router as fetchUserRouter };
