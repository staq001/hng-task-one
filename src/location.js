const geoip = require('geoip-lite');
const { OpenWeatherAPI } = require("openweather-api-node")

// function location(ip) {
//   const geo = geoip.lookup(ip)

//   return geo.city;
// }

async function location(ip) {
  try {
    const url = `https://ipinfo.io/${ip}?token=${process.env.IP_KEY}`;
    const response = await fetch(url);
    const locale = await response.json();
    return locale.city;
  } catch (err) {
    throw err;
  }
}

async function weatherFunc(location) {
  let temp;
  let weather = new OpenWeatherAPI({
    key: process.env.WEATHER_APIKEY, // hide
    locationName: location,
    units: "imperial"
  })

  const current = await weather.getCurrent().then(async data => {
    temp = data.weather.temp;
    tempInCelsius = Math.round((temp.cur - 32) * (5 / 9) * 100) / 100;
    return tempInCelsius;
  })
  return current;
}



module.exports = { location, weatherFunc };