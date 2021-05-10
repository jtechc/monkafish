import { EventHandler } from '@aeroware/aeroclient/dist/types';
import { Message } from 'discord.js';
// import guild, { interfaceGuildConfig } from '../schemas/guildSchema';

export default {
  name: 'message',
  async callback(message: Message) {
    if (!message.author.bot)
      console.log(`${message.author.tag} => : ${message.content}`);
  },
} as EventHandler;
/* async function suggestions(message: Message, info: interfaceGuildConfig) {
  const { suggestionChannels } = info;
  if (message.author.bot) return;
  if (!message.guild || message.member?.hasPermission('ADMINISTRATOR')) return;
  if (suggestionChannels.includes(message.channel.id)) {
    if (message.deletable) message.delete().catch();
    const suggestion = await message.channel.send(
      new MessageEmbed()
        .setDescription(
          `${message.content}\nVote on this suggestion so that it can be implemented!`
        )
        .setColor('RANDOM')
        .setTimestamp()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
    );

    ['👍', '👎'].forEach(async (e) => {
      await suggestion.react(e);
    });
  }
} */
