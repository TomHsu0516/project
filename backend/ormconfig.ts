export const config = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "895623741",
  database: "typeorm",
  entities: ["src/entity/**/*.ts"],
  synchronize: true,
};
