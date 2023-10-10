const Course = require('../models/Course.js')

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        // toi uu hay bo vao ham sau
        try {
            let myCourses = await Course.find({}).lean()
            if (req.query.hasOwnProperty('_sort')) {
                myCourses = await Course.find({})
                    .sort({
                        [req.query.field]: req.query.type,
                    })
                    .lean()
            }
            const trashCount = await Course.countWithDeleted({ deleted: true })
            res.render('me/storedCourses', {
                myCourses,
                trashCount,
            })
        } catch (err) {
            next(err)
        }
    }

    // [GET] /me/trash/courses
    async trashCourses(req, res, next) {
        try {
            const deletedCourses = await Course.findWithDeleted({
                deleted: true,
            }).lean()
            const coursesCount = await Course.count({})
            res.render('me/trashCourses', {
                deletedCourses,
                coursesCount,
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new MeController()
