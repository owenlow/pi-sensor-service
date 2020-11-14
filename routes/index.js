const landingRoute = require('./landing');
const cameraRoute = require('./camera');
const pixels = require('./pixels');

module.exports = {
    getRoutes: {
        landing: landingRoute,
        camera: cameraRoute,
        pixels: pixels.get
    },
    putRoutes: {
        pixels: pixels.put
    }
};
