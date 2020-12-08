import PiCamera from 'pi-camera';

const piCamera = new PiCamera({
    mode: 'photo',
    // output: `${ __dirname }/test.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
    rotation: 180
});

/**
 * Returns a promise that resolves with a data url of the image.
 */
export const getImage = (): Promise<String> =>
    new Promise((resolve, reject) => {
        piCamera.snapDataUrl()
            .then(result => {
                resolve(result);
            })
            .catch(reason => {
                reject(reason);
            });
    });