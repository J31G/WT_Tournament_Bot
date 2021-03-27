// Global Modules
const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Local Modules
const { onReady } = require("./modules/onReady");
const { onMessage } = require("./modules/onMessage");

// Discord setup
const discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();

// Check for commands in our commands folder
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// For each command found, register it as a command
commandFiles.forEach((file) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const command = require(`./commands/${file}`);
  discordClient.commands.set(command.name, command);
});

// On "ready" handler ""./modules/onReady"
discordClient.once("ready", () => onReady(discordClient));

// On "message" handler ""./modules/onMessage"
discordClient.on("message", (message) => onMessage(discordClient, message));

// Log bot in using the token
discordClient.login(process.env.DISCORD_TOKEN);
