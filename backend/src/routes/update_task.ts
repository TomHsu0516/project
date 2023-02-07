import express from "express";
import { Task } from "../entities/task";
import { authenticate } from "../helper/authenticate";

const router = express.Router();

router.post("/task/:taskId", authenticate, async (req, res) => {
  const { taskId } = req.params;
  const { name, description } = req.body;

  // console.log(userId);
  const task = await Task.findOneBy({ id: parseInt(taskId) });

  const response = await Task.save({ ...task, name, description });

  return res.json(response);
});

export { router as updateTaskRouter };
