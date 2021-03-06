
'use strict'

/*
This puts the mark on the board by row and columen
 */

const _ = require('lodash');
const config = require('../config');
const game = require('../game');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (globalTicTacToeObject, payload, res) => {

    var gameList = globalTicTacToeObject.gameList;

    var tokens = payload.text.split(" ");

    var attachmentsText = '';

    if (payload.channel_id in gameList)
    {
        if(tokens.length < 3){
            attachmentsText = '*Uh Oh! you didn\'t enter a row and column';
        }
        else
        {
            let currentGame = gameList[payload.channel_id];

            let row = parseInt(tokens[1]);
            let column = parseInt(tokens[2]);

            attachmentsText = game.mark(payload, currentGame, row, column);

            if(currentGame.finished){
                delete gameList[payload.channel_id];
            }
        }
    }
    else
    {
        attachmentsText = '*Uh Oh! there isn\'t an active game in this channel';
    }

    var attachments = [
        {
            title: 'TicTacToe',
            color: '#2FA44F',
            text: attachmentsText,
            mrkdwn_in: ['text']

        }
    ]

    let msg = _.defaults({
      channel: payload.channel_name,
      attachments: attachments
    }, msgDefaults)

    res.set('content-type', 'application/json')
    res.status(200).json(msg)
    return

}

module.exports = { pattern: /mark/ig, handler: handler }
