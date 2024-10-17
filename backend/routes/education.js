const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Employee = require('./../models/Employee')
const Education = require('./../models/Education')
const { verifyEmployee, verifyHREmployee } = require('./../utils/utils')

// router.get("/:id", verifyHREmployee, (req, res) => {
//     console.log(req.params.id);
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.findById(req.params.id)
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "education"
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
//         });
// });
  
// router.post("/:id", verifyEmployee, (req, res) => {
//     Employee.findById(req.params.id, function (err, employee) {
//         if (err) {
//             console.log(err);
//             res.send("err");
//         } else {
//             const newEducation = {
//                 SchoolUniversity: req.body.SchoolUniversity,
//                 Degree: req.body.Degree,
//                 Grade: req.body.Grade,
//                 PassingOfYear: req.body.PassingOfYear
//             };

//             Education.create(newEducation, function (err, education) {
//                 if (err) {
//                     console.log(err);
//                     res.send("error");
//                 } else {
//                     employee.education.push(education);
//                     employee.save(function (err, data) {
//                         if (err) {
//                             console.log(err);
//                             res.send("err");
//                         } else {
//                             console.log(data);
//                             res.send(education);
//                         }
//                     });
//                     console.log("new Education Saved");
//                 }
//             });
//             console.log(req.body);
//         }
//     });
// });
  
// router.put("/:id", verifyEmployee, (req, res) => {
//     const newEducation = {
//         SchoolUniversity: req.body.SchoolUniversity,
//         Degree: req.body.Degree,
//         Grade: req.body.Grade,
//         PassingOfYear: req.body.PassingOfYear
//     };
  
//     Education.findByIdAndUpdate(req.params.id, newEducation, (err, education) => {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newEducation);
//         }
//     });
// });
  
// router.delete("/:id/:id2", verifyEmployee, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             Education.findByIdAndRemove({ _id: req.params.id2 }, (err, education) => {
//                 if (!err) {
//                     console.log("education deleted");
//                     Employee.update(
//                     { _id: req.params.id },
//                     { $pull: { education: req.params.id2 } },
//                     function (err, numberAffected) {
//                         console.log(numberAffected);
//                         res.send(education);
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

router.get("/:id", verifyHREmployee, async (req, res) => {
    try {
        console.log(req.params.id);
        const employee = await Employee.findById(req.params.id)
            .populate({
                path: "education",
            })
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
  
router.post("/:id", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const newEducation = new Education({
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear,
        });

        const education = await newEducation.save();
        employee.education.push(education._id);
        
        await employee.save();
        
        res.send(education);
        console.log("New education saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving education");
    }
});
  
router.put("/:id", verifyEmployee, async (req, res) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear,
            },
            { new: true } // Returns the updated document
        );

        if (!updatedEducation) {
            return res.status(404).send("Education not found");
        }
        
        res.send(updatedEducation);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating education");
    }
});
  
router.delete("/:id/:id2", verifyEmployee, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const education = await Education.findByIdAndRemove(req.params.id2);
        
        if (!education) {
            return res.status(404).send("Education not found");
        }

        await Employee.updateOne(
            { _id: req.params.id },
            { $pull: { education: req.params.id2 } }
        );
        
        res.send(education);
        console.log("Education deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting education");
    }
});


module.exports = router