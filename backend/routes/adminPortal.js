const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Portal = require('./../models/Portal');
const Project = require('./../models/Project')
const { verifyAdmin } = require('./../utils/utils')

// router.get("/", verifyAdmin, async (req, res) => {
//     await Portal.find()
//         .populate({ path: "projects" })
//         .exec(function (err, portalData) {
//             if (err) {
//                 res.send("err");
//                 console.log(err);
//             }
//         return res.send(portalData);
//     });
// });
  
// router.post("/", verifyAdmin, async (req, res) => {
//     const newPortal = {
//         PortalName: req.body.PortalName,
//         Status: req.body.Status
//     };
//     const portal = new Portal(newPortal);
//     try{
//         await portal.save()
//         res.status(201).json(portal)
//     }
//     catch(err){
//         res.status(400).json({'error': err.message})
//     }
        
// });
  
// router.put("/:id", verifyAdmin, async (req, res) => {
//     const updatePortal = {
//         PortalName: req.body.PortalName,
//         Status: req.body.Status
//     };
//     try{
//         const updated = await Portal.findOneAndUpdate(req.body._id, updatePortal, {new: true})
//         res.status(200).json(updated)
//     }
//     catch(err){
//         res.status(400).json({'error': err.message})
//     }
//     // Portal.findByIdAndUpdate(req.body._id, updatePortal, (err, Portal) => {
//     //     if (err) {
//     //         res.send("error");
//     //     } else {
//     //         res.send(updatePortal);
//     //     }
//     // });
// });
  
// router.delete("/:id", verifyAdmin, async (req, res) => {
//     const status = await Portal.findOneAndDelete({ _id: req.params.id })
//     if (status) {
//         res.status(200).json({ message: "Portal deleted successfully" })
//         const projectStatus = Project.deleteMany({ portals: {_id: req.params.id }})
//         if(projectStatus)
//             res.json({message: 'Project related to Portal deleted'})
//     }
//     else {
//         res.status(404).json({ message: "Portal not found" })
//     }
//     // Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
//     //     if (!err) {
//     //         console.log("portal deleted");
//     //         res.send(portal);
//     //         Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
//     //             if (err) {
//     //                 res.send("error");
//     //                 console.log(err);
//     //             }
//     //         });
//     //         console.log("new Portal Saved");
//     //     } else {
//     //         console.log("error");
//     //         res.send("err");
//     //     }
//     // });
//     // console.log("delete");
//     // console.log(req.params.id);
// });

router.get("/", verifyAdmin, async (req, res) => {
    try {
      const portalData = await Portal.find()
        .populate({ path: "projects" })
        .exec();
      res.send(portalData);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching portals");
    }
  });
  
  router.post("/", verifyAdmin, async (req, res) => {
    const newPortal = {
      PortalName: req.body.PortalName,
      Status: req.body.Status
    };
    
    const portal = new Portal(newPortal);
    try {
      await portal.save();
      res.status(201).json(portal);
    } catch (err) {
      console.error(err);
      res.status(400).json({ 'error': err.message });
    }
  });
  
  router.put("/:id", verifyAdmin, async (req, res) => {
    const updatePortal = {
      PortalName: req.body.PortalName,
      Status: req.body.Status
    };
    
    try {
      const updated = await Portal.findByIdAndUpdate(req.params.id, updatePortal, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Portal not found" });
      }
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(400).json({ 'error': err.message });
    }
  });
  
  router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
      const portal = await Portal.findByIdAndDelete(req.params.id);
      if (!portal) {
        return res.status(404).json({ message: "Portal not found" });
      }
  
      await Project.deleteMany({ portals: req.params.id });
      res.status(200).json({ message: "Portal and related projects deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting portal" });
    }
  });  

module.exports = router