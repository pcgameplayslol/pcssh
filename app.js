//Require Packages
const Discord = require("discord.js")
const client = new Discord.Client();
const serverStats = {
    guildID: "466620093334552580",
    totalUserID: "466851094752919562",
    memberCountID: "466851242170253312",
    botCountID: "466851333274730507"
}
client.login("NDY2NjE5MzA4ODMxOTMyNDE3.DimePQ.mrguG0YZzISUTL2_JwGdeRXSCS4");
//Constant Variables
const prefix = "ssh."
const ownerID = "295725064454668290"
const active = new Map();

//Listener Events
client.on("message", message => {

//Variables
let args = message.content.slice(prefix.length).trim().split(" ")
let cmd = args.shift().toLowerCase();

//Return Staments
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

//Command Handler
try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    //Options
    let ops = {
    ownerID: ownerID,
    active: active
    }

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);
} catch (e){//e is for catching any error in the console
    console.log(e.stack)
    
}
});

client.on("guildMemberAdd", (member) => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
});

client.on("guildMemberRemove", member => {
    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
});

client.on('ready', async () => {
  console.log('Ready!');
  client.user.setActivity("Ankle Breaker Simulator");
});


