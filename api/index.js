const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const entriesRouter = require('./routes/entries-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'Error connecting MongoDB.'))

app.use('/api', entriesRouter)

app.listen(apiPort, () => console.log(`Server is running and listening on port ${apiPort}`))
