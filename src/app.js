const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Rafael Winter'
    }) /* sebd to client the handlebars module */
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help page",
        name: "Rafael Winter",
        description: "This is a simple page to call a forecast API. To use it, fill the input button with the place you want to know the weather and click 'Search'"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About",
        name: "Rafael Winter"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "An address must be provided"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if(error){
            return res.send({
                error: "It was not possible to get the coordinates"
            })
        } 
        forecast( latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: "It was not possible to fetch the weather"
                })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*',(req, res)=>{
    res.render('my404', {
        title: "Page not found",
        name: "Rafael Winter",
        message: "Article doesn't exist"
    })
})

app.get('*',(req, res)=>{
    res.render('my404', {
        title: "Page not found",
        name: "Rafael Winter",
        message: "The page you are looking for doesn't exist"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up')
})