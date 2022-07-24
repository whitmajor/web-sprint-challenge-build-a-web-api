const express = require('express');
const {logger} = require('./projects/projects-middleware')
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const  projectsRouter = require('./projects/projects-router.js')
const  actionsRouter = require('./actions/actions-router.js')

server.use(express.json())

server.use(logger);

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use('/', (req, res)=>{
    res.send('Unit 4 Week 1 Sprint Challenge!')
})

server.use((err, req, res, next) => { // eslint-disable-line
    console.log('disaster!')
    res.status(err.status || 500).json({
      message: `The Horror: ${err.message}`,
    })
  })
module.exports = server;
