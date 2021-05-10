/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Command } from '@aeroware/aeroclient/dist/types';
import { MessageEmbed } from 'discord.js';
import weather from 'weather-js';

export default {
  name: 'weather',
  category: 'info',
  minArgs: 1,
  usage: '<place>',
  cooldown: 5,
  description: 'Find the weather of a specific city',
  async callback({ message, args }) {
    const city = args.slice(0).join(' ');

    // eslint-disable-next-line no-unused-expressions
    () => {
      if (!city)
        return message.channel.send(
          'Please enter a city to get the weather in!'
        );

      weather.find(
        {
          search: city,
          degreeType: 'F',
        },
        async function (err: any, result: string | any[]) {
          if (err) console.log(err);

          if (result.length === 0) {
            return await message.channel.send(
              `No data was found for \`${String(city).length > 1959
                ? String(city).substring(0, 1956) + '...'
                : city
              }\``
            );
          } else {
            const dc =
              Math.round(
                (((result[0].current.temperature - 32) * 5) / 9) * 100
              ) / 100;
            const dc2 =
              Math.round((((result[0].current.feelslike - 32) * 5) / 9) * 100) /
              100;
            const b4 = result[0].current.winddisplay.split('mph');
            const a4 = Math.round(b4[0] * 1.609344) + ' kph' + b4[1];

            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setTitle(`Weather in: ${result[0].location.name}`)
              .setThumbnail(result[0].current.imageUrl)
              .addField(
                'Temperature: ',
                `${result[0].current.temperature}°F \n ${dc}°C`,
                true
              )
              .addField(
                'Feels like: ',
                `${result[0].current.feelslike}°F \n ${dc2}°C`,
                true
              )
              .addField('Humidity: ', `${result[0].current.humidity}%`, true)
              .setDescription(
                `**Sky weather:** ${result[0].current.skytext} \n\n **Wind info:** ${result[0].current.winddisplay} (${a4})`
              );
            return await message.channel.send(embed);
          }
        }
      );
    };
  },
} as Command;
