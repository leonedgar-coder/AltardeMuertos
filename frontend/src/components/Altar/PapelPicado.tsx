import React from 'react';
import styles from './PapelPicado.module.scss';

const colors = [styles.pink, styles.orange, styles.purple, styles.blue, styles.yellow];

const PapelPicado: React.FC = () => {
    return (
        <div className={styles.bannerContainer}>
            {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className={`${styles.picadoPiece} ${colors[i % colors.length]}`}
                    style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
        </div>
    );
};

export default PapelPicado;
