# pi-sensor-service

### Description

Express site to expose a REST api to my rpi3 with sense hat connected.

### Endpoints

#### Get all sensors

`GET /sensors`

```json
{
    "accel": {
        "x": 0.0021959999576210976,
        "y": 0.019276000559329987,
        "z": 0.9772199988365173
    },
    "compass": {
        "x": 1.4267497062683105,
        "y": 6.271170616149902,
        "z": 44.01911544799805
    },
    "fusionPose": {
        "x": 0.7032709717750549,
        "y": 1.0561870336532593,
        "z": -1.93058443069458
    },
    "gyro": {
        "x": -0.0002683517523109913,
        "y": 0.0030138655565679073,
        "z": -0.002184521406888962
    },
    "humidity": 34.684242248535156,
    "pressure": 1010.548095703125,
    "temperature": 38.02820587158203,
    "tiltHeading": -1.3298062086105347,
    "timestamp": "2021-01-07T22:10:25.232Z"
}
```

Returns a map of sensor names to their values. Return type is `SensorData` in `src/types/index.ts`

#### Get sensor

`GET /sensors/temperature?limit=1`

```json
[
    {
        "__v": 0,
        "_id": "5ff783707c46e3556c4789f0",
        "createdAt": "2021-01-07T21:56:00.026Z",
        "dataset": "temperature",
        "timestamp": "2021-01-07T21:56:00.026Z",
        "value": 38.15684509277344
    }
]
```

Returns an object containing an array `dataPoints`, which is an array of type `DataPoint`, itself an object with a `value` and `timestamp`.

### Database setup

I'm running this on a raspberry pi with Raspberry Pi OS (Debian Buster) so for using a supported version of MongoDB I am using the dated version provided by the repository (v2.4.14)

**NOTE**: Be sure to check the mongo port used in the .env file, i've configured it to use a non-default value.
