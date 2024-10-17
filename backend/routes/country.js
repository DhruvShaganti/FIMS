const router = require('express').Router()
const Country = require('./../models/Country')
const State = require('./../models/State')
const City = require('./../models/City')
const { verifyHR } = require('./../utils/utils')

// router.get("/", verifyHR, (req, res) => {
//     Country.find()
//         .populate({ path: "states", populate: { path: "cities" } })
//         .exec(function (err, country) {
//             res.send(country);
//     });
// });
  
// router.post("/", verifyHR, (req, res) => {
//     const newCountry = {
//         CountryName: req.body.CountryName
//     };
  
//     Country.create(newCountry, function (err, country) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(country);
//             console.log("new country Saved");
//         }
//     });
// });
  
// router.put("/:id", verifyHR, (req, res) => {
//     const newCountry = {
//         CountryName: req.body.CountryName
//     };
//     Country.findByIdAndUpdate(req.params.id, newCountry, function (err, country) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newCountry);
//         }
//     });
// });
  
// router.delete("/:id", verifyHR, (req, res) => {
//     Country.findById(req.params.id, function (err, foundCountry) {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
//             if (!foundCountry.states.length == 0) {
//             res
//                 .status(403)
//                 .send(
//                 "First Delete All The states in this country before deleting this country"
//                 );
//             } else {
//                 Country.findByIdAndRemove({ _id: req.params.id }, function (
//                     err,
//                     country
//                     ) {
//                         if (!err) {
//                             State.deleteMany({ country: { _id: req.params.id } }, function (
//                                 err
//                             ) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.send("error");
//                                 } else {
//                                 City.deleteMany(
//                                     { state: { country: { _id: req.params.id } } },
//                                     function (err) {
//                                     if (err) {
//                                         console.log(err);
//                                         res.send("error");
//                                     } else {
//                                         console.log(" Country deleted");
//                                         res.send(country);
//                                     }
//                                 });
//                             }
//                         });
//                     } else {
//                         console.log(err);
//                         res.send("error");
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
      const countries = await Country.find()
        .populate({ 
          path: "states", 
          populate: { path: "cities" } 
        });
      res.send(countries);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving countries");
    }
  });

  router.post("/", verifyHR, async (req, res) => {
    const newCountry = {
      CountryName: req.body.CountryName
    };
  
    try {
      const country = await Country.create(newCountry);
      res.send(country);
      console.log("New country saved");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating country");
    }
  });
  
router.put("/:id", verifyHR, async (req, res) => {
    const updatedCountry = {
      CountryName: req.body.CountryName
    };
  
    try {
      const country = await Country.findByIdAndUpdate(req.params.id, updatedCountry, { new: true });
      if (!country) {
        return res.status(404).send("Country not found");
      }
      res.send(country);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating country");
    }
});
  
router.delete("/:id", verifyHR, async (req, res) => {
    try {
      const foundCountry = await Country.findById(req.params.id);
      
      if (!foundCountry) {
        return res.status(404).send("Country not found");
      }
  
      // Check if there are any states in the country
      if (foundCountry.states.length > 0) {
        return res.status(403).send("First delete all the states in this country before deleting the country");
      }
  
      // Proceed with deletion
      await Country.findByIdAndRemove(req.params.id);
      await State.deleteMany({ country: req.params.id });
      await City.deleteMany({ state: { country: req.params.id } });
  
      res.send("Country and its related states and cities have been deleted");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting country");
    }
  
    console.log("delete");
    console.log(req.params.id);
  });
  
  
module.exports = router