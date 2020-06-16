    const Discord = require("discord.js")


    module.exports = {
        name: "avatar",
        category: "fun",
    description: "Get the avatar of a user or yourself",
    usage: "avatar [User]",
    run: async (client, message, args) => {
    //command
    
{
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('Please mention the user who you want the avatar from.');

    if(!user.avatarURL)
        return message.channel.send(`That user does not have an avatar`);

    {
    
    const embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s Avatar`)
          .setColor("RANDOM")
          .setImage(user.avatarURL())  
      message.channel.send(embed)
// embed: utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
    };
    }
       
    }
    
    };