const Discord = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "serverinfo",
  aliases: ["si", "guildinfo"],
  category: "info",
  usage: "serverinfo",
  description: "Shows Information About the Server",
  run: async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) {
      prefix = config.DEFAULT_PREFIX;
    }
  const verlvl = { //This could be an (array) What? That works just as well, no need for an object if the keys are just ordered numbers
    "NONE": "None",
    "LOW": "Low",
    "MEDIUM": "Medium",
    "HIGH": "(╯°□°）╯︵ ┻━┻",
    "VERY_HIGH": "(ノಠ益ಠ)ノ彡┻━┻"
  }

  const verilvl = { //This works if you want descriptions, either way, you need the "NONE: " etc things since verificationlevel returns a string, not an integer
    "NONE": "No verification", //You can copy this and adapt it, gtg W8? dm me on discord
    "LOW": "Must have verified email",
    "MEDIUM": "Must have verified email and account older than 5 minutes",
    "HIGH": "Must have verified email, account older than 5 minutes and been in server for 10 minutes",
    "VERY_HIGH": "Must have verified phone on account, account older than 5 minutes and been in server for over 10 minutes"
  }
  
  
   let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
  
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Server Information")
      .setDescription("Information about the server.")
      .addFields([
        
        {name: "Server Name", value: `${message.guild.name}`},
        
        {name: "Owner", value: `${message.guild.owner}`},
        
        { name: "Region", value: message.guild.region},
        
        
        {name: "Members", value: `${message.guild.memberCount}`},
        
        {name: "Roles", value: `${message.guild.roles.cache.array().length}`},
        
        {name: "You Joined", value: `${message.guild.joinedAt}`},
        
        {name: "Total Members", value: `${message.guild.memberCount}`},
        
        {name: "Created At", value: `${message.guild.createdAt}`}
        
        
      ])
    .addField(`Channels [${totalchan}]`, `Text: ${text} \nVoice: ${vc} \nCategory: ${category}`)
    .addField("Verification Level", verilvl[message.guild.verificationLevel], true)
    .addField("Verification", verlvl[message.guild.verificationLevel], true)
    .setTimestamp()
    .setFooter('Bot Made By Federal Bureau Investigation#0001');
    
    message.channel.send(embed)
  
  }
};
