/**
 * REQUIRE for Middlewares & Helpers
 */
const express = require('express');
const server = express();
const app = require('./next/getNextApp');
const handle = app.getRequestHandler();
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const envConfig = require('../config/env-config');
const { logger } = require('../helpers/logger');
const cookieParser = require('cookie-parser');

const api_dict = require('./api/dict');

const route_word = require('./routes/word');

/**
 * Necessary headers & middlewares
 */
server.use(helmet());
server.use(compression());
server.use(cookieParser());

/**
 * DEFINE CACHE
 * serve static file with cache, for locales file: 1d, others are 30d
 */
const staticPath = path.join(__dirname, '../../public/static');
server.use(
  '/static',
  express.static(staticPath, {
    maxAge: '30d',
    immutable: true
  })
);

/** DEFINE API
 * serve APIs
 */
server.use('/api/dict', api_dict);

/** DEFINE ROUTES
 * serve web server routes
 */
server.use('/word', route_word);

// handle 404
server.get('*', (req, res) => {
  return handle(req, res);
});

server.listen(envConfig.app.port, err => {
  if (err) throw err;
  logger.log('info', `Web Server listening on port ${envConfig.app.port}`);
});
