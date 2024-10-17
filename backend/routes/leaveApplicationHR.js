const router = require('express').Router()
const LeaveApplication = require('./../models/LeaveApplication')
const Employee = require('./../models/Employee')
const { verifyHR } = require('./../utils/utils')

// router.get("/", verifyHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     LeaveApplication.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "employee"
//         })
//         // .select(" -role -position -department")
//         // .select("FirstName LastName MiddleName"
//         // )
//         .exec(function (err, leaveApplication) {
//         // console.log(filteredCompany);
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(leaveApplication);
//         }
//     });
// });
  
// router.put("/:id", verifyHR, (req, res) => {
//     const newLeaveApplication = {
//         Status: req.body.Status
//     };
//     LeaveApplication.findByIdAndUpdate(
//         req.params.id,
//         {$set: newLeaveApplication},
//         (err, numberAffected) => {
//             console.log(numberAffected);
//             return res.send(newLeaveApplication);
//         }
//     );
// });
  
// router.delete("/:id/:id2", verifyHR, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, (err, leaveApplication) => {
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
// // });

// router.get("/", verifyHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     LeaveApplication.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "employee"
//         })
//         // .select(" -role -position -department")
//         // .select("FirstName LastName MiddleName"
//         // )
//         .exec(function (err, leaveApplication) {
//         // console.log(filteredCompany);
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(leaveApplication);
//         }
//     });
// });
  
// router.put("/:id", verifyHR, (req, res) => {
//     const newLeaveApplication = {
//         Status: req.body.Status
//     };
//     LeaveApplication.findByIdAndUpdate(
//         req.params.id,
//         {$set: newLeaveApplication},
//         (err, numberAffected) => {
//             console.log(numberAffected);
//             return res.send(newLeaveApplication);
//         }
//     );
// });
  
// router.delete("/:id/:id2", verifyHR, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, (err, leaveApplication) => {
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

router.get("/", verifyHR, async (req, res) => {
    try {
        const leaveApplications = await LeaveApplication.find().populate('employee').exec();
        res.send(leaveApplications);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});

// Route to update a leave application by ID
router.put("/:id", verifyHR, async (req, res) => {
    const newLeaveApplication = {
        Status: req.body.Status
    };
    
    try {
        const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
            req.params.id,
            { $set: newLeaveApplication },
            { new: true } // Return the updated document
        );
        res.send(updatedLeaveApplication);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});

// Route to delete a leave application and update the employee
router.delete("/:id/:id2", verifyHR, async (req, res) => {
    try {
        const { id, id2 } = req.params;
        
        // Find and remove the leave application
        const leaveApplication = await LeaveApplication.findByIdAndRemove(id2);
        if (!leaveApplication) {
            return res.status(404).send("LeaveApplication not found");
        }
        
        // Find the employee and update their leave applications
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        
        // Remove the leave application reference from the employee
        await Employee.findByIdAndUpdate(
            id,
            { $pull: { leaveApplication: id2 } }
        );
        
        res.send(leaveApplication);
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});

module.exports = router