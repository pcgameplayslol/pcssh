exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send("There is currently no music playing in the guild");
    if(message.channel.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Sorry you arent in the same channel as the bot.");
    if(fetched.dispatcher.paused) return message.channel.send("This music isnt paused.");
    fetched.dispatcher.resume();
    message.channel.send(`Succesfully resumed ${fetched.queue[0].songTitle}`);

}