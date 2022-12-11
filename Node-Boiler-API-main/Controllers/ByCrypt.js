const bcrypt = require('bcrypt');

const ByeCrypt = {
	//hashes password
	hashPassword: (password) => {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, 10, function (err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	},
	//compares the password, to the hashed password
	compareHash: (password, hashedPW) => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, hashedPW, (err, result) => {
				if (err) {
					reject(err);
				}
				if (result) {
					resolve(result);
				} else {
					reject(result);
				}
			});
		});
	},
};
module.exports = ByeCrypt;
