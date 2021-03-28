module.exports.onDiscordReady = (discordClient, io) => {
  console.log("The bot is online");
  discordClient.user
    .setActivity("Your Discord Server", { type: "WATCHING" })
    .catch((err) => console.error(err));

  // Socket connection
  io.on("connection", (socket) => {
    // New user
    console.log(`Made socket connection id: ${socket.id}`);

    // New Team Registrations
    socket.on("new-reg", (data) => {
      // Create message from data
      // eslint-disable-next-line prettier/prettier
      const newTeam = `__**New Player Sign-Up**__\n\n**Discord**: ${discordClient.users.cache.get(data.discord_user_id)}\n**IGN**: ${data.wt_ign}\n**Language**: ${data.language}`;

      // Post message to teams channels on discord
      discordClient.channels.cache.get("825352520351088670").send(newTeam);
    });
  });
};
