const siteRouter = require('./site.route.js')
const newsRouter = require('./news.route.js')
const coursesRouter = require('./courses.route.js')
const meRouter = require('./me.route.js')

function route(app) {
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)
    app.use('/news', newsRouter)
    app.use('/', siteRouter) // home, search, contact, etc.
}

module.exports = route
