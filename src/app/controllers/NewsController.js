class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news')
    }

    // [GET] /news/:slug
    slug(req, res) {
        res.send('Details')
    }
}

module.exports = new NewsController()
