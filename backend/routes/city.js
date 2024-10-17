const router = require('express').Router()
const City = require('./../models/City')
const State = require('./../models/State')
const { verifyHR } = require('./../utils/utils')

router.get("/", verifyHR, async (req, res) => {
    try{
        const cities = await City.find()
            .populate({ path: "state", populate: { path: "country" } })
            .exec();
        console.log(cities, 'citites')
        res.json(cities)
    }
    catch(err){
        res.status(500).send(err)
    }
    
});

router.post("/", verifyHR, async (req, res) => {
    const newCity = {
        CityName: req.body.CityName,
        state: req.body.StateID
    };
    try{
        const city = new City(newCity);
        await city.save()
        const state = awaitState.findById(req.body.stateID)
        state.cities.push(city)
        await state.save()
        res.json(city)

    }
    catch(err){
        res.status(500).json(err)
    }
    // City.create(newCity, function (err, city) {
        // if (err) {
        // console.log(err);
        // res.send("error");
        // } else {
        //     State.findById(req.body.StateID, function (err, state) {
        //         if (err) {
        //             console.log(err);
        //             res.send("err");
        //         } else {
        //             state.cities.push(city);
        //             state.save(function (err, data) {
        //                 if (err) {
        //                     console.log(err);
        //                     res.send("err");
        //                 } else {
        //                     // console.log(data);
        //                     res.send(city);
        //                 }
        //             });
        //         }
        //     });

    //         console.log("new city Saved");
    //     }
    // });
});

// router.put("/:id", verifyHR, (req, res) => {
//     const newCity = {
//         CityName: req.body.CityName,
//         state: req.body.StateID
//     };
  
//     City.findByIdAndUpdate(req.params.id, newCity, function (err, city) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newCity);
//         }
//     });
// });

router.put("/:id", verifyHR, async (req, res) => {
    const newCity = {
      CityName: req.body.CityName,
      state: req.body.StateID
    };
  
    try {
      const updatedCity = await City.findByIdAndUpdate(req.params.id, newCity, { new: true });
      if (!updatedCity) {
        return res.status(404).send("City not found");
      }
      res.send(updatedCity);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating the city");
    }
  });
  

// router.delete("/:id", verifyHR, (req, res) => {
//     Company.find({ city: req.params.id }, function (err, country) {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             console.log(country.length == 0);
//             if (country.length == 0) {
//                 City.findByIdAndRemove({ _id: req.params.id }, function (err, city) {
//                     if (!err) {
//                     console.log(" state deleted");
//                     State.update(
//                         { _id: city.state[0] },
//                         { $pull: { cities: city._id } },
//                         function (err, numberAffected) {
//                         console.log(numberAffected);
//                         res.send(city);
//                         }
//                     );
//                     } else {
//                         console.log(err);
//                         res.send("error");
//                     }
//                 });
//             } else {
//                 res
//                 .status(403)
//                 .send(
//                 "This city is associated with company so you can not delete this"
//                 );
//             }
//         }
//     });
  
//     console.log("delete");
//     console.log(req.params.id);
// });

router.delete("/:id", verifyHR, async (req, res) => {
    try {
      const companies = await Company.find({ city: req.params.id });
      if (companies.length > 0) {
        return res.status(403).send("This city is associated with a company, so it cannot be deleted");
      }
  
      const city = await City.findByIdAndRemove(req.params.id);
      if (!city) {
        return res.status(404).send("City not found");
      }
  
      await State.updateOne({ _id: city.state }, { $pull: { cities: city._id } });
  
      console.log("City deleted");
      res.send(city);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting the city");
    }
  
    console.log("Delete request received for city ID:", req.params.id);
  });
  

module.exports = router
  