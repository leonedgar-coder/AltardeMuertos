import React from 'react';
import styles from './FlickeringCandle.module.scss';

const FlickeringCandle: React.FC = () => {
  return (
    <div className={styles.candleContainer}>
      <div className={styles.glow}></div>
      <div className={styles.flame}></div>
      <div className={styles.candleBody}>
        <div className={styles.wick}></div>
      </div>
    </div>
  );
};

export default FlickeringCandle;
