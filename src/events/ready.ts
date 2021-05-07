import AeroClient from '@aeroware/aeroclient';
import { EventHandler } from '@aeroware/aeroclient/dist/types';
import statusMessage from '../utils/statusMessage';
import mongo from '../utils/mongo';

export default {
  name: 'ready',
  once: true,
  async callback(this: AeroClient) {
    await mongo(this, `${process.env.MONGO_URI_AC}`);
    statusMessage(this);
  },
} as EventHandler;
