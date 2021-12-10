const Discord = require('discord.js')
const db = require('quick.db')
require('discord-reply')
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp()
    if(![ayarlar.RegisterStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(8)) return message.lineReply(embed.setDescription(`Bu komudu kullanmak için gerekli rollere veya izinlere sahip değilsin.`))
    var member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.lineReply("Lütfen bir kullanıcıyı etiketle.")
    let names = db.get(`isimler_${member.id}`);
    if (!names) return message.lineReply("Bu kullanıcının geçmiş isimleri bulunmuyor")
    message.lineReply(embed.setTitle("Kullanıcı isimleri").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")))
}

exports.help = {
    name: 'isimler'
}
exports.conf = {
    aliases: ['names']
}