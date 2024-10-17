const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Position = require('./../models/Position')
const Employee = require('./../models/Employee')
const { verifyAdminHR } = require('./../utils/utils')

// router.get("/", verifyAdminHR, (req, res) => {
//     Position.find()
//         .populate("company")
//         .exec(function (err, role) {
//             res.send(role);
//         });
// });
  
// router.post("/", verifyAdminHR, (req, res) => {
//     const newPosition = {
//         PositionName: req.body.PositionName,
//         company: req.body.CompanyID
//     };

//     Position.create(newPosition, function (err, position) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(position);
//             console.log("new Role Saved");
//         }
//     });
// });

// router.put("/:id", verifyAdminHR, (req, res) => {
//     const updatePosition = {
//         PositionName: req.body.PositionName,
//         company: req.body.CompanyID
//     };

//     Position.findByIdAndUpdate(req.params.id, updatePosition, (err, position) => {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(updatePosition);
//         }
//     });
// });

// router.delete("/:id", verifyAdminHR, (req, res) => {
//     Employee.find({ position: req.params.id }, (err, p) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             if (p.length == 0) {
//             Position.findByIdAndRemove({ _id: req.params.id }, (err, position) => {
//                 if (!err) {
//                     console.log("position deleted");
//                     res.send(position);
//                     console.log("new Position Saved");
//                 } else {
//                     console.log("error");
//                     res.send("err");
//                 }
//             });
//             console.log("delete");
//             console.log(req.params.id);
//             } else {
//                 res
//                 .status(403)
//                 .send(
//                 "This Position is associated with Employee so you can not delete this"
//             )}
//         }
//     });
// });

// GET all positions with company populated
router.get("/", verifyAdminHR, async (req, res) => {
    try {
        const positions = await Position.find().populate("company");
        res.send(positions);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching positions");
    }
});

// POST a new position
router.post("/", verifyAdminHR, async (req, res) => {
    try {
        const newPosition = {
            PositionName: req.body.PositionName,
            company: req.body.CompanyID,
        };

        const position = await Position.create(newPosition);
        res.send(position);
        console.log("New Position Saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating position");
    }
});

// PUT (Update) a position by ID
router.put("/:id", verifyAdminHR, async (req, res) => {
    try {
        const updatedPosition = {
            PositionName: req.body.PositionName,
            company: req.body.CompanyID,
        };

        const position = await Position.findByIdAndUpdate(
            req.params.id,
            updatedPosition,
            { new: true } // To return the updated document
        );

        if (!position) {
            return res.status(404).send("Position not found");
        }

        res.send(position);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating position");
    }
});

// DELETE a position by ID, with check for employee association
router.delete("/:id", verifyAdminHR, async (req, res) => {
    try {
        const employees = await Employee.find({ position: req.params.id });

        if (employees.length > 0) {
            return res
                .status(403)
                .send("This position is associated with employees, so it cannot be deleted");
        }

        const position = await Position.findByIdAndRemove(req.params.id);

        if (!position) {
            return res.status(404).send("Position not found");
        }

        console.log("Position deleted");
        res.send(position);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting position");
    }
});

module.exports = router