import { MessageEmbed } from 'discord.js';

class CustomEmbed extends MessageEmbed {
  constructor() {
    super();
    this.setFooter(`This is just a example.`);
  }
}
export default CustomEmbed;
