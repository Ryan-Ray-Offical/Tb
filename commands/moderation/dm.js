const { MessageEmbed } = require("discord.js");

const config = require("../../config.json")


module.exports = {
  name: "dm",
  description: "Dm A Message To Your Mention User!",
  usage: "[Prefix]dm",
  category: "owner",
  run: async (client, message, args) => {
    
    
 if (message.author.id != config.OWNER_ID) return message.reply("you do not have permission to use this command! You Need To Be Bot Owner!")

    try {
      message.delete();

      let member =
        (await message.mentions.users.first()) ||
        (await client.users.fetch(args[0]).catch(() => null)) ||
        (await message.guild.members.get(args[0]));
      if (!member || !args[0])
        return message.channel.send(`Please Mention A User!`);
      let msg = args.slice(1).join(" ") || `Please Give Me Message!`;

      member.send(
        new MessageEmbed()
          .setTitle(`Dm Message | Sender : ${message.author.username}`)
          .setColor("RANDOM")
          .setDescription(msg.size > 2000 ?`${msg.substr(0, 1900)}...` : msg)
          .setFooter("If Someone Abuses This Command Make Sure To Contact Federal Bureau Investigation#0001!")
      );
      return message.channel
        .send(`Message Has Been Sent Successfully! | <@${message.author.id}>`);
    } catch (err) {
        console.error();
         return message.channel.send("Unable to dm this person! Try Again When He Activates His Dms!");
       }
  }
};
