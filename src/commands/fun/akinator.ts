import { Command } from '@aeroware/aeroclient/dist/types';
import { Aki } from 'aki-api';
import { MessageEmbed } from 'discord.js';
const emojis = ['👍', '👎', '❔', '🤔', '🙄', '❌'];

export default {
  name: 'akinator',
  category: 'Fun',
  minArgs: 0,
  usage: 'react to answer',
  cooldown: 15,
  description: 'Akinator command to guess what character you are thinking!',
  async callback({ message }) {
    const Started = new Set();
    const sendMsg = await message.channel.send('⚙ Loading, please wait...⚙');
    const aki = new Aki('en');
    await aki.start();
    sendMsg.delete();
    const msg = await message.channel.send(
      new MessageEmbed()
        .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
        .setColor('RANDOM')
        .setDescription(
          `**${aki.question}**\n${aki.answers
            .map((x: string, i: number) => `${x} | ${emojis[i]}`)
            .join('\n')}`
        )
    );
    for (const emoji of emojis) await msg.react(emoji).catch(console.error);
    const collector = msg.createReactionCollector(
      (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id === message.author.id,
      { time: 60000 * 6 }
    );
    collector.on('collect', async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
      if (reaction.emoji.name === ':x:') return collector.stop();

      await aki.step(emojis.indexOf(reaction.emoji.name));
      if (aki.progress >= 70 || aki.currentStep >= 78) {
        await aki.win();
        collector.stop();
        message.channel.send(
          new MessageEmbed()
            .setTitle('Hm, is this your character?')
            .setDescription(
              `**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`
            )
            .setImage(aki.answers[0].absolute_picture_path)
            .setColor('#00FF00')
        );
        message.channel
          .awaitMessages(
            (response) =>
              ['yes', 'y', 'no', 'n'].includes(
                response.content.trim().toLowerCase()
              ) && response.author.id === message.author.id,
            { max: 1, time: 30000, errors: ['time'] }
          )
          .then(async (collected) => {
            const content = collected.first()?.content.trim().toLowerCase();
            if (content === 'y' || content === 'yes') {
              return await message.channel.send(
                new MessageEmbed()
                  .setColor('#00FF00')
                  .setTitle('Aha! Guessed right one more time.')
                  .setDescription('I enjoyed playing with you!')
              );
            } else {
              return await message.channel.send(
                new MessageEmbed()
                  .setColor('#A52A2A')
                  .setTitle('Uh, oh well. You win.')
                  .setDescription('I enjoyed playing with you!')
              );
            }
          });
        return;
      }
      msg.edit(
        new MessageEmbed()
          .setTitle(
            `${message.author.username}, Question ${aki.currentStep + 1}`
          )
          .setColor('RANDOM')
          .setDescription(
            `**${aki.question}**\n${aki.answers
              .map((x: string, i: number) => `${x} | ${emojis[i]}`)
              .join('\n')}`
          )
      );
    });

    collector.on('end', () => {
      Started.delete(message.author.id);
      msg.delete({ timeout: 1000 }).catch(() => {
        ' ';
      });
    });
  },
} as Command;
