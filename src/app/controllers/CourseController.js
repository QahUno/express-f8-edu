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
            res.redirect('/me/stored/courses')
        } catch (err) {
            next(err)
        }
    }

    // [GET] courses/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean()
            res.render('courses/edit', { course })
        } catch (err) {
            next(err)
        }
    }

    // [PUT] courses/:id
    async update(req, res, next) {
        try {
            await Course.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/me/stored/courses')
        } catch (err) {
            next(err)
        }
    }

    // [DELETE] courses/:id
    async delete(req, res, next) {
        await Course.deleteById(req.params.id)
        res.redirect('back')
    }

    // [DELETE] courses/:id/force
    async forceDelete(req, res, next) {
        await Course.findByIdAndDelete(req.params.id)
        res.redirect('back')
    }

    // [PATCH] courses/:id/restore
    async restore(req, res, next) {
        await Course.restore({ _id: req.params.id })
        res.redirect('back')
    }

    // [POST] courses/handleChooseAllInCourses
    async handleChooseAllInCourses(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                await Course.delete({ _id: { $in: req.body.courseIds } })
                res.redirect('back')
                break
            default:
                res.send('Invalid action!')
        }
    }

    // [POST] courses/handleChooseAllInTrash
    async handleChooseAllInTrash(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                await Course.restore({ _id: { $in: req.body.courseIds } })
                res.redirect('back')
                break
            case 'delete':
                await Course.deleteMany({ _id: { $in: req.body.courseIds } })
                res.redirect('back')
                break
            default:
                res.send('Invalid action!')
        }
    }
}

module.exports = new CourseController()
