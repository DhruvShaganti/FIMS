const router = require('express').Router()
const Employee = require('./../models/Employee')
const { verifyHR } = require('./../utils/utils')

// router.get("/", verifyHR, (req, res) => {
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "role position department"
//             // populate: {
//             //   path: "state",
//             //   model: "State",
//             //   populate: {
//             //     path: "country",
//             //     model: "Country"
//             //   }
//             // }
//         })
//         .select("-salary -education -familyInfo -workExperience -Password")
//         .exec(function (err, employee) {
//             res.send(employee);
//     });
// });
  
// router.post("/", verifyHR, (req, res) => {
//     const newEmployee = {
//         Email: req.body.Email,
//         Password: req.body.Password,
//         role: req.body.RoleID,
//         Account: req.body.Account,
//         Gender: req.body.Gender,
//         FirstName: req.body.FirstName,
//         MiddleName: req.body.MiddleName,
//         LastName: req.body.LastName,
//         DOB: req.body.DOB,
//         ContactNo: req.body.ContactNo,
//         EmployeeCode: req.body.EmployeeCode,
//         department: req.body.DepartmentID,
//         position: req.body.PositionID,
//         DateOfJoining: req.body.DateOfJoining,
//         TerminateDate: req.body.TerminateDate
//     };
  
//     Employee.create(newEmployee, function (err, employee) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(employee);
//             console.log("new employee Saved");
//         }
//     });
// });
  
// router.put("/:id", verifyHR, (req, res) => {
//     const newEmployee = {
//         Email: req.body.Email,
//         // Password: req.body.Password,
//         Account: req.body.Account,
//         role: req.body.RoleID,
//         Gender: req.body.Gender,
//         FirstName: req.body.FirstName,
//         MiddleName: req.body.MiddleName,
//         LastName: req.body.LastName,
//         DOB: req.body.DOB,
//         ContactNo: req.body.ContactNo,
//         EmployeeCode: req.body.EmployeeCode,
//         department: req.body.DepartmentID,
//         position: req.body.PositionID,
//         DateOfJoining: req.body.DateOfJoining,
//         TerminateDate: req.body.TerminateDate
//     };
  
//     Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
//         err,
//         employee
//     ) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newEmployee);
//         }
//     });
// });
  
// router.delete("/:id", verifyHR, (req, res) => {
//     Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
//       if (!err) {
//         console.log(" state deleted");
//         res.send(employee);
//       } else {
//         console.log(err);
//         res.send("error");
//       }
//     });
//     res.send("error");
//     console.log("delete");
//     console.log(req.params.id);
// });

// GET All Employees
router.get("/", verifyHR, async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate({
                path: "role position department"
            })
            .select("-salary -education -familyInfo -workExperience -Password");

        res.send(employees);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving employees");
    }
});
  
// POST a New Employee
router.post("/", verifyHR, async (req, res) => {
    try {
        const newEmployee = new Employee({
            Email: req.body.Email,
            Password: req.body.Password,
            role: req.body.RoleID,
            Account: req.body.Account,
            Gender: req.body.Gender,
            FirstName: req.body.FirstName,
            MiddleName: req.body.MiddleName,
            LastName: req.body.LastName,
            DOB: req.body.DOB,
            ContactNo: req.body.ContactNo,
            EmployeeCode: req.body.EmployeeCode,
            department: req.body.DepartmentID,
            position: req.body.PositionID,
            DateOfJoining: req.body.DateOfJoining,
            TerminateDate: req.body.TerminateDate
        });

        const employee = await newEmployee.save();
        res.send(employee);
        console.log("New employee saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving employee");
    }
});
  
// PUT (Update) an Employee
router.put("/:id", verifyHR, async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                Email: req.body.Email,
                Account: req.body.Account,
                role: req.body.RoleID,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            },
            { new: true } // Return the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).send("Employee not found");
        }

        res.send(updatedEmployee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating employee");
    }
});
  
// DELETE an Employee
router.delete("/:id", verifyHR, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndRemove(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        console.log("Employee deleted");
        res.send(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting employee");
    }
});

module.exports = router