export const windowListener = (setMessage: (message: string) => void): void => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'footer-message') {
      setMessage(e.data.value);
    }
  });
};
