import {renderFile} from "pug";
import {RouteDefinition} from "../types";
import {getImage} from "../device";

const title = 'Live Cam';
const subtitle = 'Check out whats happening!';

const handler = function (request, response) {
    getImage().then(imageSrc => {
        response.send(renderFile('./src/templates/camera.pug', {
            pageTitle: title,
            pageSubtitle: subtitle,
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