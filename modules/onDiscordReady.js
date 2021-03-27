module.exports.onDiscordReady = (discordClient) => {
  console.log("The bot is online");
  discordClient.user
    .setActivity("Your Discord Server", { type: "WATCHING" })
    .catch((err) => console.error(err));
};
