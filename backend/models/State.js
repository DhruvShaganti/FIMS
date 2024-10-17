const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const stateSchema = new mongoose.Schema({
    StateName: { type: String, required: true },
    country: [{ type: mongoose.Schema.Types.ObjectId, ref: "Country" }],
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});
stateSchema.plugin(AutoIncrement, { inc_field: "StateID" });
const State = mongoose.model('State', stateSchema);
module.exports = State