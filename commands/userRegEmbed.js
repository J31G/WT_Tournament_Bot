const Discord = require("discord.js");

module.exports = {
  name: "test",
  description: "Start the registration process for a user",
  async execute(message) {
    // Creating the embed message.
    const regEmbed = new Discord.MessageEmbed()
      .setTitle("Want to take part?")
      .setDescription(
        "If this sounds like something fun, come take part! Places are limited, so don't wait around to register.\n\n__**So what next?**__\n1. Click on the button below\n2, You'll then be sent a private message with a unique link. Please click it.\n3. Fill in the form and you are done!"
      );

    // Awaiting for the embed message to be sent.
    const reactionMessage = await message.channel.send(regEmbed);

    // Reacting to the embed message.
    await reactionMessage.react("🧾");
  },
};
