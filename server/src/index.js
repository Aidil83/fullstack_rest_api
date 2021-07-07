const express = require('express');
const cors = require('cors');
const db = require('../models');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.get('/', (req, res) => {
	res.json("It's working");
});

db.sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			`Listening to port ${PORT}`;
		});
	})
	.catch((err) => console.error(err));
