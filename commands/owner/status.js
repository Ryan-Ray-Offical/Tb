const db = require("quick.db")
const discord = require("discord.js")

module.exports = {
  name: "status",
  description: "Change the bot status",
  usage: "status <here>",
  category: "owner",
  run: async (client, message, args) => {
    
    //OWNER ONLY COMMAND
 if (message.author.id != 463967336194375701) return message.reply("you do not have perms to use this command, Only The Owner Of The Bot Have Access")
    //ARGUMENT
    if(!args.length) {
      return message.channel.send("Please give status message")
    }
    
 db.set(`status`, args.join(" "))
   await message.channel.send("Updated the bot status")
    process.exit(1);
    
  }
}