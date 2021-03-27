const Discord = require("discord.js");

module.exports = {
  name: "embed",
  description: "Test Embed that listens for reactions",
  async execute(message) {
    // Getting the role by ID.
    const tournamentMemberRole = message.guild.roles.cache.get(
      "825393592251449354"
    );

    // Creating the embed message.
    const roleEmbed = new Discord.MessageEmbed()
      .setTitle("WolfTeam Tournament - Alpha V2")
      .setDescription(
        "Interested in the next tournament and want to know some more infomation?\n\nReact below and channels with more info will be shown to you."
      )
      .addFields(
        {
          name: "✅",
          value: `This will add you to the \n**${tournamentMemberRole.name}** role. You then can view more info about this tournament and find our how to apply to take part.`,
          inline: true,
        },
        {
          name: "❎",
          value: `This will remove you from the **${tournamentMemberRole.name}** role and you'll lose access to all the tournament related channels.`,
          inline: true,
        }
      );

    // Awaiting for the embed message to be sent.
    const reactionMessage = await message.channel.send(roleEmbed);

    // Reacting to the embed message.
    await reactionMessage.react("✅");
    await reactionMessage.react("❎");
  },
};
