import React from 'react';
import styles from './styles.module.scss';

export const CoverImage: React.FC<{ coverSrc: string; className: string }> = ({
  coverSrc,
  className,
}) => {
  if (!coverSrc) {
    <div className={`${className} ${styles['cover-image']}`}>Hello</div>;
  }

  return (
    <div className={`${className} ${styles['cover-image']}`}>
      <img src={coverSrc} />
    </div>
  );
};
