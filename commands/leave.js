exports.run = (client, message, args, ops) => {
    if(!message.member.voiceChannel) return message.channel.send("You arent connected to a voice channel.");
    //checks if the author is connected to a voice channel
    if(!message.guild.me.voiceChannel) return message.channel.send("Sorry the bot isnt connected to the guild");
    //checks if the bot is connected to a voice channel
    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Sorry you arent connected to the same channel");
    //checks if the author and the bot are in the same channel
    message.guild.me.voiceChannel.leave();
    //leave the voice channel
    message.channel.send("Leaving Channel...")
}