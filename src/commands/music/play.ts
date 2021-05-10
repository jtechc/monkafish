import { Command } from '@aeroware/aeroclient/dist/types';
import ytdl from 'ytdl-core';
import ytSearch from 'yt-search';

export default {
  name: 'play',
  aliases: ['p', 'song'],
  category: 'Music',
  minArgs: 1,
  usage: '<song link>',
  cooldown: 5,
  description: 'Joins and plays a video from YouTube',
  async callback({ message, args }) {
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        'you need to be in a voice channel for this to work!'
      );

    const permissions = voiceChannel.permissionsFor(message.author);
    if (!permissions?.has('CONNECT'))
      if (!permissions?.has('SPEAK'))
        return message.channel.send('You don\t have the correct permission');
    if (!args.length)
      return message.channel.send('You need to have something to search!');

    const validURL = (str: string) => {
      const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    if (validURL(args[0])) {
      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], { filter: 'audioonly' });

      connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
        voiceChannel.leave();
        message.channel.send('leaving channel');
      });

      await message.reply(`:thumbsup: Now Playing ***Your Link!***`);

      return;
    }

    const connection = await voiceChannel.join();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videoFinder = async (query: any) => {
      const videoResult = await ytSearch(query);
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };
    const video = await videoFinder(args.join(' '));
    if (video) {
      const stream = ytdl(video.url, { filter: 'audioonly' });
      connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
        voiceChannel.leave();
      });

      await message.reply(`:thumbsup: Now Playing *** ${video.title}***`);
    } else {
      message.channel.send('No   video results found');
    }
  },
} as Command;
