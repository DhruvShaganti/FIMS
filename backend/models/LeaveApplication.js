const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const leaveApplicationSchema = new mongoose.Schema({
    Leavetype: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true },
    Reasonforleave: { type: String, required: true },
    Status: { type: String, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
leaveApplicationSchema.plugin(AutoIncrement, { inc_field: "LeaveApplicationID" });
  
const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema)
module.exports = LeaveApplication;