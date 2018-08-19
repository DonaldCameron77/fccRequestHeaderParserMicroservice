const express = require('express');

const parseHeader = require('./parseHeader');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  const message = 'GET request received on \'/\' route';
  res.send(message);
});

app.get('/api/whoami', (req, res) => {
  res.send(parseHeader.mapHeaderInfoToJSON(req));
});

app.listen(port, () => console.log(`Request Header Parser API app listening on port ${port}`));

