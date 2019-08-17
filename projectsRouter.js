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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the projects'
        })
    }
});

module.exports = router;