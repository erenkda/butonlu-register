const Discord = require('discord.js')
const db = require('quick.db')
require('discord-reply')
exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed().setFooter('Cherry ❤️ Blabla').setColor('RED')
let top = message.guild.members.cache.filter(uye => db.get(`toplam_${uye.id}`)).array().sort((uye1, uye2) => Number(db.get(`toplam_${uye2.id}`)) - Number(db.get(`toplam_${uye1.id}`))).slice(0, 15).map((uye, index) => (index + 1) + ". <@" + uye + "> \`" + db.get(`toplam_${uye.id}`) + "\` Kayıta Sahip.").join('\n')
message.lineReply(embed.setDescription(top).setTitle("Toplam Kayıt Sıralaması"))
}
exports.help = {
    name: 'top'
}
exports.conf = {
    aliases: ['topteyit', 'topkayıt']
}