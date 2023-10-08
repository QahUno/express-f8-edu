const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const route = require('./routes/index.route.js')
const db = require('./config/db/index.js')
const methodOverride = require('method-override')

const app = express()
const port = 3000

// connect to db
db.connnect()

// method override
app.use(methodOverride('_method'))

// body parser
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// set static path
app.use(express.static(path.join(__dirname, 'public')))

// hbs template engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// route
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
