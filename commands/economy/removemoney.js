const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "removemoney",
  aliases: ["removecredits"],
  category: "economy",
  usage: "removecredits (@user) (Credits)",
  description: "Bot Owner Removes Credits From A User!",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
    if (message.author.id != 463967336194375701) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")
    
        if (!args[0]) return message.reply('Please specify an amount to Remove.')
    if (message.content.includes('-')) { // if the message includes "-" do this.
        return message.channel.send('Negative money can not be Removed.')
    }

    let user = message.mentions.users.first() || message.author
    message.channel.send('Successfully Removed ' + args[1] + ' to ' + args[0])
     db.subtract(`credits_${user.id}`, args[1])

    
    
    
    
  }
}