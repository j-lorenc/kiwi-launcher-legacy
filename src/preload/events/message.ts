export const sendMessage = (message: string): void => {
  window.postMessage(
    {
      type: 'footer-message',
      value: message,
    },
    '*'
  );
};

export const clearMessage = (): void => {
  window.postMessage(
    {
      type: 'footer-message',
      value: '',
    },
    '*'
  );
};
