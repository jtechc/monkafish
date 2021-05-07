import { Command } from '@aeroware/aeroclient/dist/types';

export default {
  name: '8ball',
  category: 'Fun',
  minArgs: 1,
  usage: '<question>',
  cooldown: 5,
  description: 'Ask the bot a question',
  async callback({ message }) {
    const answers = [
      'as I see it, yes',
      'ask again later.',
      'better not tell you now.',
      'cannot predict now.',
      'concentrate and ask again.',
      "don't count on it.",
      'it is certain.',
      'it is decidedly so.',
      'most likely',
      'my reply is no.',
      'my sources say no.',
      'outlook not so good.',
      'reply hazy, try again.',
      'outlook good.',
      'signs point to yes.',
      'without a doubt.',
      'yes.',
      'yes - definetly.',
      'you may rely on it.',
    ];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    return await message.reply(randomAnswer);
  },
} as Command;
