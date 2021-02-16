const Discord = require('discord.js');

const client = new Discord.Client();
const token = process.env.TOKEN;

// command we are looking for
const commandPrefix = '!roll';
const yeahPrefiex = 'yeah';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const { content } = msg;

  if (content.startsWith(commandPrefix)) {
    msg.reply('Do you wanna roll with me? Say yeah.');
    charliXCX = true;

    return;
  }

  if (content.startsWith(yeahPrefiex)) {
    msg.reply('Yeahiyeaiyea');
    charliXCX = false;
  }

  charliXCX = false;
});

client.login(token);
