const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/log', (req, res) => {
  const name = req.body.name || 'Unknown';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();

  const log = `${name}, ${timestamp}, ip: ${ip}\n`;

  fs.appendFile('logs.txt', log, err => {
    if (err) {
      console.error('Error writing to log file:', err);
      return res.status(500).send('Failed to log');
    }
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Game server running at http://localhost:${PORT}`);
});
