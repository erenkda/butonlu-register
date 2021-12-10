const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
moment.locale('tr')
const disbut = require('discord-buttons')
    module.exports.run = async (client, message, args) => {
        if(message.author.id !== "852785674876092426") return;
        if (!args[0]) return message.channel.send("Kod Belirt!")
        let code = args.join(" ");
        function clean(text) {
            if (typeof text !== "string")
                text = require("util").inspect(text, { depth: 0 });
            text = text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
        }
        try {
            var result = clean(await eval(code));
            if (result.includes(client.token))
                return message.channel.send("tokenim karşm: ``token istiyosan sg başka yerde ara``");
            message.channel.send(result, { code: "js", split: true });
        } catch (err) {
            message.channel.send(err, { code: "js", split: true });
        }
    }
    exports.help = {
        name: 'eval'
    }
    exports.conf = {
        aliases: []
    }