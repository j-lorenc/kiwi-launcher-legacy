export const launchGame = (id: number | string): void => {
  window.postMessage({ type: 'launch-game', value: id }, '*');
};

export const showSteamStore = (): void => {
  window.postMessage({ type: 'open-store' }, '*');
};

export const requestGamesList = (): void => {
  window.postMessage({ type: 'request-games-list' }, '*');
};

export const refreshGamesList = (): void => {
  window.postMessage({ type: 'refresh-games-list' }, '*');
};

export const submitSteamCreds = (steamUserKey: string, steamApiKey: string): void => {
  window.postMessage(
    {
      type: 'submit-steam-creds',
      value: { steamUserKey, steamApiKey },
    },
    '*'
  );
};
