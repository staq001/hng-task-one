const express = require('express');
const { location } = require("./location.js")
const { weatherFunc } = require("./location.js")

const app = express();

const port = process.env.PORT || 3000;

app.set('trust-proxy', true);

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    <p>Navigate your way <a href=https://${req.hostname}/api/hello?name=Insert_name target="_blank">here</a> to get a greeting!</p>
    `);
})

app.get('/api/hello', async (req, res) => {
  try {
    const { visitor_name } = req.query;
    const client_ip = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const locale = location(client_ip)

    res.send({
      client_ip,
      location: location('102.88.36.60'),
      greeting: `Hello, ${visitor_name}!, the temperature is ${await weatherFunc(locale)} in ${locale}`
    })
  } catch (err) {
    res.send({ status: "failed", error_msg: err.message });
  }
})



app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
})