const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from current directory with .html extension resolution
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback 404 handler
app.use((req, res) => {
  const notFoundPath = path.join(__dirname, '404.html');
  res.status(404).sendFile(notFoundPath, (err) => {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`EMI Master server running at http://0.0.0.0:${PORT}`);
});
