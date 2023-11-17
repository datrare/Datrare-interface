const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'test__datrare_db'
});
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'datriuax_datriuax',
//   password: 'DE}]6g!WE)0+',
//   database: 'datriuax_datrare'
// });

module.exports = db;