const { Client, Collection, MessageEmbed } = require("discord.js"),
      server = require("express")(),
      bot = new Client(),
      config = require("./config.json"),
      { readdirSync } = require("fs");

bot.commands = new Collection();
bot.aliases = new Collection();

const util = {
  text: require("./text.json"),
  fetch: require("./util/fetch"),
  blocksUrl: "https://raw.githubusercontent.com/Em1tt/Wikidustry/master/blocks.json",
  blocks: null,
  
  unitsUrl: "https://raw.githubusercontent.com/Em1tt/Wikidustry/master/units.json",
  units: null
};

server.get("/", (req, res) => {
  res.status(200).send(util.text.server.success);
}).listen(process.env.PORT);

const load = async (dir = "./cmds/") => {
  const commands = await readdirSync(dir).filter(files =>
    files.endsWith(".js")
  );
  for (const file of commands) {
    let pull = await require(`${dir}${file}`);
    if (pull.help) {
      await bot.commands.set(pull.help.name, pull);
      pull.help.aliases.forEach(async alias => {
        await bot.aliases.set(alias, pull.help.name);
      });
      console.log(`Loaded "${pull.help.name}"!`);
    }
  }
  
  util.blocks = await util.fetch(util.blocksUrl);
  util.units = await util.fetch(util.unitsUrl);
};

bot.once("ready", () => {
  load();
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async msg => {
  if (msg.content == `<@${bot.user.id}>`) return msg.reply(`${bot.user.username}'s prefix is \`${config.prefix}\`!`)
  if (!msg.content.startsWith(config.prefix)) return;
  if (!msg.guild) return;
  if (msg.author.bot) return;
  
  const args = msg.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!cmd.length) return;

  const command = bot.commands.get(bot.aliases.get(cmd));
  if (command) {
    try {
      const embed = new MessageEmbed().setColor("RANDOM").setFooter(msg.author.tag, msg.author.displayAvatarURL());
      await command.run(bot, msg, args, embed, util);
    } catch (e) {
      msg.reply(
        "An error has occured! ```" + e + "```"
      );
    }
  } else return;
});

bot.login(process.env.TOKEN);