/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Command } from '@aeroware/aeroclient/dist/types';
import { TextChannel, User } from 'discord.js';
import TicTacToeGame from '../../utils/tictactoe';
import HangmanGame from '../../utils/hangman-util';
import GameBase from '../../utils/game-base';
import { ResultType } from '../../utils/game-result';
import SnakeGame from '../../utils/snake-util';
import MinesweeperGame from '../../utils/minesweeper-util';
import Connect4Game from '../../utils/connect4-util';
import ChessGame from '../../utils/chess-util';

const ticTacToe = new TicTacToeGame();
const hangman = new HangmanGame();
const snake = new SnakeGame();
const minesweeper = new MinesweeperGame();
const connect4 = new Connect4Game();
const chess = new ChessGame();

const commandGameMap = new Map<string, GameBase>([
  [`hangman`, hangman],
  [`tictactoe`, ticTacToe],
  [`snake`, snake],
  [`minesweeper`, minesweeper],
  [`connect4`, connect4],
  [`chess`, chess],
]);
const playerGameMap = new Map<string, Map<string, GameBase>>();

export default {
  name: 'playgame',
  aliases: ['play'],
  category: 'Games',
  minArgs: 0,
  usage: '[user]',
  cooldown: 5,
  description: 'Play a game vs someone else or vs the bot!',
  details:
    'Possible game choices: [hangman],[tictactoe],[snake],[minesweeper],[connect4],[chess]',
  callback({ message, args }) {
    const gameCommand = args[0];
    if (!gameCommand)
      return message.reply('Please specify what game you want to start!');
    if (message.guild === undefined) return;

    const userId = message.author.id;
    const guildId = message.guild!.id;

    if (message.channel instanceof TextChannel) {
      if (commandGameMap.has(gameCommand)) {
        const game = commandGameMap.get(gameCommand)!.initGame();

        let player2: User | null = null;
        if (
          message.mentions.members != null &&
          message.mentions.members?.size > 0
        ) {
          if (!game.doesSupportMultiplayer()) {
            message.reply('Sorry that game is not a multiplayer game!');
            return;
          } else player2 = message.mentions.members!.first()!.user;
        }
        if (!playerGameMap.has(guildId))
          playerGameMap.set(guildId, new Map<string, GameBase>());

        const foundGame = Array.from(playerGameMap.get(guildId)!.values()).find(
          (g) => g.getGameId() === game.getGameId()
        );
        if (foundGame !== undefined && foundGame.isInGame()) {
          message.reply(
            'Sorry, there can only be 1 instance of a game at a time!'
          );
          return;
        }
        if (playerGameMap.get(guildId)!.has(userId)) {
          message.reply(
            'You must either finish or end your current game before you can play another.'
          );
        } else {
          game.newGame(
            message,
            player2,
            () => {
              playerGameMap.get(guildId)!.delete(userId);
            },
            []
          );
          playerGameMap.get(guildId)!.set(userId, game);
        }
      } else if (gameCommand === `${process.env.PREFIX}end`) {
        if (
          playerGameMap.has(guildId) &&
          playerGameMap.get(guildId)!.has(userId)
        ) {
          const game = playerGameMap.get(guildId)!.get(userId)!;
          game.gameOver({ result: ResultType.FORCE_END });
          playerGameMap.get(guildId)?.delete(userId);
        }
      }
    }
  },
} as Command;
