import express, {Express} from "express";
import {routes} from './routes';

const app: Express = express();

routes.forEach((route) => {
   app[route.method](route.url, route.handler);
});

app.listen(3000);
