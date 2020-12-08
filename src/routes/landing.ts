import {renderFile} from "pug";
import {RouteDefinition} from "../types";

const device = require('../device');

const title = 'Weather station';
const subtitle = 'Always good weather, guaranteed.';
const navTabText = 'Home';

const handler = function(request, response) {
    device.getAllReadings().then(allReadings => {
        response.send(renderFile('./src/templates/landing.pug', {
            pageTitle: title,
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
