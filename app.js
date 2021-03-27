// Global Modules
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const socket = require("socket.io");
const helmet = require("helmet");
require("dotenv").config();

// Local Modules
const { onDiscordReady } = require("./modules/onDiscordReady");
const { onDiscordMessage } = require("./modules/onDiscordMessage");
const { onDiscordReactionAdd } = require("./modules/onDiscordReactionAdd");

// Discord setup
const discordClient = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
discordClient.commands = new Discord.Collection();

// App setup
const app = express();
const port = 4000;
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

const server = app.listen(port, () => {
  console.log(`Listening to requests at http://localhost:${port}`)
});

// Socket setup
const io = socket(server);

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

// On "ready" handler "./modules/onDiscordReady"
discordClient.once("ready", () => onDiscordReady(discordClient, io));

// On "message" handler "./modules/onDiscordMessage"
discordClient.on("message", (message) =>
  onDiscordMessage(discordClient, message)
);

// On "messageReactionAdd" handler "./modules/messageReactionAdd"
discordClient.on("messageReactionAdd", (reaction, user) =>
  onDiscordReactionAdd(reaction, user)
);

// Log bot in using the token
discordClient.login(process.env.DISCORD_TOKEN);
