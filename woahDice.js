const Discord = require('discord.js');
require('dotenv/config');

const client = new Discord.Client();
const token = process.env.TOKEN;

// command we are looking for
const commandPrefix = '!roll';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const { content } = msg;

  if (content.startsWith(commandPrefix)) {
    // if badly formatted arguments to terminate
    let badFormatArgs = false;

    // separate each arg into an array
    const cmdArgs = content.split(' ');

    // check for !roll command
    if (cmdArgs[0] !== commandPrefix) return;

    // remove the command entry since it has already been verified
    cmdArgs.shift();

    // ensure there are commands to parse
    if (!cmdArgs || cmdArgs.length === 0) return;

    // for multiple dice rolls commands
    const hasMultipleDice = cmdArgs.length > 1;

    // variable to hold the result to print
    let result = [];

    // parse command arguments
    for (let cmdArg of cmdArgs) {
      if (cmdArg.charAt(0) !== 'd') {
        badFormatArgs = true;
        break;
      }

      const rollNum = Number(cmdArg.substring(1));
      if (!isPositiveInteger(rollNum)) {
        badFormatArgs = true;
        break;
      }

      const res = handleDiceRoll(rollNum);
      result.push(res);
    }

    if (badFormatArgs) {
      msg.reply(
        'One or more of your arguments was formatted badly. Try again.'
      );
      return;
    }

    // correct grammars
    const replyPrefix = hasMultipleDice ? 'You rolled' : 'You rolled a';

    // construct a nicely formatted roll result
    let nicelyFormattedResult = '';
    result.forEach((rollRes) => {
      nicelyFormattedResult += `${rollRes}, `;
    });

    // remove the last two chars
    nicelyFormattedResult = nicelyFormattedResult.substring(
      0,
      nicelyFormattedResult.length - 2
    );

    // reply with result
    msg.reply(`${replyPrefix} ${nicelyFormattedResult}`);
  }
});

client.login(token);

const handleDiceRoll = (upperBound) => {
  return Math.floor(Math.random() * Math.floor(upperBound) + 1);
};

const isPositiveInteger = (num) => {
  if (Number.isNaN(num)) return false; // assert number
  if (!Number.isInteger(num)) return false; // assert integer
  if (num < 0) return false; // assert positive or 0
  return true;
};
