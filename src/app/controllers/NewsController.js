class NewsController {
  index(req, res) {
    res.render('news')
  }
  slug(req, res) {
    res.send('Details')
  }
}

module.exports = new NewsController