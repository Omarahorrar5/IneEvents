// index.js
import db from './db.js';

db.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Connected to DB:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
  });
