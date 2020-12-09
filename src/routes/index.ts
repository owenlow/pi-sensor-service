import {RouteDefinition} from '../types';

import {routes as landingRoutes} from "./landing";
import {routes as cameraRoutes} from "./camera";
import {routes as displayRoutes} from "./pixels";

export const routes: RouteDefinition[] = [
        ...landingRoutes,
        ...cameraRoutes,
        ...displayRoutes
];
