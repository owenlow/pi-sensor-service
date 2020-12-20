import {Request, Response} from "express";

const sense = require('sense-hat-led');
import {RouteDefinition} from "../types";

const GRID_SIZE = 8;

type RgbArray = [number, number, number];

function hexTripletStringToRgbArray(hexString: string): RgbArray {
    const hexValue = parseInt(hexString.slice(1), 16); // Assuming the hex string starts with '#'
    const r = (hexValue & 0xff0000) >> 16;
    const g = (hexValue & 0x00ff00) >> 8;
    const b = (hexValue & 0x0000ff);
    return [r, g, b];
}

function indexTo2dCoords(index: number, gridSize: number): [number, number] {
    const x = index % gridSize; // column
    const y = (index - x) / gridSize; // row
    return [x, y];
}

function getPixelsHandler(request: Request, response: Response) {
    sense.getPixels((error, displayData) => {
        if (error) {
            response.status(400).send();
        } else {
            response.send({displayData});
        }
    });
}

function setPixelHandler(request: Request, response: Response) {
    const {pixelIndex, color = '#000000', clearDisplay} = request.query;

    if (!pixelIndex && !clearDisplay) {
        response.status(400).send();
    }
    if (pixelIndex) {
        const [x, y] = indexTo2dCoords(parseInt(pixelIndex as string), GRID_SIZE);
        const [r, g, b] = hexTripletStringToRgbArray(color);
        sense.setPixel(x, y, r, g, b, (error, rgb) => {
            response.status(error ? 500 : 204).send();
        });
    } else if (clearDisplay) {
        sense.clear();
        response.status(202).send();
    } else {
        response.status(400).send();
    }
}

function setPixelsHandler(request: Request, response: Response) {
    const {allPixelDataString, saveWithName} = request.query;
}

export const routes: RouteDefinition[] = [
    {
        url: '/pixels',
        method: 'get',
        handler: getPixelsHandler
    },
    {
        url: '/pixel',
        method: 'put',
        handler: setPixelHandler
    },
    {
        url: '/pixels',
        method: 'put',
        handler: setPixelsHandler
    }
];
