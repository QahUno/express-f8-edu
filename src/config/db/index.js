const mongoose = require('mongoose')

async function connnect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_edu_dev')
        console.log('Connected to database successfully!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = { connnect }
