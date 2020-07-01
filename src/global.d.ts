declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.png';

declare module '*.svg';

declare module 'vdf' {
  export const parse: (str: string) => JSON;
  export const dump: (json: JSON) => string;
}
