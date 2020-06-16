const Discord = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "say",
    description: "sends a message that was inputted to a channel",
    usage: "say (What You Want To Say)",
    category: "fun",
    accessableby: "everyone",
    aliases: ["announce", "announcement"],
  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.DEFAULT_PREFIX;
    }
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }



    
  }
}