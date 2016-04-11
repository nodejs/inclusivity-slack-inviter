"use strict";

const cookieSession = require("cookie-session");
const express = require("express");
const expressHandlebars = require("express-handlebars");
const githubAuth = require("connect-oauth-github");
const github = require("github-request");
const postRequest = require("request").post;
const Slack = require("./lib/slack");
const version = require("./package").version;

require("dotenv").config({ silent: true });
process.env.GITHUB_MINIMUM_AGE = process.env.GITHUB_MINIMUM_AGE || 30;
process.env.PORT = process.env.PORT || 3000;

const slackClient = new Slack({
	team: process.env.SLACK_TEAM,
	token: process.env.SLACK_TOKEN
});

const app = express();
app.use(cookieSession({
	name: "session",
	keys: process.env.COOKIE_KEYS.split(",")
}));

app.use("/public", express.static("public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const gha = githubAuth.createClient({
	id: process.env.GITHUB_CLIENT_ID,
	secret: process.env.GITHUB_SECRET,
	scope: "user:email"
});

app.get("/", (request, response) => {
	response.render("index");
});

app.get("/auth", gha.handshake);

app.get("/signup", gha.authorize, (request, response) => {
	let ghaUser = gha.users[request.sessionID];

	github.request({
		path: "/user?access_token=" + ghaUser.accessToken,
	}, (error, data) => {
		if (error) {
			return response.status(500).render("error");
		}

		let ageInDays = (Date.now() - new Date(data.created_at)) / (1000 * 60 * 60 * 24);
		if (ageInDays < process.env.GITHUB_MINIMUM_AGE) {
			return response.render("new-account", {
				minimumAge: process.env.GITHUB_MINIMUM_AGE
			});
		}

		ghaUser.githubProfile = data;
		response.render("signup", {
			name: data.name,
			email: data.email
		});
	});
});

app.post("/signup", gha.authorize, (request, response) => {
	let ghaUser = gha.users[request.sessionID];
	let name = ghaUser.githubProfile.name;
	let email = ghaUser.githubProfile.email;

	slackClient.invite(email, (error, status) => {
		if (error) {
			if (error.code === "INVALID_EMAIL") {
				return response.render("invalid-email", {
					email: email
				});
			}

			return response.status(500).render("error");
		}

		// Remove the user data to free up memory
		delete gha.users[request.sessionID];

		if (status === "ALREADY_INVITED" || status === "ALREADY_IN_TEAM") {
			return response.render("existing", {
				status: status === "ALREADY_INVITED" ?
					"You already have a pending invitation" :
					"You're already on the Slack team"
			});
		}

		// TODO: Log the GitHub -> email mapping

		response.redirect("thanks");
	});
});

app.get("/thanks", (request, response) => {
	response.render("thanks");
});

app.listen(process.env.PORT, () => {
	console.log("Node.js Inclusivity WG Slack Inviter v" + version +
		" listening on port " + process.env.PORT);
});
