export const dateMillisToString = (millis: number): string => {
  return new Date(millis * 1000).toLocaleDateString();
};

export const playtimeMillisToString = (millis: number): string => {
  let stringTo = '';

  if (millis) {
    if (Math.floor(millis / 60)) {
      stringTo += `${Math.floor(millis / 60)} hour${Math.floor(millis / 60) > 1 ? 's' : ''}`;
    } else {
      stringTo += `${millis % 60} minute${millis % 60 > 1 ? 's' : ''}`;
    }
  }

  return stringTo;
};
