const Data = require('../models/data.model')

createEntry = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an entry',
        })
    }

    const data = new Data(body)

    if (!data) {
        return res.status(400).json({success: false, error: err})
    }

    data
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: data._id,
                message: 'Entry added',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Entry not added',
            })
        })
}

updateEntry = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Body must be provided to update',
        })
    }

    Data.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Entry not found',
            })
        }
        data.key = body.key
        data.time = body.time
        data.value = body.value
        data
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: data._id,
                    message: 'Entry updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Entry not updated!',
                })
            })
    })
}

deleteEntry = async (req, res) => {
    await Data.findOneAndDelete({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!data) {
            return res
                .status(404)
                .json({success: false, error: `Entry not found`})
        }

        return res.status(200).json({success: true, data})
    }).catch(err => console.log(err))
}

getEntryById = async (req, res) => {
    await Data.findOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, data})
    }).catch(err => console.log(err))
}

getEntries = async (req, res) => {
    await Data.find({}, (err, datas) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!datas.length) {
            return res
                .status(200)
                .json({success: false, error: `Entries not found`})
        }
        return res.status(200).json({success: true, data: datas})
    }).catch(err => console.log(err))
}

module.exports = {
    createEntry,
    updateEntry,
    deleteEntry,
    getEntries,
    getEntryById,
}
