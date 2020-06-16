    const Discord = require("discord.js")


    module.exports = {
        name: "myavatar",
        category: "fun",
    description: "Get the avatar of yourself",
    usage: "myavatar",
    run: async (client, message, args) => {
    //command
    
{
  
    if(!message.author.avatarURL)
        return message.channel.send(`Sorry But You Don't Have A Avatar!`);

    {
    
    const embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username}'s Avatar`)
          .setColor("RANDOM")
          .setImage(message.author.avatarURL())  
      message.channel.send(embed)
// embed: utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
    };
    }
       
    }
    
    };