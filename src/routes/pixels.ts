const sense = require('sense-hat-led');
import {renderFile} from "pug";
import {RouteDefinition} from "../types";

const GRID_SIZE = 8;

function rgbArrayToHexTripletString(rgbArray) {
    const [r, g, b] = rgbArray;
    const rgbValue = (r << 16) | (g << 8) | b;
    return `#${rgbValue.toString(16).padStart(6, "0")}`;
}

function hexTripletStringToRgbArray(hexString) {
    const hexValue = parseInt(hexString.slice(1), 16); // Assuming the hex string starts with '#'
    const r = (hexValue & 0xff0000) >> 16;
    const g = (hexValue & 0x00ff00) >> 8;
    const b = (hexValue & 0x0000ff);
    return [r, g, b];
}

function indexTo2dCoords(index, gridSize) {
    const x = index % gridSize; // column
    const y = (index - x) / gridSize; // row
    return [x, y];
}

const title = "Display";
const subtitle = "Set the display";

const getPixelEditorPage = (request, response) => {
    sense.getPixels((error, displayData) => {
        const pixelsArray = displayData.map(rgbArrayToHexTripletString);
        response.send(renderFile('./src/templates/pixels.pug', {
            pageTitle: title,
            pageSubtitle: subtitle,
            pixelsArray,
            gridSize: GRID_SIZE,
            currentPage: 'landing'
        }));
    });
};

const setPixel = (request, response) => {
    const {pixelIndex, color = '#000000', clearDisplay} = request.query;

    if (!pixelIndex && !clearDisplay) {
        response.status(400).send();
    }
    if (pixelIndex) {
        const [x, y] = indexTo2dCoords(pixelIndex, GRID_SIZE);
        const [r, g, b] = hexTripletStringToRgbArray(color);
        sense.setPixel(x, y, r, g, b, (error, rgb) => {
            response.status(error ? 500 : 204).send();
        });
    }
    if (clearDisplay) {
        sense.clear();
        response.status(202).send();
    }

};

const routes: RouteDefinition[] = [
    {
        url: '/pixels',
        method: 'get',
        handler: getPixelEditorPage
    },
    {
        url: '/pixel',
        method: 'put',
        handler: setPixel
    }
];

export {
    routes
};
