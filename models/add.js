const {Schema, model} = require('mongoose')

const task = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    date: {
        type: Number
    },
    complete: {
        type: Boolean
    }
})
module.exports = model('Task', task)