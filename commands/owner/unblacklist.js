const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "unblacklist",
  aliases: ["unbl"],
  category: "owner",
  usage: "unblacklist {@user}",
  description: "unblacklists A User From Using A Bot (Owners Only)",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
    
   if (message.author.id != 463967336194375701) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")
   const user = message.mentions.users.first()
   if (!user) return message.reply("Please mention Someone!")
    
    let blacklist = await db.fetch(`blacklist_${user.id}`)
    
if (blacklist === "Blacklisted") {
       db.set(`blacklist_${user.id}`, "Not") 
      let embed = new Discord.MessageEmbed()
      .setDescription(`${user} has been unblacklisted!`)
      
      message.channel.send(embed)
    } else if (blacklist === null){ 
      db.set(`blacklist_${user.id}`, "Blacklisted")
      let embed = new Discord.MessageEmbed()
      .setDescription(`Set up data for ${user}!`)
      
      message.channel.send(embed)
      
    }
    }
    }