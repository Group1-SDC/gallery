const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
require('newrelic');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

// app.use(morgan('dev')); // clogs up terminal during stress tests
// loader.io verification for stress testing
app.get('/loaderio-431bb85677ec2905b8cf0b7128b20219.txt', (req, res) => {
  res.send('loaderio-431bb85677ec2905b8cf0b7128b20219');
});
app.use('/:id', express.static(PUBLIC_DIR));

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/:id/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
