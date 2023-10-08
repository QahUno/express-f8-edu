const Course = require('../models/Course.js')

class MeController {
    // [GET] stored/courses
    async storedCourses(req, res, next) {
        try {
            const myCourses = await Course.find({}).lean()
            res.render('me/storedCourses', { myCourses })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new MeController()
