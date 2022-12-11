
const dbQuery = require('./database/Queries');

//password regex;
//Minimum eight characters,
//atleast 1 number
//atleast 1 capitol letter
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//email regex;
//Checks for a valid email:
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//username regex;
//only letters and numbers, has to b 3 to 16 characters
const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;

module.exports = async (req, res, next) => {
	if (
		typeof req.body.email === 'undefined' ||
		typeof req.body.password === 'undefined' ||
		typeof req.body.username === 'undefined'
	) {
		return res.status(404).json({
			status: 'fail',
			message: 'Missing Information',
		});
	}
	if (!passwordRegex.test(req.body.password)) {
		return res.status(404).json({
			status: 'fail',
			message: 'Incorect password',
		});
	}
	if (!emailRegex.test(req.body.email)) {
		return res.status(404).json({
			status: 'fail',
			message: 'Incorect email',
		});
	}
	if (!usernameRegex.test(req.body.username)) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid Username',
		});
	}
	const results = await dbQuery(
		`SELECT * FROM users WHERE email = '${req.body.email}'`
	);
	if (results[0]) {
		return res.status(404).json({
			status: 'fail',
			message: 'Already account with this email',
		});
	}
	next();
};
