import { getDatapointsFromDataset } from "../store/sensordata";
import { getAllReadings } from "../device";
import { RouteDefinition } from "../types";
import { handleError } from "./error";
import { Request, Response } from "express";

const handleGetSensors = function (request: Request, response: Response) {
    getAllReadings()
        .then((allReadings) => {
            response.send(allReadings);
        })
        .catch((error) => handleError(response, error));
};

interface GetSensorGraphParams {
    sensorName: string;
}

const getSensorGraph = function (
    request: Request<GetSensorGraphParams>,
    response: Response
) {
    const dataset = request.params.sensorName;
    getDatapointsFromDataset(dataset)
        .then((datapoints) => {
            const sanitizedDataPoints = datapoints.map(
                ({ value, timestamp }) => ({ value, timestamp })
            );
            response.send(sanitizedDataPoints);
        })
        .catch((error) => handleError(response, error));
};

export const routes: RouteDefinition[] = [
    {
        url: "/sensors",
        method: "get",
        handler: handleGetSensors
    },
    {
        url: "/sensors/:sensorName",
        method: "get",
        handler: getSensorGraph
    }
];
