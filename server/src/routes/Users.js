const express = require('express');
const router = express.Router();
const { Users } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
	const { username, password } = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			username: username,
			password: hash,
		});
		res.json('SUCCESS');
	});
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	// NOTE: Check to see if the user exist.
	const user = await Users.findOne({ where: { username: username } }); // Filtering results using where.

	if (!user) res.json({ error: "User Doesn't Exist" });

	bcrypt.compare(password, user.password).then((match) => {
		if (!match) res.json({ error: 'Wrong Username And Password Combination' });

		res.json('YOU LOGGED IN!!!');
	});
});

module.exports = router;
