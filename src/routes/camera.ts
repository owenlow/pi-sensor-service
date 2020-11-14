import {renderFile} from "pug";
import {RouteDefinition} from "../types";

const device = require('../device');

const title = 'Live Cam';
const subtitle = 'Check out whats happening!';
const navTabText = 'Camera';

const handler = function (request, response) {
    device.getImage().then(imageSrc => {
        response.send(renderFile('./src/templates/camera.pug', {
            pageTitle: title,
            previewImageSrc: imageSrc,
            currentPage: 'camera'
        }));
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    })
};

const routes: RouteDefinition[] = [{
    url: '/camera',
    method: 'get',
    handler
}];

export {
    routes
};