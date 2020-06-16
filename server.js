
const http = require('http');
const express = require('express');
const app = express();

var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(" Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://tb-moderation.glitch.me/`);
}, 280000);







const { Discord, Client, RichEmbed, Attachment } = require("discord.js");
const { token, prefix } = require("./config.json")
const { config } = require("dotenv");
const discord = require("discord.js") 
const client = new discord.Client({
  disableEveryone: true
});

const db = require("quick.db")
const { addexp } = require("./handlers/xp.js");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.snipes = new Map();

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client)
})


client.on("ready", () => { //When bot is ready
  console.log("I am Reday to Go")
  client.user.setActivity(db.get(`status`)) //It will set status :)
})


function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  
}




client.on("message", async message => {
  
 if(message.content.includes("https://")) {
    //make more commands like this with diff includes
    let link = await db.fetch(`al_${message.guild.id}`)
    if(link === null) {
      return; //it will not do anything if anti-link is disabled
    }
    if(link === true) {
      message.delete()
      message.reply(`${message.author.username} Links are not allowed in this server :x:`)
    }
  } //lets test it



  
  
  
  
   let blacklist = await db.fetch(`blacklist_${message.author.id}`)
  
  
 
if(message.author.bot) return;
  if(!message.guild) return;
  if(!message.content.startsWith(prefix)) return;
  
  
   if (blacklist === "Blacklisted") return message.reply("You are blacklisted from the bot!")
  
     if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);

   return addexp(message);
 }) //All codes link in description







client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#0032FF")
  .setTitle("Welcome",)
  .addField(":page_facing_up: Name:", member.user)
   .addField(":detective: User ID:", member.id)
   .addField(":chart_with_upwards_trend:  Member Count:", member.guild.memberCount)
   .setFooter(member.guild.name)
   .setTimestamp(member.guild.createdAt)
  .setThumbnail(member.user.avatarURL())
  .setDescription("Welcome :tada: Have Fun!")
  .setImage(member.user.avatarURL());
  client.channels.cache.get(chx).send(wembed)
})

client.on("guildMemberRemove", (member) => {
  let chx = db.get(`levchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#FF2D00")
  .setTitle("Goodbye",)
    .addField(":page_facing_up: Name:", member.user)
   .addField(":detective: User ID:", member.id)
   .addField(":chart_with_upwards_trend:  Member Count:", member.guild.memberCount)
   .setFooter(member.guild.name)
   .setTimestamp(member.guild.createdAt)
  .setThumbnail(member.user.avatarURL())
  .setDescription("Goodbye ", member.user)
  .setImage(member.user.avatarURL());
  client.channels.cache.get(chx).send(wembed)
})



client.on("message", async message => {
  
if(message.author.bot) return;
  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  
  
  
});




client.login(token)