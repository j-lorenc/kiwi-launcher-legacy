export const launchGame = (id: number | string): void => {
  window.postMessage({ type: 'launch-game', value: id }, '*');
};
