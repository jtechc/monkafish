import { Command } from '@aeroware/aeroclient/dist/types';
import { FastType } from 'weky';
import txtgen from 'txtgen';

export default {
  name: 'fasttype',
  category: 'Games',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'A game to see who can type the fastest!',
  callback({ message }) {
    const game = new FastType({
      message: message,
      winMessage: 'Damn, GG! You won!',
      sentence: txtgen.sentence(),
      loseMessage: 'Damn! You lost :/',
      time: 50000,
      startMessage: "Let's see who can type the fastest! Good luck!",
    });
    game.start();
    console.log(`${message.author} has started a Fast Type mini-game`);
  },
} as Command;
