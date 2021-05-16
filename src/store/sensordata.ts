import mongoose from "mongoose";

import NumberDataPointModel from "./models/number-datapoint";

const HOSTNAME = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB_NAME;

// replace with _.once if I add lodash
(function () {
    let initialized = false;
    return function () {
        if (!initialized) {
            console.log("initializing mongo");
            mongoose.connect(`mongodb://${HOSTNAME}:${PORT}/${DB_NAME}`, {
                useMongoClient: true
            });
            mongoose.Promise = global.Promise;
            initialized = true;
        }
    };
})()();

async function saveNumberDatapoint(dataset: string, value: number) {
    const newDatapoint = new NumberDataPointModel({
        dataset,
        value,
        timestamp: new Date()
    });
    return newDatapoint.save();
}

async function getDatapointsFromDataset(dataset: string, limit: number = 10) {
    return (
        NumberDataPointModel.find({ dataset })
            // Sort newest first, then grab the first 10
            .sort({ timestamp: -1 })
            .limit(limit)
            // Reverse the order so they are delivered chronologically
            .then((result) => result.reverse())
    );
}

export { saveNumberDatapoint, getDatapointsFromDataset };
