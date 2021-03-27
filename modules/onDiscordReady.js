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
      console.log(data);
    });
  });
};
