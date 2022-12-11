const express = require('express');
const api = require('../Controllers/UnitApiController.js');

const unitRouter = express.Router();
unitRouter.param('id', api.checkID);
unitRouter
	.route('/:id')
	.get(api.getUnit)
	.delete(api.deleteUnit)
	.patch(api.updateUnit);
unitRouter.route('/').get(api.getAllUnits).post(api.checkBody, api.createUnit);
module.exports = unitRouter;
