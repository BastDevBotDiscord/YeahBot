const config = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const superagent = require("superagent");
const fs = require('fs');
const ascii = require('ascii-art');

bot.on('ready', () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  setInterval(changing_status, 4000);

  function changing_status() {
    let status = [`${bot.guilds.size} serveurs`, `Mon créateur Lousestone #9572!`, `yeah.help pour voir les commandes`, "Version [2.2.9]", `${bot.users.size} utilisateurs`, bot.ping + 'ms',"#roadto10servs"]
    let random = status[Math.floor(Math.random() * status.length)]
    
    bot.user.setGame(random, 'https://twitch.tv/user');
    
  
}

});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let coins = require("./coins.json");
    


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

   //Infoserv
   if (command === `${prefix}infoserv`) {
   let servIcon = message.guild.iconURL;
   let servEmbed = new Discord.RichEmbed()
     .setDescription('Informations sur le serveur')
     .setColor('RANDOM')
     .setThumbnail(servIcon)
     .addField('Nom du serveur', message.guild.name)
     .addField('Nombre total de mebres', message.guild.memberCount)
     .addField('Créer le', message.guild.createdAt)
     .addField('Vous avez rejoins le ', message.member.joinedAt)
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
    }

  //Info
  if (command === `${prefix}help`) {
  let botIcon = bot.user.displayAvatarURL
    let embed = new Discord.RichEmbed()
     .setDescription('Informations sur le bot')
     .setColor('RANDOM')
     .setThumbnail(botIcon)
     .addField('Nom du bot', bot.user.username)
     .addField('Créer le ', bot.user.createdAt)
     .addField('Commandes', '-------------')
     .addField("Général :speech_balloon:", '```say,chatglobal,ascii```')
     .addField(`Informations :bar_chart:`, '```help,infoserv,invite,serverlist```')
     .addField('Images :frame_photo:','```cat,dog```')
     .addField('Modérations :lock:','```kick,ban,report,warn,seewarns,deletewarn```')
     .addField('Administration :lock:','```clear,ping,addrole,removerole,sondage```')
     .addField('Money', '```money,addmoney```')
     .setFooter("Info")
     .setTimestamp();
     
    return message.channel.send(embed);
  }

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
    let messageToBot = args.join(' ');
    message.delete().catch();
    message.channel.send(messageToBot);
  }
  //Invite
  if (command === `${prefix}invite`) {
    let botIcon = bot.user.displayAvatarURL
      let embed = new Discord.RichEmbed()
       .setDescription('Invitation du bot')
       .setColor('RANDOM')
       .setThumbnail(botIcon)
       .addField('Nom du bot', bot.user.username)
       .addField("Tu veux m'inviter ? ", "[Génial ! Tiens voilà le lien](https://discordapp.com/oauth2/authorize?client_id=521110161176264734&scope=bot&permissions=8)")
       .addField("Serveur Support","[Génial ! Tiens voilà le lien](https://discord.gg/UWTCAQj)")
       .addField("Code du Bot","[Lien](https://github.com/BastDevBotDiscord/YeahBot/tree/master/.gitignore)")
       .setFooter("Invite")
       .setTimestamp();
       
      return message.channel.send(embed);
    };

  //Ping
  if (command === `${prefix}ping`) {
    let botIcon = bot.user.displayAvatarURL
      let embed = new Discord.RichEmbed()
       .setDescription('Latence des messages du bot')
       .setColor('RANDOM')
       .setThumbnail(botIcon) 
       .addField("Latence avec l'API de Discord", bot.ping + 'ms')
       .setFooter("Ping")
       .setTimestamp();
      return message.channel.send(embed);
    };

    //ServerList
   if (command === `${prefix}serverlist`) {
    let botIcon = bot.user.displayAvatarURL
      let embed = new Discord.RichEmbed()
       .setTitle('ServerList')
       .setColor('RANDOM')
       .setThumbnail(botIcon) 
       .addField(bot.guilds.map(r => r.name + ` | **${r.memberCount} membres**`, "Ajoutez le bot sur plus de serveurs pour qu'on atteigne les 20 serveurs !"))
       .setFooter("Serverlist")
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

  const sondageEmbed = new Discord.RichEmbed()
  .setTitle(`Sondage`)
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
   .setTitle('Message Global YeahBot')
   .addField("Pseudo de l'utilisateur", message.author.username + "#"+ message.author.discriminator, true)
   .addField("Serveur", message.guild.name, true)
   .addField("Message", args)
   .setFooter("Chat-Global")
   .setTimestamp();
   bot.channels.findAll('name', 'chat-global').map(channel => channel.send(embedglobal))
  
};

//Warns

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

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

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

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
    
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
    
                if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
    
                  delete warns[message.guild.id][mentioned.id];
    
                }
    
                message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
    
                return;
    
              } if (args[1] === "tout") {
    
                delete warns[message.guild.id][mentioned.id];
    
                fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
    
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
.addField("💸", uCoins);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

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

 });

bot.login(config.token);

bot.on("guildMemberAdd", member => {
  member.guild.channels.find("name", "😉bienvenue😉").send(`Bienvenue ${member}, passe un bon moment`)
})

bot.on("guildDelete", async guild  => {
  console.log(`J'ai été retiré de ${guild.name} :id: ${guild.id}  Ils avaient ${guild.memberCount} membres`);
});

bot.on("guildCreate", guild => {
  console.log(`J'ai rejoins ce serveur ! ${guild.name} (id: ${guild.id}). Ils ont  ${guild.memberCount} members!`);
});
