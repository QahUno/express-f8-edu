const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongoose_delete = require('mongoose-delete')

const Schema = mongoose.Schema

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

mongoose.plugin(slug)
Course.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
})

module.exports = mongoose.model('Course', Course)
