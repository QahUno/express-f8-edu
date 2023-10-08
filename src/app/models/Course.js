const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const Course = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, maxLength: 200 },
        videoId: { type: String, required: true },
        level: { type: String, default: 'Cơ bản' },
        slug: { type: String, slug: 'name', unique: true },
        thumbnail: { type: String },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Course', Course)
