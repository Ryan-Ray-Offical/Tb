const Discord = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "invite",
  aliases: ["botinvite", "inv"],
  category: "info",
  usage: "invite",
  description: "Gives You A Link To Add The Bot To Your Server!",
  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.DEFAULT_PREFIX;
      
   
    }
     
     const embed = new Discord.MessageEmbed()
     
      .setColor("RANDOM")
     .setTitle("Invite Me Here!")
     .setURL('https://discord.com/api/oauth2/authorize?client_id=672555078686605333&permissions=0&scope=bot')
     .setFooter("Invite Me!", 'https://cdn.glitch.com/b2c3ab4a-57b2-4832-8316-dd59756aecba%2FTB%20Photo.png?v=1592152054369')
     .setDescription("Here You Go Sir! Make Sure To Invite Me Correctly!")

    message.channel.send(embed)
    
    message.delete()
  }
  
}