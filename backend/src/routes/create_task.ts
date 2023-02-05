import express from "express";
import { Task } from "../entities/task";
import { User } from "../entities/user";

const router = express.Router();

router.post("/user/:userId/task", async (req, res) => {
  const { userId } = req.params;

  const { id, name, description } = req.body;

  const user = await User.findOneBy({ id: parseInt(userId) });

  if (!user) {
    return res.json({
      msg: "user not found",
    });
  }

  const task = Task.create({
    id: id,
    name: name,
    description: description,
    user: user,
  });

  await task.save();

  return res.json(task);
});

export { router as createTaskRouter };
