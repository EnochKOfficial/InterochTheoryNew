const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(morgan('tiny'));

// Serve the root /app directory statically so index.html at /app is accessible
const rootDir = path.resolve(__dirname, '..');
app.use(express.static(rootDir, { extensions: ['html'] }));

// Fallback to index.html for any unknown path
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running at http://0.0.0.0:${PORT}`);
});