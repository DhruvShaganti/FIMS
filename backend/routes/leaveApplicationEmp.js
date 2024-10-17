const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')
const LeaveApplication = require('../models/LeaveApplication')
const { verifyEmployee } = require('./../utils/utils')

// router.get("/:id", verifyEmployee, (req, res) => {
//     console.log(req.params.id);
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.findById(req.params.id)
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "leaveApplication"
//             // populate: {
//             //   path: "state",
//             //   model: "State",
//             //   populate: {
//             //     path: "country",
//             //     model: "Country"
//             //   }
//             // }
//         })
//       // .select(" -role -position -department")
//         .select("FirstName LastName MiddleName")
//         .exec(function (err, employee) {
//             // console.log(filteredCompany);
//             if (err) {
//                 console.log(err);
//                 res.send("error");
//             } else {
//                 res.send(employee);
//             }
//       });
//   });
  
// router.post("/:id", verifyEmployee, (req, res) => {
//     Employee.findById(req.params.id, function (err, employee) {
//         if (err) {
//           console.log(err);
//           res.send("err");
//         } else {
//             const newLeaveApplication = {
//                 Leavetype: req.body.Leavetype,
//                 FromDate: req.body.FromDate,
//                 ToDate: req.body.ToDate,
//                 Reasonforleave: req.body.Reasonforleave,
//                 Status: req.body.Status,
//                 employee: req.params.id
//             };

//             LeaveApplication.create(newLeaveApplication, (err, leaveApplication) => {
//                 if (err) {
//                     console.log(err);
//                     res.send("error");
//                 } else {
//                     employee.leaveApplication.push(leaveApplication);
//                     employee.save(function (err, data) {
//                         if (err) {
//                             console.log(err);
//                             res.send("err");
//                         } else {
//                             console.log(data);
//                             res.send(leaveApplication);
//                         }
//                     });
//                     console.log("new leaveApplication Saved");
//                 }
//             });      
//         }   
//     });
// });
  
// router.put("/:id", verifyEmployee, (req, res) => {
//     const newLeaveApplication = {
//         Leavetype: req.body.Leavetype,
//         FromDate: req.body.FromDate,
//         ToDate: req.body.ToDate,
//         Reasonforleave: req.body.Reasonforleave,
//         Status: req.body.Status,
//         employee: req.params.id
//     };
  
//     LeaveApplication.findByIdAndUpdate(req.params.id, newLeaveApplication, (err, leaveApplication) => {
//             if (err) {
//                 res.send("error");
//             } else {
//                 res.send(newLeaveApplication);
//             }
//         }
//     );
// });
  
// router.delete("/:id/:id2", verifyEmployee, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
//             err,
//             leaveApplication
//             ) {
//                 if (!err) {
//                     console.log("LeaveApplication deleted");
//                     Employee.update(
//                     { _id: req.params.id },
//                     { $pull: { leaveApplication: req.params.id2 } },
//                     (err, numberAffected) => {
//                         console.log(numberAffected);
//                         res.send(leaveApplication);
//                     });
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

// GET Employee by ID with LeaveApplication populated
router.get("/:id", verifyEmployee, async (req, res) => {
    try {
        console.log(req.params.id);

        const employee = await Employee.findById(req.params.id)
            .populate({ path: "leaveApplication" })
            .select("FirstName LastName MiddleName");

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.send(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving employee");
    }
});

// POST new LeaveApplication to Employee
router.post("/:id", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const newLeaveApplication = new LeaveApplication({
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id
        });

        const leaveApplication = await newLeaveApplication.save();

        employee.leaveApplication.push(leaveApplication);
        await employee.save();

        res.send(leaveApplication);
        console.log("New leave application saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving leave application");
    }
});

// PUT (Update) LeaveApplication by ID
router.put("/:id", verifyEmployee, async (req, res) => {
    try {
        const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
            req.params.id,
            {
                Leavetype: req.body.Leavetype,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate,
                Reasonforleave: req.body.Reasonforleave,
                Status: req.body.Status,
                employee: req.params.id
            },
            { new: true } // Return the updated document
        );

        if (!updatedLeaveApplication) {
            return res.status(404).send("Leave application not found");
        }

        res.send(updatedLeaveApplication);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating leave application");
    }
});

// DELETE LeaveApplication from Employee
router.delete("/:id/:id2", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const leaveApplication = await LeaveApplication.findByIdAndRemove(req.params.id2);

        if (!leaveApplication) {
            return res.status(404).send("Leave application not found");
        }

        await Employee.updateOne(
            { _id: req.params.id },
            { $pull: { leaveApplication: req.params.id2 } }
        );

        res.send(leaveApplication);
        console.log("Leave application deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting leave application");
    }
});

  
module.exports = router