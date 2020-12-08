import nodeImu from 'nodeimu';

const IMU = new nodeImu.IMU();

export const getAllReadings = (): Promise<{ [key:string]: any }> =>
    new Promise((resolve, reject) => {
        IMU.getValue((e, data) => {
            if (e) {
                reject("Error in IMU.getValue: " + e);
            } else {
                resolve(data);
            }
        });
    });