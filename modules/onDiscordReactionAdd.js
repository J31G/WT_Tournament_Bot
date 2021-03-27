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
    default:
      return;
  }

  // Remove the user's reaction
  reaction.users.remove(user);
};
