module.exports.run = async (bot, msg, args, embed, util) => {
  const block = args.join(" ").toLowerCase();
  
  if (block === "all") {
    embed.setTitle(util.text.walls.all)
      .setDescription(`\u200b`);
    
    util.blocks.forEach(curr => {
      if (curr.category !== "Defense") return;
      embed.description += `${curr.name}\n`;
    })
    
    return msg.channel.send(embed);
  }
  
  util.blocks.forEach(curr => {
    if (block !== curr.name.toLowerCase()) return;
    if (curr.category !== "Defense") return;
    embed.setTitle(curr.name)
      .setDescription(curr.desc)
      .setThumbnail(curr.img)
      .addField(util.text.block.info, `${util.text.block.health} **${curr.health}**
${util.text.block.size} **${curr.size}x${curr.size}**
${util.text.block.buildTime} **${curr.buildTime} seconds**
`, true)
      .addField(util.text.block.cost, `\u200b`, true)
    
    curr.cost.forEach(req => {
      let reqq;
      switch(req[0]) {
        case "Copper": reqq = "<:copper:683609228124225557>"; break
        case "Titanium": reqq = "<:titanium:683619185125097526>"; break
        case "Thorium": reqq = "<:thorium:683621932272320630>"; break
        case "Metaglass": reqq = "<:metaglass:683624424397602827>"; break
        case "Plastanium": reqq = "<:plastanium:683624382530060337>"; break
        case "Surge Alloy": reqq = "<:surgeAlloy:683624402809651210>"; break
        case "Phase Fabric": reqq = "<:phaseFabric:683627240445182039>"; break
        default: reqq = req[0]
      }
      embed.fields[1].value += `**${req[1]} ${reqq}**\t`
    });
    return msg.channel.send(embed)
  });
  
};

module.exports.help = {
  name: "Wall",
  description: "Show wall info",
  usage: "wall [name]",
  aliases: ["wall", "w"]
};