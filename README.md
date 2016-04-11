# Node.js Inclusivity Slack Inviter

Automated [Slack](https://slack.com/) invitations for the [Node.js Inclusivity WG](https://github.com/nodejs/inclusivity).

## Configuration

Configuration settings are set via environment variables. For convenience during development, environment variables may be stored in `.env`.

* `GITHUB_CLIENT_ID`:The client ID for the GitHub OAuth application.
* `GITHUB_SECRET`: The secret for the GitHub OAuth application.
* `GITHUB_MINIMUM_AGE`: The minimum age, in days, that an account must exist on GitHub prior to joining the Slack team. Defaults to `30`.
* `SLACK_TEAM`: The name of the Slack team to invite users to.
* `SLACK_TOKEN`: The token for accessing Slack's API.
* `COOKIE_KEYS`: An [array of keys for signing cookies](https://github.com/expressjs/cookie-session#keys).
* `PORT`: The port to listen on for incoming requests. Default to `3000`.

## License

Copyright Node.js Inclusivity Contributors

SPDX-License-Identifier: MIT
