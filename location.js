const geoip = require('geoip-lite');
const { OpenWeatherAPI } = require("openweather-api-node")

function location(ip) {
  const geo = geoip.lookup(ip)

  return geo.city;
}



async function weatherFunc(location) {
  let temp;
  let weather = new OpenWeatherAPI({
    key: 'f6dba2e71df78d9729c40da3b5350d01',
    locationName: location,
    units: "imperial"
  })

  const current = await weather.getCurrent().then(async data => {
    temp = data.weather.temp;
    tempInCelsius = Math.round((temp.cur - 32) * (5 / 9) * 100) / 100;
    // console.log(temp.cur);
    return tempInCelsius;
  })
  return current;
}



module.exports = { location, weatherFunc };