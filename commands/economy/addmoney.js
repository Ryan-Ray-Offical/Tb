const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "addmoney",
  aliases: ["addcredits"],
  category: "economy",
  usage: "addcredits (@user)",
  description: "Bot Owner Adds Credits To A User!",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
    if (message.author.id != 463967336194375701) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")
    
        if (!args[0]) return message.reply('Please specify an amount to add.')
    if (message.content.includes('-')) { // if the message includes "-" do this.
        return message.channel.send('Negative money can not be Added.')
    }

    let user = message.mentions.users.first() || message.author
    message.channel.send('Successfully added ' + args[1] + ' to ' + args[0])
     db.add(`credits_${user.id}`, args[1])

    
    
    
    
  }
}