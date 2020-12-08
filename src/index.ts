import * as express from 'express';

import {routes} from './routes';
import {Express} from "express";

const app: Express = express();

routes.forEach((route) => {
   app[route.method](route.url, route.handler);
});

app.listen(3000);
