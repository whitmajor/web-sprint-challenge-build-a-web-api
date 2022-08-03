// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "The action with the specified ID does not exist"
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "The action information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
}

async function validateActionBody(req, res, next) {
    try {
        const { notes, description, completed, project_id } = req.body
        if (!notes || !description || completed == null || !project_id) {
            res.status(400).json({
                message: 'Required field is missing'
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "The action information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
}

module.exports = {
    validateActionId,
    validateActionBody
}