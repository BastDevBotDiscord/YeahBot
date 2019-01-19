const config = require('./JSON/config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const superagent = require("superagent");
const fs = require('fs');
const ascii = require('ascii-art');
const weather = require('weather-js');
const ms = require("ms");
var request = require('request');
var cheerio = require('cheerio');
const Fortnite = require("fortnite-api");
const Client = require('fortnite');
const fortnite = new Client("d4d353a9-13b1-4008-9871-70039c554df0");
const base64 = require("js-base64").Base64;
const moment = require("moment");
const { version } = require("discord.js");
const m = require("moment-duration-format");
let os = require('os');
let cpuStat = require("cpu-stat");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAIlEmf92ilmKxH6EkFkqYNtE1zTU7iAxM");
const queue = new Map();
const randomPuppy = require('random-puppy');
const send = require(`quick.hook`)
var servers = {};


bot.on('ready', () => {
let conssolechannel = bot.channels.get(`531535501316980746`);


    conssolechannel.send(`Bot allumé sur ${bot.guilds.size} serveurs :white_check_mark: `)


  })

bot.on('ready', () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  setInterval(changing_status, 4000);

  function changing_status() {
    let status = [`${bot.guilds.size} serveurs`, `Mon créateur Winstone !`, `yeah.help pour voir les commandes`, "Version [2.3.1]", `${bot.users.size} utilisateurs`, bot.ping + 'ms',"#roadto20servs", "Musique ?  yeah.play ","Radio ? yeah.nrj,yeah.funradio,yeah.syrock fait yeah.help pour connaitre les autres !"]
    let random = status[Math.floor(Math.random() * status.length)]
    
    bot.user.setGame(random, 'https://twitch.tv/user');

    
    
  
}

});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
      const clean = text => {
          if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
          else
              return text;
        }
}

function getStatData(location, $) {

  var selector = $('.stats-stat .value').eq(location).text();

  var stat_array = $.parseHTML(selector);

  var stat = 0;

  if (stat_array == null || stat_array.lengh == 0) {
      return -1;

  } else {
      stat = stat_array[0].data;
  }

  return stat;
}







bot.on('message', async message => {
    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let coins = require("./JSON/coins.json");

    

  if (command === `${prefix}restart`){
    resetBot(message.channel);
            function resetBot(channel) {
                message.react('✅')
                message.channel.send('**Rédemarrage en cours**')
                    .then(message => bot.destroy())
                    .then(() => bot.login(config.token))
                    .then(() => message.channel.send('**Redémarrage éffectué**'))
}
  }
  //Kick
   if (command === `${prefix}kick`) {
   let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!kickedUser) {
      return msg.channel.send("Lutilisateur nexiste pas !");
    }
      let kickReason = args.join(" ").slice(22);
      if(!message.member.hasPermission("KICK_MEMBERS")) {
          return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
      }
      if(kickedUser.hasPermission("ADMINISTRATOR")){
        return message.channel.send("Vous ne pouvez pas kick cette personne !");
      }


      let kickEmbed = new Discord.RichEmbed()
        .setDescription('Kicks')
        .setColor('RANDOM')
        .addField("Utilisateur kické", `${kickedUser} (ID: ${kickedUser.id})`)
        .addField("Utilisateur ayant kické", `${message.author} (ID: ${message.author.id})`)
        .addField("Canal", message.channel)
        .addField("Raison", kickReason)
        .setFooter("Kick")
        .setTimestamp();
        
        
       let kickChannel = message.guild.channels.find(`name`, "reports");
       if (!kickChannel) {
           return message.channel.send("Canal Reports Intouvable, Veuillez le créer !");
       }

       message.guild.member(kickedUser).kick(kickReason);
       kickChannel.send(kickEmbed);
      }

      if (command ===`${prefix}lock`){
      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have permission to lockdown or unlock!')
        .then(msg => msg.delete({
            timeout: 10000
        }));
    if (!bot.lockit) bot.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock'];
    if (!time) return message.channel.send('You must set a duration for the lockdown in either hour(s), minute(s) or second(s)');

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
            })
            .then(() => {
                message.channel.send('Channel debloqué.');
                clearTimeout(bot.lockit[message.channel.id]);
                delete bot.lockit[message.channel.id];
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            })
            .then(() => {
                message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`)
                    .then(() => {

                        bot.lockit[message.channel.id] = setTimeout(() => {
                            message.channel.overwritePermissions(message.guild.id, {
                                    SEND_MESSAGES: false
                                })
                                .then(message.channel.send('Channel débloqué'))
                                .catch(console.error);
                            delete bot.lockit[message.channel.id];
                        }, ms(time));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    }
  }
      
  
  




        if (command ===`${prefix}help`) {
          let bicon = bot.displayAvatarURL
          let helpembed = new Discord.RichEmbed()
          .setTitle("Commandes d'aides")
          .setThumbnail(bicon)
          .setFooter("Commandes d'aides")
          .addField('**Commandes** **(58)**', '-------------')
          .addField("**Général :speech_balloon:** **(3)**", '```say,chatglobal,ascii```')
          .addField(`**Informations :bar_chart:** **(5)**`, '```help,infoserv,invite,serverlist,stats```')
          .addField('**Images :frame_photo:** **(2)**','```cat,dog```')
          .addField('**Modérations :lock:** **(9)**','```mute,unmute,lockdown,kick,ban,report,warn,seewarns,deletewarn```')
          .addField('**Administration :lock:** **(5)**','```clear,ping,addrole,removerole,sondage```')
          .addField('**Money** **(2)**', '```money,addmoney```')
          .addField("**Fun**:tada:**(7)**","```smoke,remind,id,b64encode,b64decode,weather,avatar```")
          .addField("**Plugin (1)**","```Anti-insultes (Veuillez envoyez vos insultes à Winstone#9572 pour blacklist des insultes !) ```")
          .addField("**Musique ? (8)**","```play,volume,skip,stop,resume,pause,queue,np```")
          .addField("Radio ?(16) ","```nrj,skyrock,ouifm,sweetfm,witfm,horizon,funradio,franceinter,franceculture,rtl2,rmc,virgin,nostalgie,rirechansons,radiocristal,alouette```")
          .addField("**Nsfw? (1)**","```4k```")
          .setTimestamp()
          .setColor('RANDOM');



          message.channel.send(helpembed)
        }
      
            

      

   //Infoserv
   if (command === `${prefix}infoserv`) {
   let servIcon = message.guild.iconURL;
   let servEmbed = new Discord.RichEmbed()
     .setTitle('Informations sur le serveur')
     .setColor('RANDOM')
     .setThumbnail(servIcon)
     .addField('Nom du serveur', message.guild.name)
     .addField('Nombre total de membres', message.guild.memberCount)
     .addField('Créer le', message.guild.createdAt)
     .addField('Vous avez rejoins le ', message.member.joinedAt)
     .addField('ID', message.guild.id)
     .addField('Owner', message.guild.owner.user.tag)
     .addField('Dernier membres', `${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1)}`)
     .addField('Channels', `**${message.guild.channels.filter(channel => channel.type === 'text').size}** text - **${message.guild.channels.filter(channel => channel.type === 'voice').size}** audio`)
     .addField('Channel AFK', message.guild.afkChannel)
     .addField('Roles', `**${message.channel.guild.roles.size}**`)
     .addField('Emojis', `${message.guild.emojis.map(e => e).join(', ')}`)
     .setFooter("Infoserv")
     .setTimestamp();
     

     return message.channel.send(servEmbed)
    }

  //Ban
  if (command === `${prefix}ban`) {
  let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bannedUser) {
    return message.channel.send("Lutilisateur nexiste pas !");
  }
    let banReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
    }
    if(bannedUser.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Vous ne pouvez pas ban cette personne !");
    }
  

    let banEmbed = new Discord.RichEmbed()
      .setDescription('Bans')
      .setColor('RANDOM')
      .addField("Utilisateur banni", `${bannedUser} (ID: ${bannedUser.id})`)
      .addField("Utilisateur ayant banni", `${message.author} (ID: ${message.author.id})`)
      .addField("Canal", message.channel)
      .addField("Raison", banReason)
      .setFooter("Ban")
      .setTimestamp();
      
      
     let banChannel = message.guild.channels.find(`name`, "reports");
     if (!banChannel) {
         return message.channel.send("Canal Reports Intouvable, Veuillez le créer !");
     }

     message.guild.member(bannedUser).ban(banReason);
     banChannel.send(banEmbed);
    
    };

  
  
   //Report
   if (command === `${prefix}report`) {
    let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!reportedUser) {
      return msg.channel.send("Lutilisateur nexiste pas !");
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
  }

    let reportedReason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
     .setDescription('Reports')
     .setColor('RANDOM')
     .addField("Utilisateur reporté", `${reportedUser} (ID: ${reportedUser.id})`)
     .addField("Utilisateur ayant reporté", `${message.author} (ID: ${message.author.id})`)
     .addField("Canal", message.channel)
     .addField("Raison", reportedReason)
     .setFooter("Report")
     .setTimestamp();
     
     
    let reportChannel = message.guild.channels.find(`name`, "reports");
    if (!reportChannel) {
        return message.channel.send("Canal Reports Intouvable, Veuillez le créer !")
    }
    message.delete();
    reportChannel.send(reportEmbed);

   }

   //Clear
   if (command === `${prefix}clear`) {
     if (!message.member.hasPermission("MANAGE_MESSAGES"))
     return message.reply("Vous n'avez pas la permission");
   if (!args[0]) return message.reply("Syntaxe = yeah.clear <Nombre de messages à supprimer>");
   
   message.channel.bulkDelete(args[0]).then(() => {
     message.channel.send(`:white_check_mark: J'ai supprimé ***${args[0]} messages*** pour vous :white_check_mark: `).then(msg => msg.delete(2000))
    
   });
  
   };

   //Say
   if (command === `${prefix}say`) {
    let messageTobot = args.join(' ');
    message.delete().catch();
    message.channel.send(messageTobot);
  }
  //Invite
  if (command === `${prefix}invite`) {
    let botIcon = bot.user.displayAvatarURL
      let embed = new Discord.RichEmbed()
       .setDescription('Invitation du bot')
       .setColor('RANDOM')
       .setThumbnail(botIcon)
       .addField('Nom du bot', bot.user.username)
       .addField("Tu veux m'inviter ? ", "[Génial ! Tiens voilà le lien](https://discordapp.com/oauth2/authorize?bot_id=521110161176264734&scope=bot&permissions=8)")
       .addField("Serveur Support","[Génial ! Tiens voilà le lien](https://discord.gg/UWTCAQj)")
       .addField("Code du bot","[Lien](https://github.com/BastDevbotDiscord/Yeahbot/tree/master/.gitignore)")
       .setFooter("Invite")
       .setTimestamp();
       
      return message.channel.send(embed);
    };

  //Ping
  if (command === `${prefix}ping`) {
    let botIcon = ""
      let embed = new Discord.RichEmbed()
       .setDescription('Latence des messages du bot')
       .setColor('RANDOM')
       .setThumbnail("https://emojis.slackmojis.com/emojis/images/1464135097/464/fb-like.gif?1464135097") 
       .addField("Latence avec l'API de Discord", bot.ping + 'ms')
       .setFooter("Ping")
       .setTimestamp();
      return message.channel.send(embed);
    };
    
  

    //Addrole
   if (command === `${prefix}addrole`) {
    let memberRole = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!memberRole) {
    return msg.channel.send("Lutilisateur nexiste pas !");
  }
    let roleToAdd = args.join(" ").slice(22);
    if(!roleToAdd) return message.channel.send('Spécifier un rôle !')
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
    }

    let role = message.guild.roles.find(`name`, roleToAdd);
    if(!role) return message.channel.send('Role introuvable !');

    if(memberRole.roles.has(role.id)) return message.channel.send('Cet utilisateur a déjà ce role !');
    await memberRole.addRole(role.id);
    
    try {
      await memberRole.send(`Bravo, tu as reçu le role ${role.name} avec succès `)
    } catch (e) {
      message.channel.send(`Bravo ${memberRole}, tu as reçu le role ${role.name}`)
    }
  };


  //Removerole
  if (command === `${prefix}removerole`) {
    let memberRole = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!memberRole) {
    return msg.channel.send("Lutilisateur nexiste pas !");
  }
    let roleToAdd = args.join(" ").slice(22);
    if(!roleToAdd) return message.channel.send('Spécifier un rôle !')
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
    }

    let role = message.guild.roles.find(`name`, roleToAdd);
    if(!role) return message.channel.send('Role introuvable !');

    if(!memberRole.roles.has(role.id)) return message.channel.send('Cet utilisateur ne possède pas ce role !');
    await memberRole.removeRole(role.id);
    
    try {
      await memberRole.send(`Désolé, tu ne possèdes plus le role ${role.name}`)
    } catch (e) {
      message.channel.send(`Désolé ${memberRole}, tu ne possèdes plus le role ${role.name}`)
    }
  }; 

  
  //Cat
  if (command === `${prefix}cat`) {
    let { body } = await superagent.get(`http://aws.random.cat//meow`);

    let catEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle('Chat Random')
    .setImage(body.file)
    .setFooter("Cat")
    .setTimestamp();

    message.channel.send(catEmbed);
  };

  //Dog
  if (command === `${prefix}dog`) {
    let { body } = await superagent.get(`https://random.dog/woof.json`);

    let dogEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle('Chien Random')
    .setImage(body.url)
    .setFooter("Dog")
    .setTimestamp();

    message.channel.send(dogEmbed);
  };


  //8Ball
  if (command === `${prefix}8ball`) {
   if(!args[1]) return message.reply("Envoyez une question !");

   let replies = ["Oui", "Non", "Peut-être","Je ne sais pas","Fichtre Diantre mais qu'elle est cette question","Quelle question bizzare","Vous connaissez déjà la réponse"];
   let question = args.slice(0).join(" ");
   let res = Math.floor((Math.random() * replies.length));

   let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("RANDOM")
    .addField("Question", question)
    .addField("Réponse", replies[res])
    .setFooter("8Ball")
    .setTimestamp();

    message.channel.send(ballembed);
  };



  //Sondage
  if (command === `${prefix}sondage`) {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Vous n'avez pas la permission pour faire cela ! :/");
    };
 

  if (!args[0]) return msg.channel.send(`Syntaxe: ${prefix}sondage (Question)`);
  message.channel.send(' @everyone  **UN SONDAGE EST DISPONIBLE CI DESSOUS** 🎅')
  const sondageEmbed = new Discord.RichEmbed()
  .setTitle(`Sondage🎅`)
  .setColor('RANDOM')
  .setFooter(`Sondage proposé par ${message.author.username}`)
  .addField(args.join(' '), "Répondez avec ✅ ou ❌")
  .setTimestamp();

  let msg = await message.channel.send(sondageEmbed);
  await msg.react('✅');
  await msg.react('❌');
  
 };



 //Chat Global
 if (command === `${prefix}chatglobal`) {
   var y02 = message.guild.channels.find('name', 'chat-global');
   if(!y02) return message.reply("Veuillez créer le channel chat-global pour utiliser cet commande")
   if(message.channel.name !== 'chat-global') return message.reply("Commande à effectuer dans le salon chat-global svp")
   if(!args[1]) return message.reply("Veuillez écrire un message pour la globalité des serveurs");
   var embedglobal = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setTitle('Message Global Yeahbot')
   .addField("Pseudo de l'utilisateur", message.author.username + "#"+ message.author.discriminator, true)
   .addField("Serveur", message.guild.name, true)
   .addField("Message", args)
   .setFooter("Chat-Global")
   .setTimestamp();
   bot.channels.findAll('name', 'chat-global').map(channel => channel.send(embedglobal))
  
};

//Warns

let warns = JSON.parse(fs.readFileSync("./JSON/warns.json", "utf8"));

if (command === `${prefix}warn`) {

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionner aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./JSON/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

};

//Seewarns
if (command === `${prefix}seewarns`) {
  

    if (message.channel.type === "dm") return;
    
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
    
        const mentioned = message.mentions.users.first();
    
        const args = message.content.split(' ').slice(1);
    
        if (message.member.hasPermission('MANAGE_GUILD')){
    
          if (message.mentions.users.size !== 0) {
    
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
    
              try {
    
                if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
    
                  message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
    
                  return;
    
                }
    
              } catch (err) {
    
                message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
    
                return;
    
              }
    
              let arr = [];
    
              arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
    
              for (var warn in warns[message.guild.id][mentioned.id]) {
    
                arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
    
                "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** **le** **"+warns[message.guild.id][mentioned.id][warn].time+"**");
    
              }
    
              message.channel.send(arr.join('\n'));
    
            } else {
    
              message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
    
              console.log(args);
    
            }
    
          } else {
    
            message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
    
          }
    
        } else {
    
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    
        }
    
      };
    

  //DeleteWarns
  if (command === `${prefix}deletewarn`) {

    if (message.channel.type === "dm") return;
    
    if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
    
       const mentioned = message.mentions.users.first();
    
        const args = message.content.split(' ').slice(1);
    
        const arg2 = Number(args[1]);
    
        if (message.member.hasPermission('MANAGE_GUILD')){
    
          if (message.mentions.users.size != 0) {
    
            if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
    
              if (!isNaN(arg2)) {
    
                if (warns[message.guild.id][mentioned.id] === undefined) {
    
                  message.channel.send(mentioned.tag+" n'a aucun warn");
    
                  return;
    
                } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
    
                  message.channel.send("**:x: Ce warn n'existe pas**");
    
                  return;
    
                }
    
                delete warns[message.guild.id][mentioned.id][arg2];
    
                var i = 1;
    
                Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
    
                  var val=warns[message.guild.id][mentioned.id][key];
    
                  delete warns[message.guild.id][mentioned.id][key];
    
                  key = i;
    
                  warns[message.guild.id][mentioned.id][key]=val;
    
                  i++;
    
                });
    
                fs.writeFile("./JSON/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
    
                if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
    
                  delete warns[message.guild.id][mentioned.id];
    
                }
    
                message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
    
                return;
    
              } if (args[1] === "tout") {
    
                delete warns[message.guild.id][mentioned.id];
    
                fs.writeFile("./JSON/warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
    
                message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
    
                return;
    
              } else {
    
                message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
    
              }
    
            } else {
    
              message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
    
            }
    
          } else {
    
           message.channel.send("Erreur mauvais usage: "+prefix+"deletewarn <utilisateur> <nombre>");
    
          }
    
        } else {
    
          message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    
        }
    
      }
  

  //Ascii
  if (command === `${prefix}ascii` ) {
  ascii.font(args.join(' '), 'Doom', function(rendered) {
    rendered = rendered.trimRight();
    if (rendered.length > 2000) return message.channel.send('Désolé ce message est trop long :(')
    message.channel.send(rendered, {
       code: 'md'
    });
  });
  
};

//Coins
if (command === `${prefix}money` ) {
if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let uCoins = coins[message.author.id].coins;


let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("RANDOM")
.setAuthor(message.author.username, message.author.avatarURL)
.addField("💸", uCoins)
.setFooter("Money |")
.setTimestamp();
message.channel.send(coinEmbed)

}

 //Addmoney
 if (command === `${prefix}addmoney` ) {
   if(!coins[message.author.id]){
    return message.reply("Vous n'avez pas d'argent")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Not enough coins there!");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });


}





if (message.content.startsWith(prefix + "eval")) {
  if(message.author.id !== "396266406272040960") return;
  
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}


  if (command === `${prefix}serverlist`) {
  var servembed = new Discord.RichEmbed()
  .setTitle("Serveur du bot")
  .setColor("RANDOM")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription(`**__Serveurs au Total__**: ${bot.guilds.size}`)
  .addField("**Serveurs Du bot**:", bot.guilds.map(r => `\n**${r.name}**` + `\n Owner ID: ${r.owner.id}` + ` | **${r.memberCount}** Membres`))
  .setFooter("Serverlist |")
  .setTimestamp();
  message.channel.send(servembed);
 };


 if (command === `${prefix}weather`) {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
  
    if(!result) return message.channel.send("Merci de préciser votre ville");
      
          var current = result[0].current;
          var location = result[0].location;
    
          var embed = new Discord.RichEmbed()
              .setDescription(`**${current.skytext}**`)
              .setAuthor(`Temps pour ${current.observationpoint}`)
              .setThumbnail(current.imageUrl)
              .setColor("RANDOM")
              .addField('Plage horaire ',`UTC${location.timezone}`, false)
              .addField('Température ',`${current.temperature} °C`, false)
              .addField('Ressenti ', `${current.feelslike} °C`, false)
              .addField('Vents ',current.winddisplay, false)
              .addField('Humidité', `${current.humidity}%`, false)
              .setFooter("Weather |")
              .setTimestamp();
               message.channel.send(embed);
 })
 };



 if (command === `${prefix}smoke`) {

    message.channel.send('**BISSSSHES IM SMOKING**').then(async msg => {
        setTimeout(() => {
            msg.edit('🚬');
        }, 500);
        setTimeout(() => {
            msg.edit('🚬 ☁ ');
        }, 1000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁ ');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁ ');
        }, 2000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁');
        }, 2500);
        setTimeout(() => {
            msg.edit('🚬 ☁');
        }, 3000);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 3500);
        setTimeout(() => {
            msg.edit(`Finished smoking`);
        }, 4000);
   });
 };


if (command === "yeah.remind") {


    let reminderTime = args[0];
    if (!reminderTime) return message.channel.send("**Spécifiez un temps pour que je vous le rappelle. Exemple: yeah.remind 15min tout texte ou code**");

    let reminder = args.slice(1).join(" ");

    let remindEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("Rappel", `\`\`\`${reminder}\`\`\``)
        .addField("Temps", `\`\`\`${reminderTime}\`\`\``)
        .setTimestamp();

    message.channel.send(remindEmbed);


    setTimeout(function() {
        let remindEmbed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField("Rappel", `\`\`\`${reminder}\`\`\``)
            .setTimestamp()

        message.channel.send(remindEmbed);
    }, ms(reminderTime));

}
if(message.content.startsWith(prefix + 'id')) {
  if (message.channel.type === "dm") return;   
   message.channel.sendMessage(`**${message.author.username} **` + "Voici ton ID: " + `__${message.author.id}__`);
}

if (command === `${prefix}csgo`) {
   var UR_L = "http://csgo.tracker.network/profile/" + args[0];

    if (!args[0]) {
        return message.channel.send(":x: Please Enter a valid STEAMID64 or custom url");
    }

    request(UR_L, function(err, resp, body) {

        $ = cheerio.load(body);

        var KD = getStatData(0, $);
        if (KD == -1) {
            message.channel.send(":x: Invalid, make sure your profile is not private and you have entered a valid STEAMID64 or Custom URL!");
            return;
        }

        var WIN = getStatData(1, $);
        var HS = getStatData(4, $);
        var MONEY = getStatData(5, $);
        var SCORE = getStatData(6, $);
        var KILLS = getStatData(7, $);
        var DEATHS = getStatData(8, $);
        var MVP = getStatData(9, $);
        var BS = getStatData(13, $);
        var BD = getStatData(14, $);
        var HR = getStatData(15, $);

        var STAT = new Discord.RichEmbed()

            .setTitle("__***CSGO Stats***__")
            .setURL(UR_L)
            .setColor("0x#FF0000")
            .addField("Total KD", KD, true)
            .addField("Win", `${WIN}%`, true)
            .addField("Total Hostages Saved", HR, true)
            .addField("Total Money", MONEY, true)
            .addField("Total Score", SCORE, true)
            .addField("Total Kills", KILLS, true)
            .addField("Total Deaths", DEATHS, true)
            .addField("MVP", MVP, true)
            .addField("Total Bombs Set", BS, true)
            .addField("Total Bombs Defused", BD, true)
            .addField("Total Headshots", HS, true);


        message.channel.send(STAT);

    })
 };

 if(message.content.includes("wtf")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
}
  if(message.content.includes("fuck")){
    message.delete();
    message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})}
    
    
  if(message.content.includes("bitch")){
    message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})}
  


 if(message.content.includes("fdp")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
   
}

if(message.content.includes("sexe")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
  
}

if(message.content.includes("ntm")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("va niquer tes morts")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  

 
}
if(message.content.includes("salope")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("beurette")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("pute")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("ta mere")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("suce ma bite")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
if(message.content.includes("bite")){
  message.delete();
  message.reply("***Ce mot est interdit !***:rage:") .then(xnxx => {xnxx.delete(5000)})
  
 
}
 if (command === `${prefix}b64encode`){
  const b64Encoded = base64.encode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Encoded}\`\`\``);
  
 };

 if (command === `${prefix}b64decode`){
  const b64Decoded = base64.decode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Decoded}\`\`\``);

 };
 if (command === `${prefix}stats`){
  let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username)
            .setTitle("***bot Stats***")
            .setColor("RANDOM")
            .addField("• Utilisation de la RAM", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("• Uptime ", `${duration}`, true)
            .addField("• Utilisateurs", `${bot.users.size.toLocaleString()}`, true)
            .addField("• Serveurs", `${bot.guilds.size.toLocaleString()}`, true)
            .addField("• Channels ", `${bot.channels.size.toLocaleString()}`, true)
            .addField("• Discord.js", `v${version}`, true)
            .addField("• Node", `${process.version}`, true)
            .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
            .addField("• Arch", `\`${os.arch()}\``, true)
            .addField("• Platform", `\`\`${os.platform()}\`\``, true)
            .addField("Latence API", `${Math.round(bot.ping)}ms`)  
        message.channel.send(embedStats)
    });
 };
 


 if (command === `${prefix}avatar`) {
  
  message.channel.startTyping(); // TELLS YOUR HANDICAPPED bot TO START TYPING! ;)


  let msg = await message.channel.send('``Géneration de cet avatar sexy !``') //UNNECESSARY BUT COOL.

  let user = message.mentions.users.first() || message.author; //THIS IS IMPORTANT BECAUSE YOU WANT YOUR bot TO SHOW OTHER PEOPLE'S AVATAR AS WELL BY MENTIONING THEM!

  // AVATAR EMBED

  let embed = new Discord.RichEmbed() //HERE WE DEFINE THE EMBED
      .setAuthor(`Avatar de ${user.username}`) //HERE WE SHOW THE USER'S NAME!
      .setImage(user.displayAvatarURL) // USER'S AVATAR
      .setColor(msg.guild.me.highestRole.color) //SET THE EMBED COLOR TO THE HIGHEST ROLE COLOR THE bot HAS! cool right :D
      .setFooter(`Avatar`, `${user.displayAvatarURL}`) //FOOTER AND ICON
      .setTimestamp(); //SHOWS THAT COOL TIME ON THE FOOTER!

  await message.channel.send(embed) //NOW WE GIVE IT SOMETIME TO DO ALL THE CRAZY STUFF ON TOP AND THEN SEND THE EMBED!

  message.channel.stopTyping(true); // TELLS YOUR HANDICAPPED bot TO STOP TYPING! ;)

  msg.delete(); // THIS WILL DELETE (Generating that sexy avatar...) AFTER SENDING THE EMBED! This will be quick so watch out for the small details :P

 }
 
 if (command === `${prefix}4k`){
  if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

  var subreddits = [
      'NSFW_Wallpapers',
      'SexyWallpapers',
      'HighResNSFW',
      'nsfw_hd',
      'UHDnsfw'
  ]
  var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

  randomPuppy(sub)
      .then(url => {
          const embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor("4k", bot.user.avatarURL)
              .setFooter("4k")
              .setImage(url)
              .setTimestamp();
          message.channel.send({
              embed
          });
      })
 }
  
 

 if(command === `${prefix}arret`){
                if(!message.member.voiceChannel) 
                return message.channel.send("Tu dois être dans un salon vocal pour éxécuter cette commande !");
                
                message.member.voiceChannel.leave();
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Vocal :`)
                .addField("Etat :",`Je suis parti du vocal :loud_sound: `)
                .setColor('RANDOM')
                .setTimestamp();
    
                message.channel.sendMessage(info_embed);
                console.log('Le bot dit arrêt radio !');
            }
 




            if(command === `${prefix}join`){
              if(!message.member.voiceChannel) 
              return message.channel.send("Tu dois être dans un salon vocal pour éxécuter cette commande !");
              
              message.member.voiceChannel.join();
              var info_embed = new Discord.RichEmbed()
              .setAuthor(`Vocal :`)
              .addField("Etat :",`Je suis arrivé dans le vocal :loud_sound: `)
              .setColor('RANDOM')
              .setTimestamp();
  
              message.channel.sendMessage(info_embed);
              console.log('Le bot dit arrivé radio !');
          }


  

  if (command === `${prefix}ri`){
    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

    // If we can't find any role, then just default to the author's highest role
    if (!role) role = message.member.highestRole;


    // Define our embed
    const embed = new Discord.RichEmbed()
        .setColor(role.hexColor)
        .setTitle(`Role: ${role.name}`)
        .addField('Membres ayant le rôle', role.members.size)
        .addField('Hastag Couleur', role.hexColor)
        .addField('Date de création', role.createdAt.toDateString())
        .addField('Editable', role.editable.toString())
        .addField('Managed', role.managed.toString())
        .addField('ID', role.id);
    return message.channel.send({
        embed: embed
    });
  }


  if (command ===`${prefix}mute`){
    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("You need **KICK_MEMBERS** permissions for use this command.")
    const modlog = message.guild.channels.find(channel => channel.name === 'logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.")
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.send('lease specify a reason for the mute!')
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(args[0] == "help"){
      message.reply("Usage: yeah.mute <user> <reason>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "logs");
  if (!muteChannel) return message.channel.send('**Please create a channel with the name `logs`**')
  if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];

    await (user.addRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Action | Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('#D9D900')
            .setFooter("bot Version 2.3.1")
            .setTimestamp();
        modlog.send(muteembed)
  
  }

  if (command ===`${prefix}ftn`){
    let username = args[0];
    let platform = args[1];

    if(!username) return message.channel.send("Please, provide a users nickname! (Fortnite)")
    if(!platform) return message.channel.send('Did you provide a platform? Proper usage: **!fortnite <username> <platform>**') 

    let data = fortnite.user(username, platform).then(data => {
        let stats = data.stats;
        let lifetime = stats.lifetime;

        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];
        let embed = new Discord.RichEmbed()
        .setTitle("Lifetime Stats")
        .setAuthor(data.username)
        .setColor("RANDOM")
        .addField("Wins", wins, true)
        .addField("Kills", kills, true)
        .addField("Score", score, true)
        .addField("Matches Played", mplayed, true)
        .addField("Win%", winper, true)
        .addField("K/D", kd, true)
        .setTimestamp()
        .setFooter("Requested By " + message.author.tag, message.author.avatarURL)

        message.channel.send(embed);
    }).catch((err) => {
      message.channel.send('User not found!');
      console.error(err);
    });
  }

  if (command === `${prefix}unmute`){
    if (!message.member.hasPermissions ('KICK_MEMBERS')) return message.channel.send("You need **KICK_MEMBERS** permissions for use this command.")
    const modlog = message.guild.channels.find(channel => channel.name === 'logs');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.")
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.roles.find(`name`, "Muted")) return message.channel.send('There are\'t in muted.')
    if (!reason) return message.channel.send('lease specify a reason for the mute!')
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(args[0] == "help"){
      message.reply("Usage: yeah.unmute <user> <reason>");
      return;
    }
  let muteChannel = message.guild.channels.find(`name`, "logs");
  if (!muteChannel) return message.channel.send('**Please create a channel with the name `logs`**')

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  

    let mutetime = args[1];

    await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor(' Action | UnMute', `https://images-ext-2.discordapp.net/external/wKCsnOcnlBoNk-__BXsd6BrO6YddfUB-MtmaoaMxeHc/https/lh3.googleusercontent.com/Z5yhBQBJTSJVe5veJgaK-9p29hXm7Kv8LKF2oN0hDnsToj4wTcQbirR94XVpH4Lt5a5d%3Dw300`)
            .addField('User', `<@${user.id}>`)
            .addField('Reason', `${reason}`)
            .addField('Moderator', `${mod}`)
            .setColor('#00FF80')
            .setFooter("bot Version 2.3.1")
            .setTimestamp();
        modlog.send(muteembed)
  }

  
            
    
 });

bot.login(process.env.BOT_TOKEN);

bot.on("guildCreate", async guild => {
  let guildCreateChannel = bot.channels.get(`526472099263676436`);

    const joinEmbed = new Discord.RichEmbed()
      .setTitle("❤️ On m'a ajouté ❤️")
      .setColor('RANDOM')
      .setThumbnail(guild.iconURL)
      .addField('ℹ️ Info du serveur ℹ️ ', `📇 Nom: **${guild.name}** \n  🤴Propriétaire: <@${guild.ownerID}> (**${guild.owner.user.username}**#${guild.owner.user.discriminator}) \n 🎅Membres: **${guild.memberCount}** \n 🆔ID: **${guild.id}**`)
      
    return guildCreateChannel.send(joinEmbed);
  });

bot.on("guildDelete", async guild => {
  let guildDeleteChannel = bot.channels.get(`526472099263676436`);
  
  const leaveEmbed = new Discord.RichEmbed()
    .setTitle(" 💔On m'a expulser💔 ")
    .setColor('RANDOM')
    .setThumbnail(guild.iconURL)
    .addField(' ℹ️ Info du serveur ℹ️ ', `📇 Nom: **${guild.name}** \n 🤴 Propriétaire: <@${guild.ownerID}> (**${guild.owner.user.username}**#${guild.owner.user.discriminator}) \n 🎅 Membres: **${guild.memberCount}** \n 🆔 ID: **${guild.id}**`)
  
    return guildDeleteChannel.send(leaveEmbed);
});





var prefix = "yeah."

bot.on("message", async message => {

  var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
    var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "play":
    var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('Vous devez être dans channel vocal pour écouter de la musique !');
        var permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send("Je ne peux pas me connecter veuillez vérifier que j'ai bien les permissions !");
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send("Je ne peux pas parler veuillez vérifier que j'ai bien les permissions !");
        }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** a bien été ajoutée a la playlist !`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var index = 0;
                    message.channel.send(`
__**Sélections des**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Veuillez entrer un chiffre entre 1 et 10
                    `);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send('Pas de sélection ou erreur, Annulation de la sélection.');
                    }
                    var videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send("🆘 Je n'ai pas obtenu de résultats");
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
        break;
      case "skip":
        if (!message.member.voiceChannel) return message.channel.send("Vous n'êtes dans aucun channel");
        if (!serverQueue) return message.channel.send("Il n'y a pas de chanson dans la playlist donc je ne peux pas avancer de musiques");
        serverQueue.connection.dispatcher.end('Skip command has been used!');
        return undefined;
        break;
      case "stop":
        if (!message.member.voiceChannel) return message.channel.send("Vous n'êtes dans aucun channel");
        if (!serverQueue) return message.channel.send("Il n'y a pas de chanson dans la playlist donc je ne peux pas stopper de musiques");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        return undefined;
break;
      case "volume":
        if (!message.member.voiceChannel) return message.channel.send("Vous n'êtes dans aucun channel");
        if (!serverQueue) return message.channel.send("Aucune musique est en cours");
        if (!args[1]) return message.channel.send(`Le volume est à **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return message.channel.send(`J'ai changé le volume à **${args[1]}**`);
break;
      case "np":
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`🎶En joue : **${serverQueue.songs[0].title}**`);
break;
      case "queue":
        if (!serverQueue) return message.channel.send("Il n'y a aucune musique");
        return message.channel.send(`
__**Playlist**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**En joue :** ${serverQueue.songs[0].title}
        `);
break;
      case "pause":
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send("⏸ J'ai mis la musique en pause pour vous");
        }
        return message.channel.send("Il n'y a aucune musique");
break;
      case "resume":
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('▶ J ai remis la musique !');
        }
        return message.channel.send('Il n y a aucune musique');
   
 
    return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    console.log(video);
    var song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`Je ne peux pas rejoindre ce salon ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return message.channel.send(`✅ **${song.title}** a été ajoutée a la playlist`);
    }
    return undefined;
}
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
      message.channel.send('```La chanson est finie```');
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
    serverQueue.textChannel.send(`🎶 En joue :  **${song.title}**`);
}
});



bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.nrj') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Nrj Paris Françe :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://cdn.nrjaudio.fm/audio1/fr/40050/aac_64.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });


bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.skyrock') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Skyrock :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://icecast.skyrock.net/s/natio_mp3_128k?tvr_name=tunein16&tvr_section1=128mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.ouifm') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Oui Fm Blues'n'Rock :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://bluesnrock.stream.ouifm.fr/ouifmbluesnrock-128.mp3');

                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.rmc') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Rmc :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://rmc.bfmtv.com/rmcinfo-mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.rirechansons') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Rire et Chansons :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://cdn.nrjaudio.fm/audio1/fr/30401/mp3_128.mp3?origine=fluxradios');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.witfm') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Wit Fm :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://start-witfm.ice.infomaniak.ch/start-witfm-high.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.alouette') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Alouette :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://alouette.ice.infomaniak.ch/alouette-high.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.radiocristal') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Radio Cristal Basse-Normandie :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://radiocristal.ice.infomaniak.ch/radiocristal-high.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.sweetfm') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Sweet Fm Le Mans :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://stream.sweetfm.fr:8000/RBRX1-LEMANS.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.horizon') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Horizon :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://horizonradio-arras.ice.infomaniak.ch/horizonradio-arras-128');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.franceinter') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Françe Inter :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://chai5she.cdn.dvmr.fr/franceinter-midfi.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              
              }
            }
          });

bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          

if (message.content === 'yeah.rtl2') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Rtl2 :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://streaming.radio.rtl2.fr/rtl2-1-48-192');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              }
            }
          });


          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.funradio') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Fun Radio :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://streaming.radio.funradio.fr/fun-1-48-192');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.franceculture') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Françe Culture :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://direct.franceculture.fr/live/franceculture-midfi.mp3');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.nostalgie') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Nostalgie :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://cdn.nrjaudio.fm/adwz1/fr/30605/mp3_128.mp3?origine=fluxradios');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              }
            }
          });

          bot.on('message', message => {
            // Voice only works in guilds, if the message does not come from a guild,
            // we ignore it
            if (!message.guild) return;
          
            if (message.content === 'yeah.chériefm') {
              // Only try to join the sender's voice channel if they are in one themselves
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => { // Connection is an instance of VoiceConnection
                    var info_embed = new Discord.RichEmbed()
                    .setAuthor(`Radio :`)
                    .addField("Nom :",`En joue Chérie Fm :radio:`)
                    .addField("Volume :",`Volume à 50% :musical_note:`)
                    
                    
                    message.channel.sendMessage(info_embed)
                    connection.playArbitraryInput('http://cdn.nrjaudio.fm/audio1/fr/30201/mp3_128.mp3?origine=fluxradios');
                  })
                  .catch(console.log);
              } else {
                var info_embed = new Discord.RichEmbed()
                .setAuthor(`Radio :`)
                .addField("Etat :",`Merci de rejoindre un salon vocal :loud_sound: `)
    
                message.channel.sendMessage(info_embed);
              }
            }
          });





