const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Employee = require('./../models/Employee')
const WorkExperience = require('./../models/WorkExperience')
const { verifyEmployee, verifyHREmployee } = require('./../utils/utils')

// router.get("/:id", verifyHREmployee, (req, res) => {
//     console.log(req.params.id);
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.findById(req.params.id)
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "workExperience"
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
//         const newWorkExperience = {
//             CompanyName: req.body.CompanyName,
//             Designation: req.body.Designation,
//             FromDate: req.body.FromDate,
//             ToDate: req.body.ToDate
//         };

//         WorkExperience.create(newWorkExperience, (err, workExperience) => {
//             if (err) {
//                 console.log(err);
//                 res.send("error");
//             } else {
//                 employee.workExperience.push(workExperience);
//                 employee.save(function (err, data) {
//                     if (err) {
//                         console.log(err);
//                         res.send("err");
//                     } else {
//                         console.log(data);
//                         res.send(workExperience);
//                     }
//                 });
//                 console.log("new WorkExperience Saved");
//             }
//         });
//         console.log(req.body);
//     }
//   });
// });
  
// router.put("/:id", verifyEmployee, (req, res) => {
//     const newWorkExperience = {
//         CompanyName: req.body.CompanyName,
//         Designation: req.body.Designation,
//         FromDate: req.body.FromDate,
//         ToDate: req.body.ToDate
//     };

//     WorkExperience.findByIdAndUpdate(
//         req.params.id,
//         newWorkExperience,
//         (err, workExperience) => {
//             if (err) {
//                 res.send("error");
//             } else {
//                 res.send(newWorkExperience);
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
//             WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
//             err,
//             workExperience
//             ) {
//             if (!err) {
//                 console.log("WorkExperience deleted");
//                 Employee.update(
//                 { _id: req.params.id },
//                 { $pull: { workExperience: req.params.id2 } },
//                 (err, numberAffected) => {
//                     console.log(numberAffected);
//                     res.send(workExperience);
//                 });
//             } else {
//                 console.log(err);
//                 res.send("error");
//             }
//             });
//             console.log("delete");
//             console.log(req.params.id);
//         }
//     });
// });

router.get("/:id", verifyHREmployee, async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id)
        .populate({
          path: "workExperience",
          // Uncomment and adjust if needed to include nested population
          // populate: {
          //   path: "state",
          //   model: "State",
          //   populate: {
          //     path: "country",
          //     model: "Country"
          //   }
          // }
        })
        .select("FirstName LastName MiddleName")
        .exec();
      
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
  
      res.send(employee);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching employee");
    }
  });
  
  router.post("/:id", verifyEmployee, async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
  
      const newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
      };
  
      const workExperience = await WorkExperience.create(newWorkExperience);
      employee.workExperience.push(workExperience);
      await employee.save();
  
      res.send(workExperience);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating work experience");
    }
  });
  
  router.put("/:id", verifyEmployee, async (req, res) => {
    try {
      const updatedWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate
      };
  
      const workExperience = await WorkExperience.findByIdAndUpdate(
        req.params.id,
        updatedWorkExperience,
        { new: true }
      );
  
      if (!workExperience) {
        return res.status(404).send("Work experience not found");
      }
  
      res.send(workExperience);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating work experience");
    }
  });
  
  router.delete("/:id/:id2", verifyEmployee, async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
  
      const workExperience = await WorkExperience.findByIdAndRemove(req.params.id2);
      if (!workExperience) {
        return res.status(404).send("Work experience not found");
      }
  
      employee.workExperience.pull(req.params.id2);
      await employee.save();
  
      res.send(workExperience);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting work experience");
    }
  });
  

module.exports = router