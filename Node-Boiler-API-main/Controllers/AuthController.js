require('dotenv').config();
const jwt = require('jsonwebtoken');
const ByCrypt = require('./ByCrypt');
const hasher = require('./ByCrypt');
const dbQuery = require('./database/Queries');

module.exports = {
	/************************ SIGNUP CONTROLLER ****************************/
	signup: async (req, res) => {
		try {
			const pw = await hasher.hashPassword(req.body.password);
			await dbQuery(
				`INSERT INTO users
               (email, 
               username, 
               password)
             VALUES 
               ('${req.body.email}', 
               '${req.body.username}', 
               '${pw}')
            `
			);
			res.status(200).json({
				status: 'success',
				message: 'You have succesfully created your account',
			});
		} catch (err) {
			res.status(400).json({
				status: 'fatal',
				message: 'Account not created',
			});
		}
	},

	/************************ LOGIN CONTROLLER ****************************/
	login: async (req, res) => {
		let hashedPassword;
		try {
			hashedPassword = await dbQuery(
				`SELECT password FROM users WHERE email = '${req.body.email}'`
			);
		} catch (err) {
			return res.status(400).json({
				status: 'fail',
				message: 'Sorry... something went wrong',
			});
		}
		if (!hashedPassword[0]) {
			return res.status(403).json({
				status: 'fail',
				message: 'Email not found',
			});
		}
		try {
			const results = await ByCrypt.compareHash(
				req.body.password.toString(),
				hashedPassword[0].password.toString()
			);
			if (results) {
				const access = jwt.sign(
					req.body.email,
					process.env.ACCESS_TOKEN_SECRET
				);
				return res.status(200).json({
					status: 'success',
					message: 'You have logged in',
					token: access,
				});
			}
		} catch (err) {
			return res.status(403).json({
				status: 'fail',
				message: 'Incorrect password',
			});
		}
	},
};
