const siteRouter = require('./site.route.js')
const newsRouter = require('./news.route.js')

function route(app) {
  app.use('/news', newsRouter)
  app.use('/', siteRouter) // home, search, contact, etc.
}

module.exports = route
