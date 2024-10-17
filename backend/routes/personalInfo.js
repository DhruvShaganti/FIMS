const router = require('express').Router()
const { verifyEmployee, verifyHREmployee } = require('./../utils/utils')
const Employee = require('./../models/Employee')

// router.get("/:id", verifyHREmployee, (req, res) => {
//     console.log("personal-info", req.params.id);
//     Employee.findById(req.params.id)
//         // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "role position department"
//             //   // populate: {
//             //   //   path: "state",
//             //   //   model: "State",
//             //   //   populate: {
//             //   //     path: "country",
//             //   //     model: "Country"
//             //   //   }
//             //   // }
//         })
//         .select("-salary -education -familyInfo -workExperience")
//         .exec(function (err, employee) {
//             // employee = employees;
//             res.send(employee);
//     });
// });
  
// router.put("/:id", verifyEmployee, (req, res) => {
//     const newEmployee = {
//         BloodGroup: req.body.BloodGroup,
//         ContactNo: req.body.ContactNo,
//         DOB: req.body.DOB,
//         Email: req.body.Email,
//         EmergencyContactNo: req.body.EmergencyContactNo,
//         Gender: req.body.Gender,
//         Hobbies: req.body.Hobbies,
//         PANcardNo: req.body.PANcardNo,
//         PermanetAddress: req.body.PermanetAddress,
//         PresentAddress: req.body.PresentAddress
//     };
//     Employee.findByIdAndUpdate(
//         req.params.id,
//         {$set: newEmployee},
//         function (err, numberAffected) {
//             console.log(numberAffected);
//             res.send(newEmployee);
//         }
//     );
// });

// GET Employee personal info with populated fields
router.get("/:id", verifyHREmployee, async (req, res) => {
    try {
        console.log("personal-info", req.params.id);

        const employee = await Employee.findById(req.params.id)
            .populate("role position department")
            .select("-salary -education -familyInfo -workExperience");

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.send(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving employee information");
    }
});

// PUT (Update) Employee personal information
router.put("/:id", verifyEmployee, async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    BloodGroup: req.body.BloodGroup,
                    ContactNo: req.body.ContactNo,
                    DOB: req.body.DOB,
                    Email: req.body.Email,
                    EmergencyContactNo: req.body.EmergencyContactNo,
                    Gender: req.body.Gender,
                    Hobbies: req.body.Hobbies,
                    PANcardNo: req.body.PANcardNo,
                    PermanetAddress: req.body.PermanetAddress,
                    PresentAddress: req.body.PresentAddress,
                },
            },
            { new: true } // To return the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).send("Employee not found");
        }

        res.send(updatedEmployee);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating employee information");
    }
});


module.exports = router