const express = require('express')
const actionDb = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', async(req, res, next) => {
  try {
    const action = await actionDb.get()
    res.json(action)
  } catch(err) {
      next(err)
  }  
})

router.get('/:id', async (req, res, next) => {
  try {
    const action = await actionDb.get(req.params.id)
    if (action) {
      res.json(action)
    } else {
        res.status(400).json({
          message: "The project with the ID does not exist"
        })
    }
  } catch(err) {
    next(err)
  }  
})

router.post('/', validateAction, async(req, res, next) => {
  try {
    const action = await actionDb.insert(req.body)
    res.status(201).json(action)
  } catch(err) {
      next(err)
  }  
})

router.delete('/:id', async(req, res, next) => {
  try {
    const action = await actionDb.remove(req.params.id)
    if(action > 0) {
      return res.status(204).json({ message: "The poject has been deleted" })
    } else {
        res.status(404).json ({
          message: "The action with the ID does not exist"
        })
    }
  } catch(err){
      next(err)
  }
})

router.put('/:id', validateAction, async(req, res, next) => {
  const changes = req.body;
  try {
    const action = await actionDb.update(req.params.id, changes)
    if(action) {
      return res.json(action)
    } else {
        res.status(404).json({
          message: "The action with the ID does not exist"
        })
    }
  } catch(err) {
      next(err)
  }
})


function validateAction(req, res, next) {
  if(!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing data"})
  } else {
    next();
  }
}

module.exports = router