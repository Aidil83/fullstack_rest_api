const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const db = require('../models');
db.sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			`Server is running on port ${PORT}`;
		});
	})
	.catch((err) => console.error(err));
