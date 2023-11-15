const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
        key: {type: String, required: true},
        time: {type: String, required: true},
        value: {type: Number, required: true},
    },
    {timestamps: true},
)

const data = mongoose.model('data', dataSchema)

module.exports = data;