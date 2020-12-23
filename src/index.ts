import express, { Express } from "express";
import cors from "cors";
import { initCronTasks } from "./tasks";
import { routes } from "./routes";

initCronTasks();

const app: Express = express();

app.use(
    cors({
        origin: "*"
    })
);

routes.forEach((route) => {
    app[route.method](route.url, route.handler);
});

app.listen(3000);
