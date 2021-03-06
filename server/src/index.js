const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);
const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);
const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);

const db = require('../models');
db.sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			`Server is running on port ${PORT}`;
		});
	})
	.catch((err) => console.error(err));
