require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.body.token && req.body.token.split(' ')[1];
	if (token === undefined) {
		return res.status(401).json({
			status: 'fail',
			message: 'no token sent',
		});
	}
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({
				status: 'fail',
				message: 'cannot authenticate',
			});
		}
		req.user = user;
		next();
	});
};
