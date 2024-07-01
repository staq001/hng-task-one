const express = require('express');
const location = require("./location.js")

const app = express();

const port = process.env.PORT || 3000;

app.set('trust-proxy', true);

app.use(express.json())

app.get('/api/hello', async (req, res) => {
  const match = {};
  const client_ip = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress

  if (req.query.visitor_name) {
    match.visitor_name = req.query.visitor_name;
  };

  res.send({
    client_ip,
    location: location(client_ip),
    greeting: `Hello, ${match.visitor_name}!`
  })
})



app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
})