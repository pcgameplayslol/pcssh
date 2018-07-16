const ytdl = require ("ytdl-core");
exports.run = async (client, message, args, ops) => {
    console.log(args[0])
    if(!message.member.voiceChannel) return message.channel.send("You must be in a voice channel.");
    //checks if the author is connected to a voice channel
    if(!args[0]) return message.channel.send("Sorry please input a url following the command");
    //Checks if the author input a url
    let validate = await ytdl.validateURL(args[0]);
    //validate info
    if(!validate) return message.channel.send("Sorry please input a VALID url following the command");
    //Checks validation
    let data = ops.active.get(message.guild.id) || {};
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });
    if(!data.dispatcher) play(client, ops, data);
    else{
        message.channel.send(`Added to queue: ${info.title} | Requested by: ${message.author.id}`);
    }
    ops.active.set(message.guild.id, data);

}
async function play(client, ops, data) {
    client.chanels.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0].songTitle} | Requested by: ${data.queue[0].requester}`)
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: "audioonly"}));
    data.dispatcher.guildID = data.guildID;
    finish(client, ops, this);
}
function finish(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();
    if(fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client,ops ,fetched);
    } else{
        ops.active.delete(dispatcher.guildID);
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if(vc) vc.leave();
    }
}