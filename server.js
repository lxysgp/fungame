const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - IP: ${ip}\n`;

  // Append to logs.txt
  fs.appendFile('logs.txt', log, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });

  // Send IP and timestamp to browser
  res.send(`
    <html>
      <head>
        <title>IP Recorder</title>
        <style>
          body { background-color: #111; color: #0f0; font-family: monospace; text-align: center; margin-top: 100px; }
        </style>
      </head>
      <body>
        <h1>IP Recorder</h1>
        <p>Your IP: <strong>${ip}</strong></p>
        <p>Timestamp: <strong>${timestamp}</strong></p>
      </body>
    </html>
  `);
});

// Optional: download logs
app.get('/download-log', (req, res) => {
  res.download('logs.txt');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
