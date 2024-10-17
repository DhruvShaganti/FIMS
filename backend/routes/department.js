const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Department = require('./../models/Department')
const Employee = require('./../models/Employee')
const { verifyAdminHR } = require('./../utils/utils')

// router.get("/", verifyAdminHR, (req, res) => {
//     Department.find()
//         .populate("company")
//         .exec(function (err, employees) {
//             res.send(employees);
//         });
// });

// router.post("/", verifyAdminHR, (req, res) => {
//     const  newDepartment = {
//         DepartmentName: req.body.DepartmentName,
//         company: req.body.CompanyID
//     };

//     Department.create(newDepartment, function (err, department) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(department);
//             console.log("new Role Saved");
//         }
//     });
// });

// router.put("/:id", verifyAdminHR, (req, res) => {
//     const updateDepartment = {
//         DepartmentName: req.body.DepartmentName,
//         company: req.body.CompanyID
//     };

//     Department.findByIdAndUpdate(req.params.id, updateDepartment, (err, department) => {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(updateDepartment);
//         }
//     });
// });
  
// router.delete("/:id", verifyAdminHR, (req, res) => {
//     Employee.find({ department: req.params.id }, function (err, d) {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             if (d.length == 0) {
//             Department.findByIdAndRemove({ _id: req.params.id }, function (
//                 err,
//                 department
//             ) {
//                 if (!err) {
//                     console.log("department deleted");
//                     res.send(department);
//                     console.log("new Department Saved");
//                 } else {
//                     console.log("error");
//                     res.send("err");
//                 }
//             });
//             console.log("delete");
//             console.log(req.params.id);
//             } else {
//                 es
//                 .status(403)
//                 .send(
//                     "This department is associated with Employee so you can not delete this"
//                 );
//             }
//         }
//     });
// });

router.get("/", verifyAdminHR, async (req, res) => {
    try {
      const departments = await Department.find().populate("company");
      res.send(departments);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving departments");
    }
});

router.post("/", verifyAdminHR, async (req, res) => {
    const newDepartment = {
      DepartmentName: req.body.DepartmentName,
      company: req.body.CompanyID,
    };
  
    try {
      const department = await Department.create(newDepartment);
      res.send(department);
      console.log("New department saved");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating department");
    }
});

router.put("/:id", verifyAdminHR, async (req, res) => {
    const updatedDepartment = {
      DepartmentName: req.body.DepartmentName,
      company: req.body.CompanyID,
    };
  
    try {
      const department = await Department.findByIdAndUpdate(req.params.id, updatedDepartment, { new: true });
      if (!department) {
        return res.status(404).send("Department not found");
      }
      res.send(department);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating department");
    }
});
// 
router.delete("/:id", verifyAdminHR, async (req, res) => {
    try {
      const employees = await Employee.find({ department: req.params.id });
  
      if (employees.length > 0) {
        return res.status(403).send("This department is associated with employees, so it cannot be deleted");
      }
  
      const department = await Department.findByIdAndRemove(req.params.id);
      
      if (!department) {
        return res.status(404).send("Department not found");
      }
  
      console.log("Department deleted");
      res.send(department);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting department");
    }
});

module.exports = router