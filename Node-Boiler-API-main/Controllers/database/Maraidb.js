/* 
	Maraidb.js.js
	connects to our database, and returns a pool.

*/

const mariadb = require('mariadb');

if (process.env.NODE_ENV === 'development') {
	module.exports = mariadb.createPool({
		host: process.env.MARIADB_HOST,
		user: process.env.MARIADB_USER,
		password: process.env.MARIADB_PASSWORD,
		connectionLimit: process.env.MARIADB_CONNECTIONLIMIT,
		port: process.env.MARIADB_PORT,
		database: process.env.MARIADB_DATABASE,
	});
} else {
	module.exports = mariadb.createPool({
		host: '127.0.0.1',
		user: 'root',
		password: '!Ashiestink69$a',
		connectionLimit: 5,
		port: 3306,
		database: 'cryptodungeon',
	});
}
