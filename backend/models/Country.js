const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const countrySchema = new mongoose.Schema({
    CountryName: { type: String, required: true },
    states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
countrySchema.plugin(AutoIncrement, { inc_field: "CountryID" });

const Country = mongoose.model('Country', countrySchema)
module.exports = Country