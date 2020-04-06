const express = require('express')

const actionRouter = require('../api/action-router')
const projectRouter = require('../api/project-router')

const server = express()
server.use(express.json())

server.use('/action', actionRouter)
server.use('/project', projectRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Error retrieving the data"
  })

})
module.exports = server
