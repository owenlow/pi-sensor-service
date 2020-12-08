import {renderFile} from "pug";
import {getAllReadings} from "../device";
import {RouteDefinition} from "../types";

const title = 'Weather station';
const subtitle = 'Always good weather, guaranteed.';

const handler = function(request, response) {
    getAllReadings().then(allReadings => {
        response.send(renderFile('./src/templates/landing.pug', {
            pageTitle: title,
            pageSubtitle: subtitle,
            allReadings: Object.entries(allReadings),
            currentPage: 'landing'
        }));
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    });
};

export const routes: RouteDefinition[] = [{
    url: '/',
    method: 'get',
    handler
}];
