import React from 'react';
import styles from './MarigoldPetal.module.scss';

const MarigoldPetals: React.FC = () => {
    // Generamos 20 pétalos usando un array para que el SCSS loop haga el resto
    const petals = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((_, i) => (
                <div key={i} className={styles.petal} />
            ))}
        </div>
    );
};

export default MarigoldPetals;
