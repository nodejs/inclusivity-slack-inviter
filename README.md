# Node.js Inclusivity Slack Inviter

Automated [Slack](https://slack.com/) invitations for the [Node.js Inclusivity WG](https://github.com/nodejs/inclusivity).

## Configuration

Configuration settings are stored in `config.json`. The following settings must be defined:

* `github`
  * `clientId`: The client ID for the GitHub OAuth application.
  * `secret`: The secret for the GitHub OAuth application.
  * `minimumAge`: The minimum age, in days, that an account must exist on GitHub prior to joining the Slack team.
* `slack`
  * `team`: The name of the Slack team to invite users to.
  * `token`: The token for accessing Slack's API.
* `web`
  * `cookieKeys`: An [array of keys for signing cookies](https://github.com/expressjs/cookie-session#keys).
  * `port`: The port to listen on for incoming requests.

## License

Copyright Node.js Inclusivity Contributors

SPDX-License-Identifier: MIT
