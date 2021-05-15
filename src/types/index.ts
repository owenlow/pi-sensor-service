import { Request, Response } from "express";

type RequestHandler = (request: Request<any, any, any, any>, response: Response) => void;

export interface RouteDefinition {
    method: "get" | "put" | "delete";
    url: string;
    handler: RequestHandler;
}

type Vector = {
    x: number;
    y: number;
    z: number;
};

export type SensorData = {
    timestamp: Date;

    accel: Vector;
    gyro: Vector;
    compass: Vector;
    fusionPose: Vector;

    temperature: number;
    pressure: number;
    humidity: number;
    tiltHeading: number;
};
