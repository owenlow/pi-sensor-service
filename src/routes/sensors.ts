import {getAllReadings} from "../device";
import {RouteDefinition} from "../types";

const handleGetSensors = function(request, response) {
    getAllReadings().then(allReadings => {
        response.send(allReadings);
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    });
};

export const routes: RouteDefinition[] = [{
    url: '/',
    method: 'get',
    handler: handleGetSensors
}];
