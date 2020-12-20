import {RouteDefinition} from '../types';

import {routes as landingRoutes} from "./sensors";
import {routes as displayRoutes} from "./pixels";

export const routes: RouteDefinition[] = [
        ...landingRoutes,
        ...displayRoutes
];
