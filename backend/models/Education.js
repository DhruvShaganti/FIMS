const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const educationSchema = new mongoose.Schema({
    SchoolUniversity: { type: String, required: true },
    Degree: { type: String, required: true },
    Grade: { type: String, required: true },
    PassingOfYear: { type: String, required: true }
});
educationSchema.plugin(AutoIncrement, { inc_field: "EducationID" });

const Education = mongoose.model("Education", educationSchema)
module.exports = Education;