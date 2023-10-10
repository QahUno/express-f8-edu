function sortMiddleware(req, res, next) {
    res.locals._sort = {
        type: 'default',
    }
    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            type: req.query.type,
            field: req.query.field,
        })
    }

    next()
}

module.exports = sortMiddleware
