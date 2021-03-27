module.exports.onDiscordReactionAdd = (reaction, user) => {
  const { message, emoji } = reaction;

  if (user.bot) return;

  switch (emoji.name) {
    case "✅":
      message.guild.members.fetch(user.id).then((member) => {
        member.roles.add("825393592251449354");
      });
      break;
    case "❎":
      message.guild.members.fetch(user.id).then((member) => {
        member.roles.remove("825393592251449354");
      });
      break;
    case "🧾":
      message.guild.members.fetch(user.id).then((member) => {
        // eslint-disable-next-line prettier/prettier
        const userArray = `{"userId":"${member.user.id}","username":"${member.user.username}","clickTime" : "${Date.now()}"}`;
        const userEncoded = Buffer.from(`${userArray}`).toString("base64");
        // console.log(JSON.parse(Buffer.from(userEncoded, "base64").toString()));
        member
          .send(
            `Hi ${member.user.username},\n\nIt's great you want to take part in the next tournament. To do so, please link the link below:\n\nhttps://example.com/${userEncoded}\n\nAny problems, please message one of the team.\n\n-WT GM's`
          )
          .catch((err) => {
            if (err.code === 50007) {
              return message.channel
                .send(
                  `Please enable private messages on this server. The bot cannot send you your registration link right now as it stands`
                )
                .then((msg) => {
                  setTimeout(() => msg.delete(), 5000);
                });
            }
            return console.error(err);
          });
      });
      break;
    default:
      return;
  }

  // Remove the user's reaction
  reaction.users.remove(user);
};
