const { MessageEmbed } = require('discord.js')
const disbut = require('discord-buttons')
const db = require('quick.db')
const moment = require('moment')
moment.locale("tr")
require("discord-reply")
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setTimestamp()
        if(![ayarlar.RegisterStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission(8)) return message.lineReply(embed.setDescription(`Bu komudu kullanmak için gerekli rollere veya izinlere sahip değilsin.`))
        
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user || user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(embed.setDescription("Lütfen bir kullanıcı belirt."))
        if(!args[1]) return message.lineReply(embed.setDescription("Kişiyi kaydetmem için bir isim belirtmelisin."))

        let name_1 = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
        let age = Number(args[2]);
        let fix = user.user.username.includes(ayarlar.Tag) ? ayarlar.Tag : ayarlar.Untag
        let name_2
        if(age) name_2 = `${fix} ${name_1} | ${age}`
        if(!age) name_2 = `${fix} ${name_1}`
        await user.setNickname(name_2);

   //if(!user.roles.cache.has(settings.ManRole) && !user.roles.cache.has(settings.WomanRole)) return message.lineReply(embed.setDescription(`${user} zaten sunucumuzda kayıtlı.`))

    var button_1 = new disbut.MessageButton()
    .setID("MAN")
    .setLabel("Erkek")
    .setEmoji("918909477275701249")
    .setStyle("blurple")

    var button_2 = new disbut.MessageButton()
    .setID("WOMAN")
    .setLabel("Kadın")
    .setEmoji("918909554467700747")
    .setStyle("blurple")

    let kayitbasarili = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic:true}))
    .setDescription(`${user} kişisinin ismi başarıyla \`"${name_2}"\` olarak değiştirildi.\nLütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.`)
    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
    .setTimestamp()
    let msg = await message.channel.send(kayitbasarili, {
        buttons: [ button_1, button_2 ]
    })

    var filter = (button) => button.clicker.user.id === message.author.id;

    let collector = await msg.createButtonCollector(filter, { time: 30000 })

    collector.on("collect", async (button) => {
        message.react("<a:tik2:895682510225301526>")
        if(button.id === "MAN") {
            db.add(`erkek_${message.author.id}`, 1)
            db.add(`toplam_${message.author.id}`, 1)
            db.push(`kke_${user.id}`, `${message.author.id} \`${moment(Date.now()).format("LLL")}\` (<@&${ayarlar.Man1}>)`)
            db.push(`isimler_${user.id}`, ` \`${name_2}\` (<@&${ayarlar.Man1}>)`);
            user.roles.add(ayarlar.Man1)
            user.roles.add(ayarlar.Man2)
            await button.reply.think(true)
            await button.reply.edit(`${user} adlı kişi \`${name_2}\` ismi ile **ERKEK** olarak kayıt oldu.`)
        }
        if(button.id === "WOMAN") { 
            db.add(`kadin_${message.author.id}`, 1)
            db.add(`toplam_${message.author.id}`, 1)
            db.push(`kke_${user.id}`, `${message.author.id} \`${moment(Date.now()).format("LLL")}\` (<@&${ayarlar.Woman1}>)`)
            db.push(`isimler_${user.id}`, ` \`${name_2}\` (<@&${ayarlar.Woman1}>)`);
            message.react("<a:tik2:895682510225301526>")
            user.roles.add(ayarlar.Woman1)
            user.roles.add(ayarlar.Woman2)
            await button.reply.think(true)
            await button.reply.edit(`${user} adlı kişi \`${name_2}\` ismi ile **KADIN** olarak kayıt oldu.`)           
        }
        collector.on("end", async () => {
            msg.delete();
          });
        
    })
    }
exports.help = {
    name: 'isim'
}
exports.conf = {
    aliases: ['kayıt', 'e', 'erkek', 'k', 'kadın', 'kız']
} 