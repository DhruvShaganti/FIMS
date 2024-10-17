const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const citySchema = new mongoose.Schema({
    CityName: { type: String, required: true },
    state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
citySchema.plugin(AutoIncrement, { inc_field: "CityID" });
// citySchema.plugin(AutoIncrement, { inc_ield: "CompanyID" });
const City = mongoose.model('City', citySchema)
module.exports = City