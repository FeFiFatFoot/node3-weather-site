const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')





// express is a funtion, not an object
// Here app gives us access to the function

const app = express()
const port = process.env.PORT || 3000

// both the above come from the node wrapper, the same "require" comes from 
// console.log(__dirname) // expect C:\Users\Private\code\nodecourse\mod3\web-server\src
// console.log(__filename) //  expect C:\Users\Private\code\nodecourse\mod3\web-server\src\app.js

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ----- Setup handlebars engine and views location
// set up handlebars - tell express which templating engine is installed
// case and space sensitive
// requires views to live in a specific template named "views" in the root directory by default - it can be changed, see viewsPath
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



// what to do when someone visits our set route "app.get(route, whatToDoFunction(request, response))"


app.get('', (req, res) => {
    // allows us to render a view like an hbs template
    res.render('index', {
        title: 'Weather Homes',
        name: 'Big James'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Big James'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        message: 'Let us help you help us help yourself',
        name: 'Big James'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Address required bro!')
    }

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send("No such place brozif" + { error })
            }
            if (!error) {
                forecast(latitude, longitude, location, (error, forecastData = {}) => {
                    if (error) {
                        return res.send("No such place buddy" + { error })
                    }
                    res.send({
                    location: forecastData.location,
                    temp: forecastData.degreesCelcius,
                    sky: forecastData.description,
                    error: error
                })
            })
            }
            
        })
    }
    )

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        message: 'Please try another search topic',
        name: 'Jimmy james'
    })
})

// the 404 page handler must be after all others because it will check all other routes before it first
app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        message:'Wrong page',
        name: 'Jimmy jams'
    })
})

// listen is only used once and it starts up the server on a given port
app.listen(port, () => {
    console.log('Server running on port ' + port)
})