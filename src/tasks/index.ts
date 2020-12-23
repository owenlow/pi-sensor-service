import cron from "node-cron";
import { saveNumberDatapoint } from "../store/sensordata";
import { getAllReadings } from "../device";

function initCronTasks() {
    cron.schedule("* * * * *", function () {
        getAllReadings().then((sensorData) =>
            Object.entries(sensorData).forEach(function ([
                sensorName,
                sensorValue
            ]) {
                if (typeof sensorValue === "number") {
                    saveNumberDatapoint(sensorName, sensorValue).then(() =>
                        console.log(
                            `Saved '${sensorName}' datapoint at ${new Date()}`
                        )
                    );
                } else {
                    console.log(
                        `Skipping sensor '${sensorName}', as its value type is currently not supported.`
                    );
                }
            })
        );
    });
}

export { initCronTasks };
