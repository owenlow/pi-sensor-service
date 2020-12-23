import { Schema, Document, model } from "mongoose";

interface NumberDataPoint extends Document {
    dataset: String;
    value: Number;
    timestamp: Date;
}

const NumberDataPointSchema = new Schema({
    dataset: String,
    value: Number,
    timestamp: Date,
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
});

export default model<NumberDataPoint>("NumberDataPoint", NumberDataPointSchema);
