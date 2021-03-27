const Discord = require("discord.js");

module.exports = {
  name: "embed",
  description: "Test Embed that listens for reactions",
  async execute(message) {
    // Getting the role by ID.
    // eslint-disable-next-line no-unused-vars
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
          value: `This will add you to the \n**${tournamentMemberRole.name}** role`,
          inline: true,
        },
        {
          name: "❎",
          value: `This will remove you from the \n**${tournamentMemberRole.name}** role`,
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
