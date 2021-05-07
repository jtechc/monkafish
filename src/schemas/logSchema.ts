import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('log-channels', logSchema);
