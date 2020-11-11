const express = require('express');
const pug = require('pug');

const device = require('./device.js');

const app = express();

// const compiledLandingFunction = pug.compileFile('landing.pug');

app.get('/', function(request, response) {
    console.log('landing requested');
    device.getAllReadings().then(allReadings => {
        response.send(pug.renderFile('./templates/landing.pug', {
            pageTitle: 'Weather Station',
            allReadings: Object.entries(allReadings),
            currentPage: 'landing'
        }));
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    })
});

app.get('/camera', (request, response) => {
    console.log('/camera requested');
    device.getImage().then(imageSrc => {
        response.send(pug.renderFile('./templates/camera.pug', {
            pageTitle: 'Live Cam',
            previewImageSrc: imageSrc,
            currentPage: 'camera'
        }));
    }).catch(reason => {
        console.error('Error getting landing page', reason)
        response.send('problem was had');
    })
});

app.listen(3000);
