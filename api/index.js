const express = require('express');
const { location } = require("../src/location.js")
const { weatherFunc } = require("../src/location.js")

const app = express();

const port = process.env.PORT || 3000;

app.set('trust-proxy', true);

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    <p>Navigate your way <a href=https://${req.hostname}/api/hello?visitor_name=Insert_name target="_blank">here</a> to get a greeting!</p>
    `);
})

app.get('/api/hello', async (req, res) => {
  try {
    const { visitor_name } = req.query;
    const client_ip = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const city = location(client_ip)
    const temp = await weatherFunc(city)

    res.send({
      client_ip,
      location: city,
      greeting: `Hello, ${visitor_name}!, the temperature is ${temp} in ${city}`
    })
  } catch (err) {
    res.send({ status: "failed", error_msg: err.message });
  }
})



app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
})
