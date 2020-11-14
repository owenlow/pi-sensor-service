const nodeimu = require('../../nodeimu');
const PiCamera = require('pi-camera');

const IMU = new nodeimu.IMU();
const picamera = new PiCamera({
    mode: 'photo',
    // output: `${ __dirname }/test.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
    rotation: 180
});

const getAllReadings = () =>
    new Promise((resolve, reject) => {
        IMU.getValue((e, data) => {
            if (e) {
                reject("Error in IMU.getValue: " + e);
                return;
            }

            resolve(data);
        });
    });

const getImage = () =>
    new Promise((resolve, reject) => {
        picamera.snapDataUrl()
            .then(result => {
                resolve(result);
            })
            .catch(reason => {
                reject(reason);
            });
    });


module.exports = {
    getAllReadings,
    getImage
};
