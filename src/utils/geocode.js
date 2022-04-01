const request = require('postman-request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicm9iMTIiLCJhIjoiY2wxOWR3cnp1MDZwZDNvc2VsNnpubHg2YyJ9.OOJ4BvbAi1OObxqcjK9bZA&language=en&limit=1"

    request({ url, json: true }, (error, response, { features } = {}) => {
        if (error) {
            callback("Unable to connect to geolocation service!")
        } else if (features.length === 0) {
            callback("No location found!")
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode