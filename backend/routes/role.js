const router = require('express').Router()
const Role = require('../models/Role')
const Employee = require('../models/Employee')
const { verifyAdminHR } = require('./../utils/utils')

// router.get("/", verifyAdminHR, (req, res) => {
//     Role.find()
//       .populate("company")
//       .exec(function (err, role) {
//         res.send(role);
//       });
//   });
  
// router.post("/", verifyAdminHR, (req, res) => {
//     const newRole = {
//         RoleName: req.body.RoleName,
//         company: req.body.CompanyID
//     };

//     Role.create(newRole, (err, role) => {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(role);
//             console.log("new Role Saved");
//         }
//     });
// });

// router.put("/:id", verifyAdminHR, (req, res) => {
//     const updateRole = {
//         RoleName: req.body.RoleName,
//         company: req.body.CompanyID
//     };

//     Role.findByIdAndUpdate(req.params.id, updateRole, (err, role) => {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(updateRole);
//         }
//     });
// });

// router.delete("/:id", verifyAdminHR, (req, res) => {
//     Employee.find({ role: req.params.id }, function (err, r) {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             if (r.length == 0) {
//                 Role.findByIdAndRemove({ _id: req.params.id }, function (err, role) {
//                     if (!err) {
//                         console.log(" Role deleted");
//                         res.send(role);
//                     } else {
//                         console.log("error");
//                         res.send("err");
//                     }
//                 });
//                     console.log("delete");
//                     console.log(req.params.id);
//             } else {
//                 res
//                 .status(403)
//                 .send(
//                     "This role is associated with Employee so you can not delete this"
//                 );
//             }
//         }
//     });
// });

// GET all roles with company populated
router.get("/", verifyAdminHR, async (req, res) => {
    try {
        const roles = await Role.find().populate("company");
        res.send(roles);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching roles");
    }
});

// POST a new role
router.post("/", verifyAdminHR, async (req, res) => {
    try {
        const newRole = {
            RoleName: req.body.RoleName,
            company: req.body.CompanyID,
        };

        const role = await Role.create(newRole);
        res.send(role);
        console.log("New Role Saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating role");
    }
});

// PUT (Update) a role by ID
router.put("/:id", verifyAdminHR, async (req, res) => {
    try {
        const updateRole = {
            RoleName: req.body.RoleName,
            company: req.body.CompanyID,
        };

        const role = await Role.findByIdAndUpdate(req.params.id, updateRole, {
            new: true, // Return the updated document
        });

        if (!role) {
            return res.status(404).send("Role not found");
        }

        res.send(role);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating role");
    }
});

// DELETE a role by ID, with check for employee association
router.delete("/:id", verifyAdminHR, async (req, res) => {
    try {
        const employees = await Employee.find({ role: req.params.id });

        if (employees.length > 0) {
            return res
                .status(403)
                .send(
                    "This role is associated with employees, so it cannot be deleted"
                );
        }

        const role = await Role.findByIdAndRemove(req.params.id);

        if (!role) {
            return res.status(404).send("Role not found");
        }

        console.log("Role deleted");
        res.send(role);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting role");
    }
});

module.exports = router