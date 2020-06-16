const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")
const ms = require("parse-ms")

module.exports = {
  name: "monthly",
  aliases: ["m", "Monthly", "M"],
  category: "economy",
  usage: "monthly",
  description: "Gives You Monthly Reward!",
  run: async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(prefix == null) {
    prefix = config.DEFAULT_PREFIX
    }
    
    
    let amount = 20000
    let timeout = 2592000000
    
    let monthly = await db.fetch(`monthly_${message.author.id}`)
    
    if(monthly !== null && timeout - (Date.now() - monthly) >0) {
      
      let time = ms(timeout - (Date.now() - monthly));
      
      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Monthly Command")
      .setDescription(`You Have Already Claimed Your Monthly Reward!\nWait:\n${time.days}.Days\n${time.hours}.Hours\n ${time.minutes}.Minutes\n ${time.seconds}.Seconds`)
      .setFooter("Monthly Command = Rewards Claimed!")
      
      
      message.channel.send(embed)
      
    } else {
      
      let embed  = new Discord.MessageEmbed()
      
      .setColor('RANDOM')
      .setTitle("Monthly Command")
      .setDescription(`You Have Claimed ${amount} Credits! `)
      .setFooter("Monthly Command = Claiming Rewards!")
      
      message.channel.send(embed)
      db.add(`credits_${message.author.id}`, amount)
      db.set(`monthly_${message.author.id}`, Date.now())
      
      
    }
    
  }
}