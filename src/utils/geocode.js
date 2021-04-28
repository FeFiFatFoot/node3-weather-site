const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent() was implimented to deal with any special characters that may be part of the address
    // without it a special char will break the url.  e.g. '?' becomes '%3f'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamltbXlqYWxvcGVydGEiLCJhIjoiY2trcW5oYmJxMG9qbDJ2czFoeG8xa2M4eiJ9.LbxQoJhaU6Z6wcTwjb7IsA&limit=1'
    request({ url: url, json: true }, (error, {body} = {}) => {
      if (body.features[0] === undefined) {
        return callback(error)
      }  else {
        const {bbox, text} = body.features[0]
        if (error) {
            return callback('Unable to connect to location services')
            
        } else if (body.features[0] === [] || body.features[0] === undefined) {
            return callback("Unable to find location")
          
        } else {
            // console.log(response.body.features[0].text)
            callback(undefined, {
                latitude: bbox[0],
                longitude: bbox[1],
                location: text
            })
        }
      }

    })
}

module.exports = geocode