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
import { authRouter } from "./routes/auth";
import { deleteTaskRouter } from "./routes/delete_task";

const app = express();

app.use(express.json());
app.use(cors());
app.use(createUserRouter);
app.use(createTaskRouter);
app.use(fetchTaskRouter);
app.use(fetchUserRouter);
app.use(deleteTaskRouter);
app.use(authRouter);

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "host.docker.internal", // host.docker.internal, localhost
      port: 5432,
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
    // console.log(e);
    console.error("something went wrong");
    // retries--;
    // await new Promise((res) => setTimeout(res, 5000));
  }
};

main();
