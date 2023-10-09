const Course = require('../models/Course.js')

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const myCourses = await Course.find({}).lean()
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
