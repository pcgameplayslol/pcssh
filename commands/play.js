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
    let info = await ytdl.getInfo(args[0]);
    //fetch video info
    let conneciton = await message.member.voiceChannel.join();
    //store author guild channel
    let stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'})
    let dispatcher = await conneciton.playStream(stream);
    //plays song
    message.channel.send(`Now Playing: ${info.title}`);
}