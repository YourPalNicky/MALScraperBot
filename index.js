const Discord = require('discord.js');
const fs = require("fs");

const commands = new Discord.Collection();
const client = new Discord.Client();

const type = 'anime';
const prefix = "!";

client.search_type = type;
client.prefix = prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

fs.readdirSync("./commands").forEach(command => {
  commands.set(command.split(".")[0].toLowerCase(), require(`./commands/${command}`));
});

client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  let arg = message.content.slice(prefix.length).split(" ")[0].toLowerCase();
  if (commands.has(arg)) commands.get(arg)(client, message);
});

setTimeout(() => {
  client.login(require("./token.json").token);
}, 5000);