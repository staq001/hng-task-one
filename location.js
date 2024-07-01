const geoip = require('geoip-lite');

function location(ip) {
  const geo = geoip.lookup(ip)

  return geo.city;
}

module.exports = location;