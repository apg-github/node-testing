const express = require('express')

const entriesController = require('../controllers/controller')

const router = express.Router()

router.post('/entry', entriesController.createEntry)
router.put('/entry/:id', entriesController.updateEntry)
router.delete('/entry/:id', entriesController.deleteEntry)
router.get('/entry/:id', entriesController.getEntryById)
router.get('/entries', entriesController.getEntries)

module.exports = router
