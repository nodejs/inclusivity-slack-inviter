const request = require("request");

exports = module.exports = Slack;

function Slack(options) {
	this.team = options.team;
	this.token = options.token;
}

Slack.prototype.invite = function(email, callback) {
	request.post({
		url: "https://" + this.team + ".slack.com/api/users.admin.invite",
		form: {
			email: email,
			token: this.token,
			set_active: true
		}
	}, (error, httpResponse, body) => {
		if (error) {
			return callback(error);
		}

		body = JSON.parse(body);

		if (body.ok) {
			return callback(null, "SUCCESS");
		}

		if (body.error === "already_invited" || body.error === "already_in_team") {
			return callback(null, body.error.toUpperCase());
		}

		error = new Error(body.error);
		error.code = body.error.toUpperCase();
		return callback(error);
	});
};
