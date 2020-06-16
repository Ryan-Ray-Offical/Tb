
const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "antilink",
  aliases: ["al"],
  category: "moderation",
  usage: "antilink (enable) {or} (disable)",
  description: "Deletes Any Links Sent By A User!",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }




if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: You Require manage messages permission to use this command")
  if(args[0] == "enable") {
    message.channel.send("Anti-Link has been enabled")
    db.set("al_"+ message.guild.id, true)
  }
       
  
  
    if (args[0] == null) {
  
  message.channel.send("You have to choose from: enable Or disable!")
  }
    
    
  if(args[0] == "disable") {
    message.channel.send("Anti-Link has been disabled")
    db.set("al_"+ message.guild.id, null)
  }
    
    
    
  }
}
