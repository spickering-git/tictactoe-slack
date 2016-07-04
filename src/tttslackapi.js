/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

slack = new Slack(config('SLACK_TOKEN'));

slack.api("users.list", function(err, response) {
    console.log(response);
});

module.exports = slack