const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

//setting up our configuration
dotenv.config({ path: './config.env' });
const { port } = process.env;

//EXPRESS V-4.17.1
const app = express();

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

//ROTUES
const unitRouter = require('./Router/UnitApiRouter.js');
const authRouter = require('./Router/AuthRouter.js');

//LANDING PAGE
const landing = (req, res) => {
	res.status(200).sendFile(`${__dirname}/Private/html/HeaderTemplate.html`);
};
app.get('/', landing);

//API
//test url(put this in browser
//http://127.0.0.1:8000/api/v1/units/1
app.use('/api/v1/units', unitRouter);
app.use('/auth/v1', authRouter);

//
//
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(
		`App running on port: ${port}\nRunning in ${process.env.NODE_ENV} mode`
	);
});
