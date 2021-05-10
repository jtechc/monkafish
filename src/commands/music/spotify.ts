import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageAttachment, User } from 'discord.js';
import canvacord from 'canvacord';

export default {
  name: 'spotify',
  category: 'Music',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Spotify command',
  async callback({ message, args }) {
    if (message.author.bot) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let user: User | undefined;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild?.members.cache.get(args[0])?.user;
    } else {
      user = message.author;
    }
    let status;
    if (user?.presence.activities.length === 1)
      status = user.presence.activities[0];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    else if (user!.presence.activities.length > 1)
      status = user?.presence.activities[1];

    if (
      user?.presence.activities.length === 0 ||
      (status?.name !== 'Spotify' && status?.type !== 'LISTENING')
    ) {
      return message.channel.send('This user is not listening to music!');
    }
    if (
      status !== null &&
      status.type === 'LISTENING' &&
      status.name === 'Spotify' &&
      status.assets !== null
    ) {
      // eslint-disable-next-line prettier/prettier
      const image = `https://i.scdn.co/image/${status.assets.largeImage?.slice(8)}`,
        name = status.details,
        artist = status.state,
        album = status.assets.largeText;

      const card = new canvacord.Spotify()
        .setAuthor(artist)
        .setAlbum(album)
        .setStartTimestamp(status.timestamps?.start)
        .setEndTimestamp(status.timestamps?.end)
        .setImage(image)
        .setTitle(name);

      card.build().then((buffer: string) => {
        canvacord.write(buffer, 'spotify.png');

        const attachment = new MessageAttachment(buffer, 'spotify.png');
        return message.channel.send(attachment);
      });
    }
  },
} as Command;
