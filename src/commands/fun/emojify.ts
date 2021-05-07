import { Command } from '@aeroware/aeroclient/dist/types';
const mapping: any = {
  ' ': '   ',
  0: ':zero:',
  1: ':one:',
  2: ':two:',
  3: ':three:',
  4: ':four:',
  5: ':five:',
  6: ':six:',
  7: ':seven:',
  8: ':eight:',
  9: ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:',
};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c) => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

export default {
  name: 'emojify',
  category: 'Fun',
  minArgs: 1,
  usage: '<message>',
  cooldown: 5,
  description: 'Emojify your message!',
  callback({ message, args }) {
    if (args.length < 1) {
      message.channel.send('You must provide SOMETHING to emojify!');
    }
    message.channel.send(
      args
        .join(' ')
        .split('')
        .map((c) => mapping[c] || c)
        .join('')
    );
  },
} as Command;
