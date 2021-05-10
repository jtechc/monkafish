import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: 'leave',
  aliases: ['stop', 's'],
  category: 'Music',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Stop the current song and leave the channel',
  async callback({ message }) {
    const channel = message.member?.voice.channel;
    if (!channel)
      return message.channel.send(
        'You need to be in a voice channel to stop the music!'
      );

    channel.leave();
    message.channel.send('Leaving channel :smiling_face_with_tear:');
  },
} as Command;
