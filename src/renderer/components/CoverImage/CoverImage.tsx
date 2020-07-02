import React from 'react';
import styles from './styles.module.scss';

export const CoverImage: React.FC<{ coverSrc: string; className: string }> = ({
  coverSrc,
  className,
}) => {
  return (
    <div className={`${className} ${styles['cover-image']}`}>
      <img src={coverSrc} />
    </div>
  );
};
