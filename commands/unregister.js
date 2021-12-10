const Discord = require('discord.js')
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

module.exports.run = async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(![ayarlar.RegisterStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(8)) return message.lineReply(embed.setDescription(`Bu komudu kullanmak için gerekli rollere veya izinlere sahip değilsin.`))
        if (!member) return message.channel.send("Lütfen bir kullanıcıyı etiketle.");
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")
        }
        await message.guild.members.cache.get(member.id).roles.set(ayarlar.Unregister);
        message.channel.send(embed.setDescription("Kullanıcı kayıtsıza atıldı"))
        member.setNickname(`${ayarlar.Tag} İsim | Yaş`);
    }
exports.help = {
    name: 'kayıtsız'
}
exports.conf = {
    aliases: ['unregister', 'unreg']
}