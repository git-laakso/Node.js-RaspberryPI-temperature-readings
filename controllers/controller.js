//Declaring constants
const fs = require("fs");
const cron = require("node-cron");
const Log = require("../models/tempSchema.js");
const sensor = require("node-dht-sensor");

//Generating CPU temperature
function runTemperature() {
    //runTemp runs built-in file that prints raspberrys CPU temperature in console. We are fetching that file
    let runTemp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
    //temp_c divides our printed number by thousand (1000). This helps us read our temperature. Example 42000 becomes 42,000
    let temp_c = runTemp / 1000;
    //Add a new instance of our model
    let handleTemp = new Log();
    handleTemp.temps.CPUtemp = temp_c;
    handleTemp.save(); {
        console.log("CPU temperature recorded: ", temp_c, "C");
    };
};

function runDHT() {
    sensor.read(11, 21, function (err, temperature, humidity) {
        let handleDHT = new Log();
        handleDHT.temps.DHTtemp = temperature;
        handleDHT.save(); {
            console.log("DHT temperature recorded:", temperature);
            const Gpio = require("onoff").Gpio;
            let LED = new Gpio(14, "out"),
                LED2 = new Gpio(19, "out");
            if (temperature <= 25)
                console.log("below 25 or equal to 25");
            LED2.writeSync(0);
            LED.writeSync(1);
    
            if (temperature >= 26)
                console.log("over 26 or equal to 26");
            LED.writeSync(0);
            LED2.writeSync(1);
        }
    });
};

//Handling routes
const getLogPage = (req, res) => {
    res.render("temps"), { title: "Generate data" };
}

//This module allows us to schedule task in node.js using full crontab syntax
//Job is ran every twenty (20) minutes. Print time went by when certain time is reached
cron.schedule("*/1 * * * *", () => {
    runTemperature(), runDHT(), console.log("20 minutes went by");
});

//Exporting
module.exports = { runTemperature, getLogPage }