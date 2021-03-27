// Require Global
const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Discord setup
const discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();

// Check for commands in our commands folder
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// For each command found, register it as a command
commandFiles.forEach((file) => {
  const command = `./commands/${file}`;
  discordClient.commands.set(command.name, command);
});

// Run once on first ready state
discordClient.once("ready", () => {
  console.log("The bot is online");
  discordClient.user
    .setActivity("Your Discord Server", { type: "WATCHING" })
    .catch((err) => console.error(err));
});

// Run on each message recieved
discordClient.on("message", (message) => {
  // Check if message starts with our prefix or is another bot. If so, quit program
  if (
    !message.content.startsWith(process.env.DISCORD_PREFIX) ||
    message.author.bot
  )
    return;

  // Split message up into individual words then extract the first as the command
  const args = message.content
    .slice(process.env.DISCORD_PREFIX.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  // Check if command was in our command folder. If not, quit program
  if (!discordClient.commands.has(command)) return;

  // If found, move to the command module and report any errors
  try {
    discordClient.commands
      .get(command)
      .execute(message, args, discordClient, Discord);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// Log bot in using the token
discordClient.login(process.env.DISCORD_TOKEN);
