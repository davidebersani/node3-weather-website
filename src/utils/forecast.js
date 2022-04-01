const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=4b715535f7c84fd27e8040f2187c4342&query=" + long + "," + lat
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service!")
        } else if (body.error) {
            callback("Error (" + body.error.code + "): " + body.error.info)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast