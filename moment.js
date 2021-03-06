const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
require('discord-buttons')(client)
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

client.login(ayarlar.token);
 
client.on("guildMemberAdd", async(member) => {
      let channel = member.guild.channels.cache.get(ayarlar.RegisterChat);
    channel.send(`
    Ho?? geldin ${member}, seninle birlikte **${member.guild.memberCount}** ??yeye ula??t??k!
  
    Bu hesap \`${moment(member.user.createdTimestamp).format("LLL")}\` zaman??nda a????lm????. (${moment(member.user.createdAt).add(5, 'days').fromNow().replace("birka?? saniye ??nce", " ")}.)
    
    Ses teyit odalardan birisine ge??ersen <@&${ayarlar.RegisterStaff}> rol??ndeki ki??iler seninle ilgilenecektir.
    
    Sol taraftaki Confirmed odalar??na ge??erek kay??t olabilirsin.
    `)
})

setInterval(() => {
    const server = client.guilds.cache.get(ayarlar.GuildID); 
    const taglog = client.guilds.channels.cache.get(ayarlar.taglog)
    server.members.cache.forEach(async member => {
        if (!member.user.username.includes(ayarlar.tag)) {
            await member.roles.add(ayarlar.FamilyRole).catch(() => {})
            await taglog.send(`${member} adl?? ki??i tag??m??z?? ald?????? i??in family rol?? verilidi.`)
        }
    })
}, 1 * 1000)
