const Course = require('../models/Course.js')

class CourseController {
    // [GET] /courses
    index(req, res, next) {
        res.send('Courses page')
    }

    // [GET] /courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({
                slug: req.params.slug,
            }).lean()
            res.render('courses/course', { course })
        } catch (err) {
            next(err)
        }
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            req.body.thumbnail = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
            const newCourse = new Course(req.body)
            await newCourse.save()
            res.redirect('/')
        } catch (err) {
            next(err)
        }
    }

    // [GET] /:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean()
            res.render('courses/edit', { course })
        } catch (err) {
            next(err)
        }
    }

    // [PUT] /:id
    async update(req, res, next) {
        try {
            await Course.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/me/stored/courses')
        } catch (err) {
            next(err)
        }
    }

    // [DELETE] /:id
    async delete(req, res, next) {
        try {
            await Course.findByIdAndDelete(req.params.id)
            res.redirect('back')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CourseController()
