import { Command } from '@aeroware/aeroclient/dist/types';
import { ShuffleGuess } from 'weky';
import randomWords from 'random-words';

export default {
  name: 'shuffleguess',
  category: 'Games',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Bot will shuffle a word, player needs to guess what it is!',
  callback({ message }) {
    const word = randomWords();
    const game = new ShuffleGuess({
      message: message,
      word: word,
      winMessage: 'Damn, GG! You win!',
    });
    game.start();
  },
} as Command;
