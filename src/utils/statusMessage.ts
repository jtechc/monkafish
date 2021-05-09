import AeroClient from '@aeroware/aeroclient';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function statusMessage(client: AeroClient) {
  statusUpdate(client);
  setInterval(statusUpdate, 1800000, client);
}

function statusUpdate(client: AeroClient) {
  if (
    client.user?.presence.activities.length === 0 ||
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
