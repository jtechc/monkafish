import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';
import weather from 'weather-js';

// fix this one day
export default {
  name: 'weather',
  category: 'Info',
  minArgs: 0,
  usage: '<place>',
  cooldown: 5,
  description: 'Find the weather of a specific city',
  async callback({ message, args }) {
    const city = args.join(' ');
    const degreetype = 'F';

    await weather.find(
      { search: city, degreeType: degreetype },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (err: string, result: any) {
        if (!city) return message.channel.send('Please specify a city');
        if (err || result === undefined || result.length === 0)
          return message.channel.send('Unknown city.  Please try again');

        const current = result[0].current;
        const location = result[0].location;

        const embed = new MessageEmbed()
          .setAuthor(current.observationpoint)
          .setDescription(`> ${current.skytext}`)
          .setThumbnail(current.imageUrl)
          .setTimestamp()
          .setColor(0x7289da);

        embed
          .addField('Latitude', location.lat, true)
          .addField('Longitude', location.long, true)
          .addField('Feels Like', `${current.feelslike}° Degrees`, true)
          .addField('Degree Type', location.degreetype, true)
          .addField('Winds', current.winddisplay, true)
          .addField('Humidity', `${current.humidity}%`, true)
          .addField('Timezone', `GMT ${location.timezone}`, true)
          .addField('Temperature', `${current.temperature}° Degrees`, true)
          .addField('Observation Time', current.observationtime, true)
          .setFooter(`Requested by: ${message.author.tag}`);
        return message.channel.send(embed);
      }
    );
  },
} as Command;
