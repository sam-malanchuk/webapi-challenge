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
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        console.log(project);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the projects'
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