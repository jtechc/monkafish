import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';

export default {
  name: 'worldclock',
  category: 'Info',
  minArgs: 0,
  usage: '',
  cooldown: 5,
  description: 'Times from timezones',
  callback({ message }) {
    const gmt = new Date().toLocaleString('en-US', {
      timeZone: 'Europe/London',
    });
    const est = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
    const pst = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const cst = new Date().toLocaleString('en-US', {
      timeZone: 'America/Mexico_City',
    });
    const cet = new Date().toLocaleString('en-US', { timeZone: 'CET' });
    const aest = new Date().toLocaleString('en-US', {
      timeZone: 'Australia/Sydney',
    });
    const awst = new Date().toLocaleString('en-US', {
      timeZone: 'Australia/Perth',
    });
    const kst = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    const ist = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Calcutta',
    });

    const worldClock = new MessageEmbed()
      .setAuthor('World Clock - Timezones')
      .addField(':flag_eu: London (GMT)', `${gmt}\n(GMT+0/GMT+1)`, true)
      .addField(':flag_eu: Central (CET)', `${cet}\n(GMT+1)`, true)
      .addField('\u200B', '\u200B', true)
      .addField(':flag_us: New York (EST)', `${est}\n(GMT-5)`, true)
      .addField(':flag_us: Los Angles (PST)', `${pst}\n(GMT-8)`, true)
      .addField(':flag_us: Mexico City (CST)', `${cst}\n(GMT-7)`, true)
      .addField(':flag_au: Sydney (AEST)', `${aest}\n(GMT+11)`, true)
      .addField(':flag_au: Perth (AWST)', `${awst}\n(GMT+8)`, true)
      .addField('\u200B', '\u200B', true)
      .addField(':flag_kr: Korean (KST)', `${kst}\n(GMT+9)`, true)
      .addField(':flag_in: India (IST)', `${ist}\n(GMT+05:30)`, true)
      .addField('\u200B', '\u200B', true)
      .setColor('BLUE');

    message.channel.send(worldClock);
  },
} as Command;
