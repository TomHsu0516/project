import express from "express";
import cors from "cors";
import { config } from "../ormconfig";
import { createConnection } from "typeorm";
import { Task } from "./entities/task";
import { User } from "./entities/user";
import { createUserRouter } from "./routes/create_user";
import { createTaskRouter } from "./routes/create_task";
import { fetchTaskRouter } from "./routes/fetch_tasks";
import { fetchUserRouter } from "./routes/fetch_users";

const app = express();

app.use(express.json());
app.use(cors());
app.use(createUserRouter);
app.use(createTaskRouter);
app.use(fetchTaskRouter);
app.use(fetchUserRouter);

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "895623741",
      database: "typeorm",
      entities: [Task, User],
      synchronize: true,
    });
    console.log("connect to postgres");

    app.listen(8000, () => {
      console.log("app is running");
    });

    await connection.synchronize();
  } catch (e) {
    console.error("something went wrong");
  }
};

main();
