
export interface RouteDefinition {
    method: 'get' | 'put';
    url: string;
    handler: (Request, Response) => void;
}

type Vector = {
    x: number;
    y: number;
    z: number;
}

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
}