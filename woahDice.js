const Discord = require('discord.js');

const client = new Discord.Client();
const token = process.env.TOKEN;

// command we are looking for
const commandPrefix = '!roll';

// possible dice arguments
const diceArgs = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const { content } = msg;

  if (content.startsWith(commandPrefix)) {
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

    // variable to hold dice roll
    let diceRoll = 0;

    // variable to hold the result to print
    let result = [];

    // parse command arguments
    cmdArgs.forEach((cmdArg) => {
      const res = handleDiceOption(cmdArg);
      result.push(res);
    });

    // correct grammars
    const replyPrefix = hasMultipleDice ? 'You rolled' : 'You rolled a';

    // construct a nicely formatted roll result
    let nicelyFormattedResult = '';
    result.forEach((rollRes) => {
      if (rollRes) nicelyFormattedResult += `${rollRes}, `;
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
  return Math.floor(Math.random() * Math.floor(upperBound)) + 1;
};

const handleDiceOption = (diceOption) => {
  switch (diceOption) {
    case 'd4':
      return `d4: ${handleDiceRoll(4)}`;
    case 'd6':
      return `d6: ${handleDiceRoll(6)}`;
    case 'd8':
      return `d8: ${handleDiceRoll(7)}`;
    case 'd10':
      return `d10: ${handleDiceRoll(9)}`;
    case 'd12':
      return `d12: ${handleDiceRoll(11)}`;
    case 'd20':
      return `d20: ${handleDiceRoll(19)}`;
    default:
      return null;
  }
};
