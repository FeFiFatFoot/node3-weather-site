const request = require('request');

const forecast = (latitude,longitude,location, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+ location + "&units=metric&APPID=77468326ca9c1e0041249d598baab1a0"

    request({ url : url, json : true }, (error, response) => {
        if (response.body.main === undefined) {
            return callback(error)
        }
        const {cod, message, main} = response.body;
        const {temp} = main;
        const {description} = response.body.weather[0]
        if (error) {
            // console.log("Unable to connect to weather service!")
            callback('Unable to connect to weather service!', undefined)
        } else if (cod !== 200) {
            callback(message, undefined)
            // console.log(response.body.message)
        } else {
            callback(undefined, {
                degreesCelcius:temp,
                description,
                location: location
            })
            // console.log(`It is currently ${response.body.main.temp} degrees out. We have${!response.body.weather[0].description.includes("a")?"a":""} ${response.body.weather[0].description}`)     
        }
    
    })    
}

module.exports = forecast