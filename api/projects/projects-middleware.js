// add middlewares here related to projects
const Project = require('./projects-model')


function logger(req, res, next) {
    // DO YOUR MAGIC
    console.log(
      console.log(`Time Stamp: ${new Date().toISOString()}, Request Method: ${req.method}, Request URL: ${req.url}`)
    );
  
    next();
  }

  async function validateProjectId(req, res, next) {
    // DO YOUR MAGIC
    try {
      const possibleProject = await Project.get(req.params.id)
      if (!possibleProject) {
        res.status(404).json({ message: "user not found" })
      } else {
        req.user = possibleProject
        next()
      }
    } catch (err) {
      // res.status(500).json({ message: "Wrong" })
      next(err)
    }
  }

  async function validProjectsBody(req, res, next) {
    try {
        const {name, description, completed} = req.body
        if(!name || !description){
            res.status(400).json({ message: "Please provide name or description for the projects" })
        }else{
            next()
        }
    } catch (err) {
      // res.status(500).json({ message: "Wrong" })
      next(err)
    }
  }


  module.exports ={
    logger,
    validateProjectId,
    validProjectsBody,
  }