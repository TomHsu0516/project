import express from "express";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { createQueryBuilder } from "typeorm";
import { authenticate } from "../helper/authenticate";

const router = express.Router();

router.get("/user/:userId/task", authenticate, async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  const user = await User.findOneBy({ id: parseInt(userId) });

  if (!user) {
    return res.json({
      msg: "user not found",
    });
  }

  const tasks = await createQueryBuilder("task")
    .where({ user: user })
    .getMany();

  return res.json(tasks);
});

export { router as fetchTaskRouter };
