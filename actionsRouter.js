const express = require('express');

const Actions = require("./data/helpers/actionModel.js");
const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();

router.get('/:id', checkActionID, async (req, res) => {
    res.status(200).json(req.action);
});

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the actions'
        })
    }
});

router.post('/', checkProjectID, async (req, res) => {
    const actionData = req.body;
    try {
        if(actionData.project_id && actionData.description && actionData.notes) {
            const action = await Actions.insert(actionData);
            res.status(201).json({action});
        } else {
            res.status(400).json({
                message: 'Error data must include (project_id, description, notes) fields'
            })
        }
    } catch (error) { 
        res.status(500).json({
            message: 'Error creating a new action'
        })
    }
});

router.put('/:id', checkActionID, async (req, res) => {
    const actionData = req.body;
    const { id } = req.params;

    try {
        if(!actionData.description && !actionData.notes) {
            res.status(400).json({
                message: 'Error data must include a description or notes(or both) field'
            })
        } else {
            const action = await Actions.update(id, req.body);
            res.status(201).json({ message: "The action has been successfully updated!" });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating the action'
        })
    }
});

router.delete('/:id', checkActionID, async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Actions.remove(id);
        res.status(200).json({ message: "The action has been successfully deleted!" });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting the action'
        })
    }
});

function checkActionID (req, res, next) {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            console.log('resonose from checkActionID:', action);
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({
                    message: 'Action ID not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error retrieving the Action'
            })
        })
}

function checkProjectID (req, res, next) {
    const id = req.body.project_id;

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
                message: 'Error retrieving the project ID'
            })
        })
}

module.exports = router;