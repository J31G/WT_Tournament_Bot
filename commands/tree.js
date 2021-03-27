const captureWebsite = require("capture-website");
const fs = require("fs");

module.exports = {
  name: "tree",
  description: "Displays the tournament tree for the current tournament",
  async execute(message, args, discordClient, currentTournamentId) {
    try {
      fs.unlinkSync("./files/screenshot.png"); // Try removing screenshot
    } catch (err) {
      if (err.code !== "ENOENT") console.error(err); // Ignore not found errors
    }

    // Create temp placeholder message
    const tempMessage = message.channel.send("Loading tree...");

    // Take a screenshot of the tournament module and save it to disk
    await captureWebsite.file(
      `https://challonge.com/${currentTournamentId}/module`,
      "./files/screenshot.png",
      {
        width: 1300,
        height: 950,
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
        removeElements: [".qc-cmp2-container", ".embed-cake-unit"],
      }
    );

    // Now delete placeholder before posting tree
    tempMessage.then((msg) => msg.delete());

    // Send screenshot to channel
    message.channel.send(`Wolfteam tournament tree!`, {
      files: [`./files/screenshot.png`],
    });
  },
};
