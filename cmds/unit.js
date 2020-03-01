module.exports.run = async (bot, msg, args, embed, util) => {
  const unit = args.join(" ").toLowerCase();
  
  if (unit == "all") {
    embed.setTitle(util.text.units.all)
      .setDescription(`\u200b`);
    
    util.units.forEach(curr => {
      embed.description += `${curr.name}\n`;
    });
    
    return msg.channel.send(embed);
  };
  
  util.units.forEach(curr => {
    if (unit !== curr.name.toLowerCase()) return;
    
    let enemy;
    if (curr.enemy) enemy = util.text.units.status.enemy;
    else if (!curr.enemy) enemy = util.text.units.status.neutral;
    else enemy = util.text.units.status.na;
    
    embed.setTitle(curr.name)
      .setDescription(curr.desc)
      .setThumbnail(curr.img)
      .addField(util.text.block.info, `${util.text.block.health} **${curr.health}**
${util.text.block.speed} **${curr.speed}**
${util.text.units.mass} **${curr.mass}**
${util.text.units.maxVelocity} **${curr.maxVelocity}**

${util.text.units.status.name} **${enemy}**
`, true)
    
    return msg.channel.send(embed)
  });
};

module.exports.help = {
  name: "Unit",
  description: "Show unit info",
  usage: "unit [name]",
  aliases: ["unit", "u"]
};