const dbQuery = require('./database/Queries');

module.exports = {
	/************************ CHECK BODY MIDDLEWARE ****************************/
	checkBody: (req, res, next) => {
		if (
			typeof req.body.gene === 'undefined' ||
			typeof req.body.owner === 'undefined' ||
			typeof req.body.name === 'undefined'
		) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid ID',
			});
		}
		next();
	},

	/********************* CHECKS ID-INBOUNDS MIDDLEWARE *********************/
	checkID: async (req, res, next, val) => {
		let max;
		try {
			max = await dbQuery('SELECT MAX(id) FROM nftunit');
		} catch (err) {
			return res.status(400).json({
				status: 'fail',
				data: {
					message: 'Failed to fetch data.',
				},
			});
		}
		max = max[0]['MAX(id)'];
		const id = req.params.id * 1;
		if (id > max || id < 1 || Number.isNaN(id)) {
			return res.status(404).json({
				status: 'fail',
				message: 'Invalid ID',
			});
		}
		next();
	},

	/************************ GETUNIT CONTROLLER ****************************/
	//get /id
	getUnit: async (req, res) => {
		try {
			const id = req.params.id * 1;
			const query = await dbQuery(
				`Select * FROM nftunit WHERE id = ${id}`,
				res
			);
			res.status(200).json({
				status: 'success',
				data: {
					units: query,
				},
			});
		} catch (err) {
			return res.status(400).json({
				status: 'fail',
				data: {
					message: 'Failed to fetch data.',
				},
			});
		}
	},

	/********************** GET ALL UNITS CONTROLLER *************************/
	//get /
	getAllUnits: async (req, res) => {
		try {
			const query = await dbQuery(`Select * FROM nftunit`);
			res.status(200).json({
				status: 'success',
				data: {
					units: query,
				},
			});
		} catch (err) {
			return res.status(400).json({
				status: 'fail',
				data: {
					message: 'Failed to fetch data.',
				},
			});
		}
	},

	/************************* UPDATE UNIT CONTROLLER ****************************/
	//patch /id			UNFINISHED
	updateUnit: (req, res) => {
		res.status(200).json({
			status: 'success',
			data: {
				message: 'Api not built.',
			},
		});
	},

	/************************* CREATE UNIT CONTROLLER ****************************/
	//post  /
	createUnit: async (req, res) => {
		try {
			await dbQuery(
				`INSERT INTO nftunit
				(gene, 
				owner, 
				name, 
				exp)
			VALUES 
				(${req.body.gene}, 
				'${req.body.owner}', 
				'${req.body.name}', 
				${0})
			`
			);
		} catch (err) {
			return res.status(400).json({
				status: 'fail',
				data: {
					message: 'Failed to add NFT to database.',
				},
			});
		}
		res.status(200).json({
			status: 'success',
			data: {
				message: 'Added NFT to database',
			},
		});
	},

	/************************ DELETE UNIT CONTROLLER ****************************/
	//delete /id			UNFINISHED
	deleteUnit: (req, res) => {
		res.status(200).json({
			status: 'success',
			data: {
				message: 'Api not built.',
			},
		});
	},
};
