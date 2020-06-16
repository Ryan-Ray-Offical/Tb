const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")


module.exports = {
  name: "balance",
  aliases: ["bal", "bank"],
  category: "economy",
  usage: "bal",
  description: "shows you your balance",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
  let credits = db.get(`credits_${message.author.id}`)

    let bal = db.fetch(`credits_${message.guild.id}_${message.author.id}`)

    if (bal === null) bal = 0;

    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Balance Command")
    .setDescription(`Your Balance Is ${credits}`)
    .setFooter("Balance Command")
    message.channel.send(embed)
  }
}
