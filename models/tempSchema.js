const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
        temps: {
                DHTtemp: Number,
                DHThumidity: Number,
                CPUtemp: Number,
        },
}, { timestamps: true });
const Log = mongoose.model("Log", logSchema);
module.exports = Log;
