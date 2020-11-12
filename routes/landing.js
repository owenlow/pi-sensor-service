const pug = require('pug');

const device = require('../device');


const title = 'Weather station';
const subtitle = 'Always good weather, guaranteed.';
const navTabText = 'Home';
const url = '/';
const handler = function(request, response) {
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
};

module.exports = {
    url,
    handler
};
