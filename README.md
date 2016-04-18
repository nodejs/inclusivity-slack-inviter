# Node.js Inclusivity Slack Inviter

Automated [Slack](https://slack.com/) invitations for the [Node.js Inclusivity WG](https://github.com/nodejs/inclusivity).

## Configuration

Configuration settings are set via environment variables. For convenience during development, environment variables may be stored in `.env`.

* `GITHUB_CLIENT_ID`: The client ID for the GitHub OAuth application.
* `GITHUB_SECRET`: The secret for the GitHub OAuth application.
* `GITHUB_MINIMUM_AGE`: The minimum age, in days, that an account must exist on GitHub prior to joining the Slack team. Defaults to `30`.
* `SLACK_TEAM`: The name of the Slack team to invite users to.
* `SLACK_TOKEN`: The token for accessing Slack's API.
* `COOKIE_KEYS`: A secret for signing cookies.
* `PORT`: The port to listen on for incoming requests. Default to `3000`.
* `DB_HOST`: The hostname of the database server to connect to.
* `DB_PORT`: The port to connect to.
* `DB_USER`: The MySQL user to authenticate as.
* `DB_PASSWORD`: The password for the MySQL user.
* `DB_NAME`: The name of the database.

## Setup

Prior to running the server, you must initialize the database. To do so, run the following command:

```sh
npm run setup
```

## License

Copyright Node.js Inclusivity Contributors

SPDX-License-Identifier: MIT
