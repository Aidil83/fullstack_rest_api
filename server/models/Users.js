module.exports = (sequelize, Datatypes) => {
	const Users = sequelize.define('Users', {
		username: {
			type: Datatypes.STRING,
			allowNull: false,
		},
		password: {
			type: Datatypes.STRING,
			allowNull: false,
		},
	});

	Users.associate = (models) => {
		// Each user has many posts.
		Users.hasMany(models.Posts),
			{
				onDelete: 'cascade',
			};
	};
	return Users;
};
