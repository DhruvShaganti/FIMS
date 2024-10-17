const router = require('express').Router()
const State = require('./../models/State')
const Country = require('./../models/Country')
const { verifyHR } = require('./../utils/utils')

// router.get("/", verifyHR, (req, res) => {
//     State.find()
//       .populate("country citiesx")
//       .exec(function (err, country) {
//         res.send(country);
//       });
//   });
//   //State
// router.post("/", verifyHR, (req, res) => {
//     const newState = {
//         StateName: req.body.StateName,
//         country: req.body.CountryID
//     };
  
//     State.create(newState, function (err, state) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             Country.findById(req.body.CountryID, function (err, country) {
//                 if (err) {
//                     console.log(err);
//                     res.send("err");
//                 } else {
//                     country.states.push(state);
//                     country.save(function (err, data) {
//                         if (err) {
//                             console.log(err);
//                             res.send("err");
//                         } else {
//                             console.log(data);
//                             res.send(state);
//                         }
//                     });
//                 }
//             });
//             console.log("new country Saved");
//         }
//     });
// });
// router.put("/:id", verifyHR, (req, res) => {
//     const newState = {
//         StateName: req.body.StateName,
//         country: req.body.CountryID
//     };
  
//     State.findByIdAndUpdate(req.params.id, newState, function (err, state) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newState);
//         }
//     });
// });
  
// router.delete("/:id", verifyHR, (req, res) => {
//     State.findById(req.params.id, function (err, foundState) {
//         if (err) {
//             res.send(err);
//         } else {
//             // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
//             if (!foundState.cities.length == 0) {
//             res
//                 .status(403)
//                 .send(
//                 "First Delete All The cities in this state before deleting this state"
//                 );
//             } else {
//                 State.findByIdAndRemove({ _id: req.params.id }, function (err, state) {
//                     if (!err) {
//                     console.log(" state deleted");
//                     console.log("country id---------", state.country[0]);
//                     Country.update(
//                         { _id: state.country[0] },
//                         { $pull: { states: state._id } },
//                         function (err, numberAffected) {
//                         console.log(numberAffected);
//                         res.send(state);
//                         }
//                     );
//                     } else {
//                     console.log(err);
//                     res.send("error");
//                     }
//                 });
//             }
//         }
//     });
  
//     console.log("delete");
//     console.log(req.params.id);
// });

router.get("/", verifyHR, async (req, res) => {
    try {
      const states = await State.find().populate("country citiesx").exec();
      res.send(states);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching states");
    }
  });
  
  router.post("/", verifyHR, async (req, res) => {
    try {
      const newState = {
        StateName: req.body.StateName,
        country: req.body.CountryID
      };
      
      const state = await State.create(newState);
  
      const country = await Country.findById(req.body.CountryID);
      if (!country) {
        return res.status(404).send("Country not found");
      }
      
      country.states.push(state);
      await country.save();
  
      res.send(state);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating state");
    }
  });
  
  router.put("/:id", verifyHR, async (req, res) => {
    try {
      const updatedState = {
        StateName: req.body.StateName,
        country: req.body.CountryID
      };
      
      const state = await State.findByIdAndUpdate(req.params.id, updatedState, { new: true });
      if (!state) {
        return res.status(404).send("State not found");
      }
  
      res.send(state);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating state");
    }
  });
  
  router.delete("/:id", verifyHR, async (req, res) => {
    try {
      const state = await State.findById(req.params.id);
      if (!state) {
        return res.status(404).send("State not found");
      }
  
      if (state.cities.length > 0) {
        return res.status(403).send("First delete all the cities in this state before deleting this state");
      }
  
      await State.findByIdAndRemove(req.params.id);
      
      const country = await Country.findById(state.country[0]);
      if (country) {
        country.states.pull(state._id);
        await country.save();
      }
  
      res.send(state);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting state");
    }
  });  

module.exports = router