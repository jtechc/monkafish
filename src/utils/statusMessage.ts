import AeroClient from '@aeroware/aeroclient';

export default function statusMessage(client: AeroClient) {
  statusUpdate(client);
  setInterval(statusUpdate, 1800000, client);
}

function statusUpdate(client: AeroClient) {
  if (
    client.user?.presence.activities.length === 0 ||
    /\d+ \w+/g.test(client.user!.presence.activities[0].name)
  ) {
    client.user?.setPresence({
      activity: {
        type: 'PLAYING',
        name: 'them ts gang',
      },
    });
  }
}
