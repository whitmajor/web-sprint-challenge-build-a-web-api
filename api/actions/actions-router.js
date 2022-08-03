// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model.js')
const { validateActionId, validateActionBody } = require('./actions-middlware')

const router = express.Router()

// [GET] /api/actions

router.get("/", async (req, res, next) => {
    // http get :9000/api/actions -v
    // res.send("TEST: Returns an array of all the actions objects contained in the database")

    Action.get()
        .then(action => {
            if(!action){
                res.send([])
            }else{
                res.status(200).json(action)
            }
        }).catch(next)
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res, next)=>{
    // http get :9000/api/actions/1 -v
    // res.json("TEST: req user actions by id")

    Action.get(req.params.id)
        .then(action =>{
            if(!action){
                res.status(404).json({ message: "The action with the specified ID does not exist" })
            }else{
                res.status(200).json(action)
            } 
        }).catch(next)
});
// [POST] /api/actions
router.post('/', async(req, res, next)=>{
    // http post :9000/api/actions  project_id=2 description=fff notes=ffffff  completed=false -v
    // res.json("TEST: create by endpoint")
    // Action.insert(req.body)
    //     .then(action=>{
    //         if(!action){
    //             res.status(404).json({ message: "Please provide name and description for the projects" })
    //         }else{
    //             res.status(201).json(action)
    //         }  
    //     }).catch(next)

    try{
        const {project_id, description, notes, completed} = req.body
        if(!project_id || !description || !notes){
            res.status(400).json({ message: "Please provide name or description for the projects" })
        }else{
            const action =  await Action.insert({project_id, description, notes, completed})
            res.status(201).json(action)
        }  
    }catch(err){
        next(err)
        // res.status(500).send('ERROR')
    }
});
router.put('/:id', validateActionId, validateActionBody, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})
// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res, next)=>{
    // http delete :9000/api/actions/7  -v
    // res.json('test delete by endpoint')

    try{
        const action = await Action.get(req.params.id) 
        const deleteAction = await Action.remove(req.params.id)
        res.status(200).json(action)
    }catch(err){
        next(err)
    }

});
module.exports = router