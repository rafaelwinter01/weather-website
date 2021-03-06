const request = require('postman-request');

const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFmYWVsd2ludGVyMDEiLCJhIjoiY2ttZHdzb3NiMGs4cDJucDJncHU0dXRsNyJ9.WqO-RijWTj7JXyKG-mrkJQ&limit=1'
 
    request({ url: urlGeo, json: true},(error, { body })=>{
        if(error){
             callback('Unable to connect to location services!', undefined)
        } else if(body.features.length===0){
             callback('Unable to find location. Try with another one!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
 }

module.exports = geocode;