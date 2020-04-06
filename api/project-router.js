const express = require('express')
const projectDb = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/', async(req, res, next) => {
  try {
    const project = await projectDb.get()
    res.json(project)
  } catch(err) {
      next(err)
  }  
})

router.get('/:id', async (req, res, next) => {
  try {
    const project = await projectDb.get(req.params.id)
    if (project) {
      res.json(project)
    } else {
        res.status(400).json({
          message: "The project with the ID does not exist"
        })
    }
  } catch(err) {
    next(err)
  }  
})

router.get('/:id/actions', async (req, res, next) => {
  try {
    const action = await projectDb.getProjectActions(req.params.id)
    if (action) {
      res.json(action)
    } else {
        res.status(400).json({
          message: "The action with the ID does not exist"
        })
    }
  } catch(err) {
    next(err)
  }  
})

router.post('/', validateProject, async(req, res, next) => {
  try {
    const project = await projectDb.insert(req.body)
    res.status(201).json(project)
  } catch(err) {
      next(err)
  }  
})


router.delete('/:id', async(req, res, next) => {
  try {
    const project = await projectDb.remove(req.params.id)
    if(project > 0) {
      return res.status(204).json({ message: "The poject has been deleted" })
    } else {
        res.status(404).json ({
          message: "The project with the ID does not exist"
        })
    }
  } catch(err){
      next(err)
  }
})

router.put('/:id', validateProject, async(req, res, next) => {
  const changes = req.body;
  try {
    const project = await projectDb.update(req.params.id, changes)
    if(project) {
      return res.json(project)
    } else {
        res.status(404).json({
          message: "The project with the ID does not exist"
        })
    }
  } catch(err) {
      next(err)
  }
})


function validateProject(req, res, next) {
  if(!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing data"})
  } else {
    next();
  }
}

module.exports = router