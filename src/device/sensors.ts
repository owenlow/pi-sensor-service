import nodeImu from 'nodeimu';
import {SensorData} from "../types";

const IMU = new nodeImu.IMU();

export const getAllReadings = (): Promise<SensorData> =>
    new Promise((resolve, reject) => {
        IMU.getValue((e, data) => {
            if (e) {
                reject("Error in IMU.getValue: " + e);
            } else {
                resolve(data as SensorData);
            }
        });
    });