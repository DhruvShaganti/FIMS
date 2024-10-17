const router = require('express').Router()
const Project = require('./../models/Project')
const { verifyAdmin } = require('./../utils/utils')

router.get("/", verifyAdmin, async (req, res) => {
    try{
        const projects = await Project.find().populate("portals").exec();c
        console.log(projects)
        if(!projects)
            res.status(404).send('No Projects')
        else{
            res.status(200).send(projects)
        }
    }
    catch(err){
        res.status(500).send("Error retriving the Projects")
    }
    
});
  
router.post("/", verifyAdmin, async (req, res) => {
    const project = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
    };
    const newProject = new Project(project);
    try{
        await newProject.save();
        res.status(200).send("Project created");
    }
    catch(err){
        console.log(err);
        res.status(400).send("Error creating project");
    }
    // Project.create(project, function (err, project) {
    //     if (err) {
    //         console.log(err);
    //         res.send("error");
    //     } else {
    //         res.send(project);
    //         console.log("new project Saved");
    //     }
    // });
});
  
router.put("/:id", verifyAdmin, async (req, res) => {
    const updateProject = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        portals: req.body.Portal_ID,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark
    };
  
    try{
        const status = await Project.findByIdAndUpdate(req.params.id, updateProject, {new: true})
        if(!status) {
            res.status(404).send("Project not found");
        }
        else
            res.status(200).send("Project updated");
    }
    catch(err){
        res.status(404).send({message: "Project not found"})
    }
    
});
  
router.delete("/:id", verifyAdmin, async (req, res) => {

    try{
        const status = await Project.findOneAndDelete({_id: req.params.id})
        if(!status) {
            res.status(404).send("Project not found");
        }
        else
            res.status(200).json(status)
    }
    catch(err){
        res.status(404).send({message: "Project not found"})
    }

    // Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    //     if (err) {
    //         console.log("error");
    //         res.send("err");
    //     } else {
    //         console.log("project deleted");
    //         res.send(project);
    //     }
    // });
    // console.log("delete");
    // console.log(req.params.id);
});

  module.exports = router