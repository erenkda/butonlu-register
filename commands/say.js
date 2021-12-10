const { MessageEmbed } = require("discord.js");
const config = require("../ayarlar.json");
module.exports.run = async(client, message, args) => {
        var TotalMember = message.guild.memberCount
        var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.Tag)).size;   
        var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
        var Boost = message.guild.premiumSubscriptionCount;

        message.lineReplyNoMention(new MessageEmbed().setDescription(`
    \`❯\` Sunucumuzda toplam ${TotalMember}(+**${Online}** Aktif) kullanıcı bulunmaktadır.
    \`❯\` Toplam **${Taglı}** kişi tagımızda bulunuyor.
    \`❯\` Seste **${Voice}** kullanıcı bulunmaktadır.
    \`❯\` Sunucuya toplam **${Boost}** takviye yapılmıştır. 
    `))
    }
exports.help = {
    name: 'say'
}

exports.conf = {
    aliases: []
}