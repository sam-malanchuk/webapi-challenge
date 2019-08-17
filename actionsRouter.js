const express = require('express');

const Actions = require("./data/helpers/actionModel.js");

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

function checkActionID (req, res, next) {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            if(action !== null) {
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

module.exports = router;