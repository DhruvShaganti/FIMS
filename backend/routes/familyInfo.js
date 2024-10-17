const router = require('express').Router()
const Employee = require('./../models/Employee')
const FamilyInfo = require('./../models/FamilyInfo')
const jwt = require('jsonwebtoken')
const { verifyEmployee, verifyHREmployee } = require('./../utils/utils')

// router.get("/:id", verifyHREmployee, (req, res) => {
//     console.log(req.params.id);
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.findById(req.params.id)
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "familyInfo"
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
//         .exec(function (err, employee) {
//             // console.log(filteredCompany);
//             res.send(employee);
//         }
//     );
// });
  
// router.post("/:id", verifyEmployee, (req, res) => {
//     Employee.findById(req.params.id, function (err, employee) {
//         if (err) {
//             console.log(err);
//             res.send("err");
//         } else {
//             const newFamilyInfo = {
//                 Name: req.body.Name,
//                 Relationship: req.body.Relationship,
//                 DOB: req.body.DOB,
//                 Occupation: req.body.Occupation
//             };

//             FamilyInfo.create(newFamilyInfo, (err, familyInfo) => {
//                 if (err) {
//                     console.log(err);
//                     res.send("error");
//                 } else {
//                     employee.familyInfo.push(familyInfo);
//                     employee.save(function (err, data) {
//                         if (err) {
//                             console.log(err);
//                             res.send("err");
//                         } else {
//                         console.log(data);
//                             res.send(familyInfo);
//                         }
//                     });
//                     console.log("new familyInfo Saved");
//                 }
//             });
//             console.log(req.body);
//         }
//     });
// });
  
// router.put("/:id", verifyEmployee, (req, res) => {
//     const newFamilyInfo = {
//         Name: req.body.Name,
//         Relationship: req.body.Relationship,
//         DOB: req.body.DOB,
//         Occupation: req.body.Occupation
//     };

//     FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, (err, familyInfo) => {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newFamilyInfo);
//         }
//     });
// });
  
// router.delete("/:id/:id2", verifyEmployee, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, (err, familyInfo) => {
//                 if (!err) {
//                     console.log("FamilyInfo deleted");
//                     Employee.update(
//                     { _id: req.params.id },
//                     { $pull: { familyInfo: req.params.id2 } },
//                     function (err, numberAffected) {
//                         console.log(numberAffected);
//                         res.send(familyInfo);
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
// GET Employee by ID with FamilyInfo populated
router.get("/:id", verifyHREmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate({ path: "familyInfo" })
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

// POST FamilyInfo to Employee
router.post("/:id", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const newFamilyInfo = new FamilyInfo({
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation
        });

        const familyInfo = await newFamilyInfo.save();

        employee.familyInfo.push(familyInfo);
        await employee.save();

        res.send(familyInfo);
        console.log("New FamilyInfo saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving family info");
    }
});

// PUT (Update) FamilyInfo by ID
router.put("/:id", verifyEmployee, async (req, res) => {
    try {
        const updatedFamilyInfo = await FamilyInfo.findByIdAndUpdate(
            req.params.id,
            {
                Name: req.body.Name,
                Relationship: req.body.Relationship,
                DOB: req.body.DOB,
                Occupation: req.body.Occupation
            },
            { new: true }
        );

        if (!updatedFamilyInfo) {
            return res.status(404).send("FamilyInfo not found");
        }

        res.send(updatedFamilyInfo);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating family info");
    }
});

// DELETE FamilyInfo from Employee
router.delete("/:id/:id2", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const familyInfo = await FamilyInfo.findByIdAndRemove(req.params.id2);

        if (!familyInfo) {
            return res.status(404).send("FamilyInfo not found");
        }

        await Employee.updateOne(
            { _id: req.params.id },
            { $pull: { familyInfo: req.params.id2 } }
        );

        res.send(familyInfo);
        console.log("FamilyInfo deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting family info");
    }
});


module.exports = router