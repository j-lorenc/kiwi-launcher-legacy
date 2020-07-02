export const close = (): void => {
  window.postMessage({ type: 'close-window' }, '*');
};

export const minimize = (): void => {
  window.postMessage({ type: 'minimize-window' }, '*');
};

export const maximize = (): void => {
  window.postMessage({ type: 'maximize-window' }, '*');
};

export const requestGamesList = (): void => {
  window.postMessage({ type: 'request-games-list' }, '*');
};
