import { Request, Response } from "express";
import { RouteDefinition } from "../types";
import { hexTripletStringToRgbArray, indexTo2dCoords } from "../utils/display";

const sense = require("sense-hat-led");

const GRID_SIZE = 8;

const getDisplayHandler = (request: Request, response: Response) => {
    sense.getPixels((error, displayData) => {
        if (error) {
            response.status(400).send();
        } else {
            response.send({ displayData });
        }
    });
};

interface SetDisplayPixelParams {
    pixelIndex: string;
}

interface SetDisplayPixelQuery {
    color?: string;
}

/**
 * Hanlder to set an individual pixel. Can probably be deprecated, but this was the original way to modify the display
 * @param request
 * @param response
 */
const setPixelHandler = (
    request: Request<SetDisplayPixelParams, any, any, SetDisplayPixelQuery>,
    response: Response
) => {
    const { pixelIndex } = request.params;
    const { color = "#000000" } = request.query;

    if (pixelIndex) {
        const [x, y] = indexTo2dCoords(parseInt(pixelIndex), GRID_SIZE);
        const [r, g, b] = hexTripletStringToRgbArray(color);
        sense.setPixel(x, y, r, g, b, (error, rgb) => {
            if (error) {
                response.status(500).send();
            } else {
                response.status(204).send({ rgb });
            }
        });
    } else {
        response.status(400).send();
    }
};

interface SetDisplayQuery {
    allPixelData: string[][];
}

/**
 * setDisplayHandler
 *  Sets the sense-hat display with a single-dimensional array of rgb values
 *
 * @param request
 * @param response
 */
const setDisplayHandler = (
    request: Request<void, any, any, SetDisplayQuery>,
    response: Response
) => {
    const { allPixelData } = request.query;
    response.status(202).send();
};

/**
 * clearDisplayHandler
 *  Clears the sense-hat display
 *
 * @param request
 * @param response
 */
const clearDisplayHandler = (request: Request, response: Response) => {
    sense.clear();
    response.status(202).send();
};

export const routes: RouteDefinition[] = [
    {
        url: "/display",
        method: "get",
        handler: getDisplayHandler
    },
    {
        url: "/display/:pixelIndex",
        method: "put",
        handler: setPixelHandler
    },
    {
        url: "/display",
        method: "put",
        handler: setDisplayHandler
    },
    {
        url: "/display",
        method: "delete",
        handler: clearDisplayHandler
    }
];
