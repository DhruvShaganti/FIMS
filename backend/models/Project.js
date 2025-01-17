const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const projectSchema = new mongoose.Schema({
    CreatedBy: { type: String },
    CreatedDate: { type: Date, default: Date.now },
    Deleted: { type: Boolean },
    EmpFullName: { type: String },
    EstimatedCost: { type: Number },
    EstimatedTime: { type: Number },
    ModifiedBy: { type: String },
    ModifiedDate: { type: Date },
    ProjectDesc: { type: String },
    ProjectTitle: { type: String, required: true },
    ProjectURL: { type: String },
    Remark: { type: String },
    ResourceID: { type: Number },
    Status: { type: Number, required: true },
    /////////////****************** */
    // PortalName: { type: String },
    // Portals: 2
    /////////////****************** */
    portals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portal" }]
});
projectSchema.plugin(AutoIncrement, { inc_field: "ProjectID" });

const Project = mongoose.model('Project', projectSchema)
module.exports = Project;