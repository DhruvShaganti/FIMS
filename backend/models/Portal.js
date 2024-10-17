const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const portalSchema = new mongoose.Schema({
    CreatedBy: { type: String },
    CreatedDate: { type: Date, default: Date.now },
    Deleted: { type: Boolean },
    ModifiedBy: { type: String },
    ModifiedDate: { type: Date },
    PortalName: { type: String, required: true },
    Status: { type: Number, required: true }
});
portalSchema.plugin(AutoIncrement, { inc_field: "PortalID" });
  

const Portal = mongoose.model('Portal', portalSchema)
module.exports = Portal;