import AeroClient from '@aeroware/aeroclient';
import dotenv from 'dotenv';
import CONFIG from '../config.json';

dotenv.config();

const client = new AeroClient({
  token: process.env.TOKEN,
  prefix: CONFIG.DEFAULT_PREFIX,
  logging: true,
  loggerHeader: 'monkafish',
  commandsPath: 'commands',
  eventsPath: 'events',
  useDefaults: true,
  connectionUri: process.env.MONGO_URI_AC,
  testServers: ['828579107830104096', '823350523334754364'],
  allowSpaces: true,
  responses: CONFIG.MONKAFISH.RESPONSES,
  staff: ['132631391983632384'],
  dev: {
    eval: {
      console: true,
      command: true,
    },
  },
});

client.use(async ({ message, args }, next, stop) => {
  const pingRegex = new RegExp(`^<@!?${client.user?.id}>$`);

  if (pingRegex.test(message.content)) {
    client.commands.get('setprefix')?.callback({
      args,
      client,
      message,
      text: message.content,
      locale: '',
      parsed: [],
    });
    return await stop();
  }
});

export default client;
