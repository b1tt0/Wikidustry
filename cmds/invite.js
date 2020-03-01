module.exports.run = async (bot, msg, args, embed) => {
  embed.setTitle(`${bot.user.username} - Info `)
     .setDescription(`[Invite ${bot.user.username}](https://discordapp.com/api/oauth2/authorize?client_id=683434141198319739&permissions=388160&scope=bot)`)
     .setFooter(`${bot.user.username} is made by b1tt#4661 & Em1t#2527`, bot.user.displayAvatarURL())   
     .setColor("RANDOM");
  
  msg.reply(embed);
};

module.exports.help = {
  name: "Info",
  description: "Info about Wikidustry.",
  usage: "Info",
  aliases: ["i"]
}; 