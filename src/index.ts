import * as express from 'express';

import {routes} from './routes';

const app = express();

routes.forEach((route) => {
   app[route.method](route.url, route.handler);
});

app.listen(3000);
