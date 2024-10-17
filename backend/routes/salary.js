const router = require('express').Router()
const Employee = require('./../models/Employee')
const Salary = require('./../models/Salary')
const { verifyHR } = require('./../utils/utils')

// router.get("/", verifyHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "salary"
//             // populate: {
//             //   path: "state",
//             //   model: "State",
//             //   populate: {
//             //     path: "country",
//             //     model: "Country"
//             //   }
//             // }
//         })
//         // .select(" -role -position -department")
//         .select("FirstName LastName MiddleName")
//         .exec(function (err, company) {
//             // employee = employees;
//             let filteredCompany = company.filter(data => data["salary"].length == 1);
//             // console.log(filteredCompany);
//             res.send(filteredCompany);
//     });
// });
  
// router.post("/:id", verifyHR, (req, res) => {
//    Employee.findById(req.params.id, function (err, employee) {
//         if (err) {
//         console.log(err);
//         res.send("err");
//         } else {
//             if (employee.salary.length == 0) {
//                 const newSalary = {
//                     BasicSalary: req.body.BasicSalary,
//                     BankName: req.body.BankName,
//                     AccountNo: req.body.AccountNo,
//                     AccountHolderName: req.body.AccountHolderName,
//                     IFSCcode: req.body.IFSCcode,
//                     TaxDeduction: req.body.TaxDeduction
//                 };

//                 Salary.create(newSalary, function (err, salary) {
//                     if (err) {
//                         console.log(err);
//                         res.send("error");
//                     } else {
//                         employee.salary.push(salary);
//                         employee.save(function (err, data) {
//                             if (err) {
//                                 console.log(err);
//                                 res.send("err");
//                             } else {
//                                 console.log(data);
//                                 res.send(salary);
//                             }
//                         });
//                         console.log("new salary Saved");
//                     }
//                 });
//                 console.log(req.body);
//             } else {
//                 res
//                 .status(403)
//                 .send("Salary Information about this employee already exits");
//             }
//         }
//     });
// });
  
// router.put("/:id", verifyHR, (req, res) => {
//     const newSalary = {
//         BasicSalary: req.body.BasicSalary,
//         BankName: req.body.BankName,
//         AccountNo: req.body.AccountNo,
//         AccountHolderName: req.body.AccountHolderName,
//         IFSCcode: req.body.IFSCcode,
//         TaxDeduction: req.body.TaxDeduction
//     };

//     Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newSalary);
//         }
//     });
// });
  
// router.delete("/:id", verifyHR, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
//             err,
//             salary
//             ) {
//                 if (!err) {
//                     console.log("salary deleted");
//                     Employee.update(
//                     { _id: req.params.id },
//                     { $pull: { salary: employee.salary[0] } },
//                     function (err, numberAffected) {
//                         console.log(numberAffected);
//                         res.send(salary);
//                     }
//                     );
//                 } else {
//                     console.log(err);
//                     res.send("error");
//                 }
//             });
//             console.log("delete");
//             console.log(req.params.id);
//         }
//     });
// });

// GET all employees with salary populated, filter to those with exactly 1 salary
router.get("/", verifyHR, async (req, res) => {
    try {
        const employees = await Employee.find().populate("salary").select("FirstName LastName MiddleName");
        const filteredCompany = employees.filter(data => data["salary"].length === 1);
        res.send(filteredCompany);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching employees");
    }
});

// POST a new salary for an employee if not already present
router.post("/:id", verifyHR, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        if (employee.salary.length === 0) {
            const newSalary = {
                BasicSalary: req.body.BasicSalary,
                BankName: req.body.BankName,
                AccountNo: req.body.AccountNo,
                AccountHolderName: req.body.AccountHolderName,
                IFSCcode: req.body.IFSCcode,
                TaxDeduction: req.body.TaxDeduction
            };

            const salary = await Salary.create(newSalary);
            employee.salary.push(salary);
            await employee.save();
            res.send(salary);
            console.log("New salary saved");
        } else {
            res.status(403).send("Salary information for this employee already exists");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving salary");
    }
});

// PUT (Update) a salary by ID
router.put("/:id", verifyHR, async (req, res) => {
    try {
        const updatedSalary = {
            BasicSalary: req.body.BasicSalary,
            BankName: req.body.BankName,
            AccountNo: req.body.AccountNo,
            AccountHolderName: req.body.AccountHolderName,
            IFSCcode: req.body.IFSCcode,
            TaxDeduction: req.body.TaxDeduction
        };

        const salary = await Salary.findByIdAndUpdate(req.params.id, updatedSalary, { new: true });

        if (!salary) {
            return res.status(404).send("Salary not found");
        }

        res.send(salary);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating salary");
    }
});

// DELETE a salary by employee ID
router.delete("/:id", verifyHR, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        if (employee.salary.length === 0) {
            return res.status(404).send("No salary information found for this employee");
        }

        const salaryId = employee.salary[0]; // Assuming salary is an array and we want the first one

        const salary = await Salary.findByIdAndRemove(salaryId);

        if (!salary) {
            return res.status(404).send("Salary not found");
        }

        await Employee.updateOne(
            { _id: req.params.id },
            { $pull: { salary: salaryId } }
        );

        res.send(salary);
        console.log("Salary deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting salary");
    }
});

module.exports = router