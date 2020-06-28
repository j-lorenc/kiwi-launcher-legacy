import React from 'react';
import Anime, { AnimeProps } from 'react-anime';

const withAnimation = <T,>(config: AnimeProps | AnimeProps[]) => {
  return (WrappedComponent: React.FC<T>) => {
    return (props: T): JSX.Element => {
      if (!(config instanceof Array)) config = [config];

      config.reverse();

      return config.reduce((acc: JSX.Element, configObj: AnimeProps) => {
        return <Anime {...configObj}>{acc}</Anime>;
      }, <WrappedComponent {...props} />);
    };
  };
};

export interface AnimePropsWithClassname extends AnimeProps {
  className?: string;
}

export default withAnimation;
