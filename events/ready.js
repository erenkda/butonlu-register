const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`${client.user.tag} ismi ile giriş yapıldı, developed by moment.`); 
  client.user.setPresence({ activity: { name: 'developed by cherry bro' }, status: 'idle' })
}; 