import * as PiCamera from 'pi-camera';

const piCamera = new PiCamera({
    mode: 'photo',
    // output: `${ __dirname }/test.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
    rotation: 180
});

export const getImage = () =>
    new Promise((resolve, reject) => {
        piCamera.snapDataUrl()
            .then(result => {
                resolve(result);
            })
            .catch(reason => {
                reject(reason);
            });
    });