const express = require('express');

const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the projects'
        })
    }
});

router.get('/:id', checkProjectID, async (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', async (req, res) => {
    const projectData = req.body;
    try {
        if(projectData.name && projectData.description && (projectData.completed !== undefined)) {
            const project = await Projects.insert(projectData);
            res.status(201).json({project});
        } else {
            res.status(400).json({
                message: 'Error, data must include:  name, description, completed'
            })
        }
    } catch (error) { 
        res.status(500).json({
            message: 'Error creating your new project'
        })
    }
});

function checkProjectID (req, res, next) {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if(project !== null) {
                req.project = project;
                next();
            } else {
                res.status(404).json({
                    message: 'Project ID not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error retrieving the projects'
            })
        })
}

module.exports = router;