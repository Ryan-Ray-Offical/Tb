const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const { PREFIX } = require('../../config');

module.exports = {
  
        name: "help",
        aliases: ["h"],
        usage: "help | help <command name>",
        category: "info",
        description: "Displays all commands that the bot has.",
        accessableby: "everyone",
    run: async (client, message, args) => {
        

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${client.user.username} Help`)
            .setThumbnail(client.user.displayAvatarURL())

        if (!args[0]) {

            const sembed = new MessageEmbed()
                .setTitle(`${client.user.username} Help`)
                .setColor("RANDOM")
                .setDescription('**Message Has Been Sent to You In DMs!**')
            message.channel.send(sembed).then(msg => {
                msg.delete({ timeout: 100000 });
            })

            const categories = readdirSync("./commands/")

            embed.setDescription(`**These Are the Available Commands For**) ${message.guild.me.displayName}\nBot Server Count - ${client.guilds.cache.size}\`\n\nFor Help Related To A Particular Command Type t!help [command name | alias]`)
            embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${client.commands.size}`, client.user.displayAvatarURL());

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(` ${capitalise} [${dir.size}] - `, dir.map(c => `\`${c.name}\``).join(" "))
                } catch (e) {
                    console.log(e)
                }
            })

            return message.author.send(embed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${PREFIX}help\` For the List Of the Commands!**`))
            command = command.config

            embed.setDescription(stripIndents`**The Bot's Global Prefix Is \`${PREFIX}\`**\n
            **Server Prefix Is \`${PREFIX}\`**\n
            ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Description -** ${command.description || "No Description provided."}\n
            ** Category -** ${command.category}\n
            ** Usage -** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No Usage"}\n
            ** Accessible by -** ${command.accessableby || "everyone"}\n
            ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
            embed.setFooter(message.guild.name, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
};