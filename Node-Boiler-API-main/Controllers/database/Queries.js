/* 
	Queries.js
	our file that we send our mariadb queries too.
*/

const mariadbPool = require('./Maraidb');

const queryDB = async (query) => {
	let results;
	let conn;
	try {
		conn = await mariadbPool.getConnection();
	} catch (err) {
		console.log(err.message);
		return;
	}
	return new Promise((resolve, reject) => {
		try {
			results = conn.query(query);
		} catch (err) {
			console.log(err.message);
			reject(err);
		} finally {
			conn.end();
		}
		if (results !== null) resolve(results);
	});
};

module.exports = queryDB;
