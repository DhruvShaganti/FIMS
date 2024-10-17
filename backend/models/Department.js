const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const departmentSchema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
departmentSchema.plugin(AutoIncrement, { inc_field: "DepartmentID" });

const Department = mongoose.model("Department", departmentSchema)
module.exports = Department