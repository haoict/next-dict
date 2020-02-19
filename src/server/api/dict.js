const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { logger } = require('../../helpers/logger');
const enviFile = path.join(__dirname, '../static/data/En_Vi.db');
const vienFile = path.join(__dirname, '../static/data/Vi_En.db');

module.exports = router;

// Init: load data from db files
let isDBLoaded = false;
let enviDb;
let vienDb;
function loadData() {
  try {
    enviDb = new sqlite3.Database(enviFile, sqlite3.OPEN_READONLY, err => {
      if (err) throw err;
      logger.log('info', 'Connected to the en_vi database.');
    });

    vienDb = new sqlite3.Database(vienFile, sqlite3.OPEN_READONLY, err => {
      if (err) throw err;
      logger.log('info', 'Connected to the vi_en database.');
    });

    isDBLoaded = true;

    // close the database connection
    // enviDb.close();
    // enviDb.close();
  } catch (err) {
    isDBLoaded = false;
    logger.log('error', 'Load SQLite Database Failed: %s', err.message);
  }
}
loadData();

function getDbType(type) {
  let db;
  switch (type) {
    case 'envi':
      db = enviDb;
      break;
    case 'vien':
      db = vienDb;
      break;
    default:
      db = enviDb;
  }
  return db;
}

/**
 * GET /api/pokemon/search?key=keyword&type=envi
 * */
router.get('/search', (req, res) => {
  if (!req.query || !req.query.key) {
    return res.send({ result: false, message: 'Empty param' });
  }

  if (!enviDb || !vienDb || !isDBLoaded) {
    return res.send({ result: false, message: 'Internal Server Error' });
  }
  const db = getDbType(req.query.type);

  const key = req.query.key.trim();

  const sql = `SELECT DISTINCT Word FROM Dict WHERE Word LIKE ? ORDER BY Word COLLATE NOCASE ASC LIMIT 50`;

  const data = [];
  try {
    db.all(sql, [key + '%'], (err, rows) => {
      if (err) throw err;

      rows.forEach(row => {
        data.push(row.Word);
      });

      return res.send({ result: true, data });
    });
  } catch (err) {
    logger.log('error', 'Query Failed: %s', err.message);
    return res.send({ result: false, message: 'Internal Server Error' });
  }
});

/**
 * GET /api/word/:key&type=envi
 * */
router.get('/:key', (req, res) => {
  if (!req.params || !req.params.key) {
    return res.send({ result: false, message: 'Empty param' });
  }

  if (!enviDb || !vienDb || !isDBLoaded) {
    return res.send({ result: false, message: 'Internal Server Error' });
  }
  const db = getDbType(req.query.type);

  const key = req.params.key.trim();

  const sql = `SELECT * FROM Dict WHERE Word=? COLLATE NOCASE`;

  const trans = [];
  try {
    db.all(sql, [key], (err, rows) => {
      if (err) throw err;

      rows.forEach(row => {
        trans.push(row.Trans);
      });

      return res.send({ result: true, data: trans });
    });
  } catch (err) {
    logger.log('error', 'Query Failed: %s', err.message);
    return res.send({ result: false, message: 'Internal Server Error' });
  }
});
