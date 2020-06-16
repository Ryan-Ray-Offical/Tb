const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
  name: "daily",
  aliases: ["d", "Daily", "D"],
  category: "economy",
  usage: "daily",
  description: "Gives You Daily Credits!",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
    
    let amount = 1000
    let timeout = 86400000
    
    let daily = await db.fetch(`daily_${message.author.id}`)
    
    if(daily !== null && timeout - (Date.now() - daily) >0) {
      
      let time = ms(timeout - (Date.now() - daily));
      
      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Daily Command")
      .setDescription(`You Have Already Claimed Your Daily Rewards!\nWait: ${time.hours}.Hours ${time.minutes}.Minutes ${time.seconds}.Seconds`)
      .setFooter("Daily Command= Rewards Claimed!")
      
      
      message.channel.send(embed)
      
    } else {
      
      let embed  = new Discord.MessageEmbed()
      
      .setColor('RANDOM')
      .setTitle("Daily Command")
      .setDescription(`You Have Claimed ${amount} Credits! `)
      .setFooter("Daily Command = Claiming Rewards!")
      
      message.channel.send(embed)
      db.add(`credits_${message.author.id}`, amount)
      db.set(`daily_${message.author.id}`, Date.now())
      
      
    }
    
  }
}