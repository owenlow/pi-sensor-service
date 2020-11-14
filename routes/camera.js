const pug = require('pug');

const device = require('../device');

const title = 'Live Cam';
const subtitle = 'Check out whats happening!';
const navTabText = 'Camera';
const url = '/camera';

const handler = function (request, response) {
    device.getImage().then(imageSrc => {
        response.send(pug.renderFile('./templates/camera.pug', {
            pageTitle: title,
            previewImageSrc: imageSrc,
            currentPage: 'camera'
        }));
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    })
};

module.exports = {
    url,
    handler
};
