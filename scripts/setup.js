"use strict";

const mysql = require("mysql");

require("dotenv").config({ silent: true });

const mysqlConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

mysqlConnection.on("error", (error) => {
	console.error(error.stack);
});

mysqlConnection.connect();

mysqlConnection.query(
	"CREATE TABLE IF NOT EXISTS `users` (" +
		"`github_id` int(11) NOT NULL," +
		"`github_login` varchar(64) NOT NULL," +
		"`name` varchar(128) NOT NULL," +
		"`email` varchar(128) NOT NULL," +
		"`timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
		"PRIMARY KEY (`github_id`)" +
	") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	(error) => {
		if (error) {
			console.error(error.stack);
			return mysqlConnection.end(() => process.exit(1));
		}

		console.log("Database setup complete");
		mysqlConnection.end();
	}
);
