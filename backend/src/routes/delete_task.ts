import express from "express";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { createQueryBuilder } from "typeorm";
import { authenticate } from "../helper/authenticate";

const router = express.Router();

router.delete("/task/:taskId", authenticate, async (req, res) => {
  const { taskId } = req.params;

  // console.log(userId);

  const response = await Task.delete(parseInt(taskId));

  return res.json(response);
});

export { router as deleteTaskRouter };
