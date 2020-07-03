export const launchGame = (id: number | string): void => {
  window.postMessage({ type: 'launch-game', value: id }, '*');
};

export const showSteamStore = (): void => {
  window.postMessage({ type: 'open-steam-store' }, '*');
};
