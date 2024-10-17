const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const salarySchema = new mongoose.Schema({
    BasicSalary: { type: String, required: true },
    BankName: { type: String, required: true },
    AccountNo: { type: String, required: true },
    AccountHolderName: { type: String, required: true },
    IFSCcode: { type: String, required: true },
    TaxDeduction: { type: String, required: true }
});
salarySchema.plugin(AutoIncrement, { inc_field: "SalaryID" });

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;