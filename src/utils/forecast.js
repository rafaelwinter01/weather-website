const request = require('postman-request')
const { forecast_api_key } = require('./constants')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + 
        forecast_api_key + 
        '&query=' + longitude +','+  latitude + '&units=f'

    request({ url, json: true},(error, { body })=>{
        if(error){
            callback('Unable to connect to weather services')
        } else if(body.error){
            callback('Unable do find location')
        } else {
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                weatherDegress: `It is currently ${ body.current.temperature } degress out. It feels like ${ body.current.feelslike } degress out in ${ body.location.name }`,
                weatherIcon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast

// const urlWeather = 'http://api.weatherstack.com/current?access_key=012633c954be0a1da35b7283d2aa9e9b&query=37.8267,-122.4233&units=s'

// request({ url: urlWeather, json: true },(error, response)=>{
//     if(error){
//         console.log(`Unable to connect`)
//     } else if(response.body.error){
//         console.log(`Unable find location`)
//     } else {
//         console.log(response.body.current.weather_descriptions[0])
//         console.log(`It is currently ${ response.body.current.temperature } degress out. It feels like ${ response.body.current.feelslike } degress out`)
//     }
// })