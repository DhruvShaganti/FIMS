const router = require('express').Router()
const Company = require('./../models/Company')
const { verifyAdminHR, verifyHR } = require('./../utils/utils')

// router.get("/", verifyAdminHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Company.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "city",
//             populate: {
//             path: "state",
//             model: "State",
//             populate: {
//                 path: "country",
//                 model: "Country"
//             }
//             }
//         })
//         .exec(function (err, compnay) {
//             res.send(compnay);
//     });
// });

// router.post("/", verifyHR, (req, res) => {
//     const newCompany = {
//         CompanyName: req.body.CompanyName,
//         Address: req.body.Address,
//         city: req.body.CityID,
//         PostalCode: req.body.PostalCode,
//         Website: req.body.Website,
//         Email: req.body.Email,
//         ContactPerson: req.body.ContactPerson,
//         ContactNo: req.body.ContactNo,
//         FaxNo: req.body.FaxNo,
//         PanNo: req.body.PanNo,
//         GSTNo: req.body.GSTNo,
//         CINNo: req.body.CINNo
//     };
  
//     Company.create(newCompany, function (err, company) {
//         if (err) {
//             console.log(err);
//             res.send("error");
//         } else {
//             res.send(newCompany);
//             console.log("new company Saved");
//         }
//     });
// });

// router.put("/:id", verifyHR, (req, res) => {
//     const newCompany = {
//         CompanyName: req.body.CompanyName,
//         Address: req.body.Address,
//         city: req.body.CityID,
//         PostalCode: req.body.PostalCode,
//         Website: req.body.Website,
//         Email: req.body.Email,
//         ContactPerson: req.body.ContactPerson,
//         ContactNo: req.body.ContactNo,
//         FaxNo: req.body.FaxNo,
//         PanNo: req.body.PanNo,
//         GSTNo: req.body.GSTNo,
//         CINNo: req.body.CINNo
//     };
  
//     Company.findByIdAndUpdate(req.params.id, newCompany, function (
//         err,
//         company
//     ) {
//         if (err) {
//             res.send("error");
//         } else {
//             res.send(newCompany);
//         }
//     });
// });

router.get("/", verifyAdminHR, async (req, res) => {
    try {
      const companies = await Company.find()
        .populate({
          path: "city",
          populate: {
            path: "state",
            model: "State",
            populate: {
              path: "country",
              model: "Country"
            }
          }
        });
      res.send(companies);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving companies");
    }
});

router.post("/", verifyHR, async (req, res) => {
    const newCompany = {
      CompanyName: req.body.CompanyName,
      Address: req.body.Address,
      city: req.body.CityID,
      PostalCode: req.body.PostalCode,
      Website: req.body.Website,
      Email: req.body.Email,
      ContactPerson: req.body.ContactPerson,
      ContactNo: req.body.ContactNo,
      FaxNo: req.body.FaxNo,
      PanNo: req.body.PanNo,
      GSTNo: req.body.GSTNo,
      CINNo: req.body.CINNo
    };
  
    try {
      const company = await Company.create(newCompany);
      res.send(company);
      console.log("New company saved");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating company");
    }
});

router.put("/:id", verifyHR, async (req, res) => {
    const updatedCompany = {
      CompanyName: req.body.CompanyName,
      Address: req.body.Address,
      city: req.body.CityID,
      PostalCode: req.body.PostalCode,
      Website: req.body.Website,
      Email: req.body.Email,
      ContactPerson: req.body.ContactPerson,
      ContactNo: req.body.ContactNo,
      FaxNo: req.body.FaxNo,
      PanNo: req.body.PanNo,
      GSTNo: req.body.GSTNo,
      CINNo: req.body.CINNo
    };
  
    try {
      const company = await Company.findByIdAndUpdate(req.params.id, updatedCompany, { new: true });
      if (!company) {
        return res.status(404).send("Company not found");
      }
      res.send(company);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating company");
    }
});

module.exports = router