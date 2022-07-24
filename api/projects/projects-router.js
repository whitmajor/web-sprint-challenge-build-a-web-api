// Write your "projects" router here!
// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model.js')
const { validateProjectId, validProjectsBody } = require('./projects-middleware')

const router = express.Router();

// [GET]   /api/projects
router.get("/", async (req, res, next) => {
    // http get :9000/api/projects -v
    // res.send("TEST: Returns an array of all the post objects contained in the database")
  
    // try {
    //     const project = await Project.get();
    //     if(!project){
    //         res.send([])
    //     }else{
    //         res.status(200).json(project)
    //     }
    // } catch (err) {
    //     next(err)
    // //   res.status(500).json({ message: "The posts information could not be retrieved" });
    // }
    Project.get()
    .then(project=>{
        if(!project){
            res.send([])
        }else{
            res.status(200).json(project)
        }
    }).catch(next)

  });

// [GET]   /api/projects/:id
router.get('/:id', validateProjectId, async (req, res, next)=>{
  // http get :9000/api/projects -v ; get id
  // http get :9000/api/projects/1 -v
  // res.json("TEST: req user projects by id")

//   try{
//     const project = await Project.get(req.params.id);
//     res.status(200).json(project)
//   }catch(err){
//       next(err)
//   }
  Project.get(req.params.id)
    .then(project=>{
        res.status(200).json(project)
    }).catch(next)
})

// [POST]   /api/projects
router.post('/', validProjectsBody, async(req, res, next)=>{
    // http post :9000/api/projects  name=ff description=fff completed=false  -v
    // res.json("TEST: create by endpoint")
    
    // Project.insert(req.body)
    //     .then(project=>{
    //         if(!name || !description){
    //             res.status(400).json({ message: "Please provide name and description for the projects" })
    //         }else{
    //             res.status(201).json(project)
    //         }  
    //     }).catch(next)
    
        try{
            // const {name, description, completed} = req.body
            // if(!name || !description){
            //     res.status(400).json({ message: "Please provide name or description for the projects" })
            // }else{
            //     const project =  await Project.insert({name, description, completed})
            //     res.status(201).json(project)
            // }  
            const project =  await Project.insert(req.body)
            res.status(201).json(project)
        }catch(err){
            next(err)
            // res.status(500).send('ERROR')
        }

})

// [PUT] /api/projects/:id
router.put('/:id', validateProjectId, validProjectsBody, async (req, res, next)=>{

    try{
       
        const project =  await Project.update(req.params.id, req.body)
        res.status(400).json(project)
    }catch(err){
        next(err)
        
    }


})

// [DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next)=>{
    // http delete :9000/api/projects/15  -v
    // res.json('test delete by endpoint')

    // Project.remove(req.params.id)
    //     .then(project=>{
    //         res.status(200).json(project)
    //     }).catch(next)
    try {
        const project = await Project.get(req.params.id)

        // if(!project){
        //     res.status(404).json({ message: "The post with the specified ID does not exist" })
        // }else {
        //     const deletePorject = await Project.remove(req.params.id)
        //     res.status(200).json(project)
        // }
        const deletePorject = await Project.remove(req.params.id)
        res.status(200).json(project)
    }catch(err){
        next(err)
    }
})


// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next)=>{
    // http get :9000/api/projects/3/actions  -v
    // res.json('test get api/users/3/post  by endpoint')

    try{
        const { id } = req.params
        const action = await Project.getProjectActions(id)
        res.status(200).json(action)
    }catch(err){
        next(err)
    }
})
module.exports = router