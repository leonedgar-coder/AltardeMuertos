import React from 'react';
import styles from './AltarLayout.module.scss';

interface AltarTierProps {
    level: 1 | 2 | 3;
    children: React.ReactNode;
}

export const AltarTier: React.FC<AltarTierProps> = ({ level, children }) => {
    const tierClass = level === 1 ? styles.topTier : level === 2 ? styles.middleTier : styles.baseTier;

    return (
        <div className={`${styles.tier} ${tierClass}`}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

const AltarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.altarContainer}>
            {children}
        </div>
    );
};

export default AltarLayout;
