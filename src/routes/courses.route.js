const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/CourseController.js')

router.patch('/:id/restore', courseController.restore)
router.delete('/:id/force', courseController.forceDelete)
router.delete('/:id', courseController.delete)
router.post('/handleChooseAllInTrash', courseController.handleChooseAllInTrash)
router.post(
    '/handleChooseAllInCourses',
    courseController.handleChooseAllInCourses,
)
router.put('/:id', courseController.update)
router.get('/:id/edit', courseController.edit)
router.post('/store', courseController.store)
router.get('/create', courseController.create)
router.get('/:slug', courseController.show)
router.get('/', courseController.index)

module.exports = router
