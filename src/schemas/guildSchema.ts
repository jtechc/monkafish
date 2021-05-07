import mongoose from 'mongoose';

const optionalString = {
  type: String,
  default: null,
};

const guild = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  welcomeChannelId: optionalString,
  welcomeText: optionalString,
  blacklistedWords: {
    type: [String],
    default: [],
  },
  autoRole: optionalString,
  levelsEnabled: {
    type: Boolean,
    default: true,
  },
  suggestionChannels: {
    type: [String],
    default: [],
  },
});

export interface interfaceGuildConfig extends mongoose.Document<unknown> {
  _id: string;
  welcomeChannelId: string | null;
  welcomeText: string | null;
  blacklistedWords: string[];
  autoRole: string | null;
  levelsEnabled: boolean;
  suggestionChannels: string[];
}

const guildConfigs = mongoose.model<interfaceGuildConfig>(
  'guild-configs',
  guild
);

export default guildConfigs;
