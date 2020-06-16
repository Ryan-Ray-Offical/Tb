const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "start",
  aliases: ["turnon"],
  category: "owner",
  usage: "start",
  description: "Starts The Bot If Its Lagging",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    if (message.author.id != config.OWNER_ID) return message.reply("you do not have permission to use this command!")
    
    message.channel.send(`Starting The Bot... `).then(msg => {
     
      
      let embed = new Discord.MessageEmbed()
      .setTitle("Bot Started")
      .addFields([
        
        {name: "Bot's Name", value:`TB Moderation`},
        
        {name: "Server Count", value:`${client.guilds.cache.size}`},
        
        {name:"Ms", value:`${client.ws.ping}`}
        
         
         
      ])
      .setFooter("Bot Has Started!")
      .setColor("RANDOM")
       message.channel.send(embed)
      msg.delete()
      })
      
    
  }
}